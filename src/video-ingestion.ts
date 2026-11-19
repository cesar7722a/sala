import { open, writeFile } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { Buffer } from "node:buffer";
import { createHash } from "node:crypto";
import { pipeline } from "node:stream/promises";
import process from "node:process";
import { safeAsync } from "./safe-async.js"; // Reutilizamos o teu módulo de ontem!

export async function isMP4Video(filePath: string): Promise<boolean> {
  const fileHandle = await open(filePath, "r");
  try {
    const buffer = Buffer.alloc(8);
    await fileHandle.read(buffer, 0, 8, 0);

    // Em ficheiros MP4, os bytes do índice 4 ao 7 formam a palavra 'ftyp'
    const signature = buffer.subarray(4, 8).toString("ascii");
    return signature === "ftyp";
  } finally {
    await fileHandle.close();
  }
}

// 2. Função que calcula o SHA-256 via Stream (sem carregar para a RAM)

export async function calculateSHA256(filePath: string): Promise<string> {
  const hash = createHash("sha256");
  await pipeline(createReadStream(filePath), hash);
  return hash.digest("hex");
}

// 3. Orquestrador do Processo de Ingestão de Vídeo

export async function processVideoUpload(filePath: string) {
  console.log(`\n🔍 A processar ficheiro: ${filePath}`);

  // Passo A: Validar Magic Bytes com safeAsync
  const [errMagic, isValid] = await safeAsync(isMP4Video(filePath));

  if (errMagic || !isValid) {
    console.error(
      `Rejeitado: O ficheiro não é um vídeo MP4 válido (Magic Bytes inválidos)!`,
    );
    return;
  }

  // Passo B: Calcular Hash SHA-256 com safeAsync

  const [errHash, sha256] = await safeAsync(calculateSHA256(filePath));
  if (errHash) {
    console.error(`Erro ao calcular integridade:`, errHash.message);
    return;
  }

  console.log(`✅ Vídeo validado com sucesso!`);
  console.log(`🔐 SHA-256 (Checksum): ${sha256}`);
  console.log(`🚀 Pronto para ser enviado para a Cloud e enfileirado no BullMQ!\n`);
}

// 4. Teste autónomo dos cenários
async function runDemo() {
  console.log("=== SISTEMA DE INGESTÃO E VALIDAÇÃO DE VÍDEOS ===");

  // Cria um ficheiro falso: texto normal disfarçado de .mp4
  await writeFile("fake-video.mp4", "Isto é um ficheiro de texto executável disfarçado!");

  // Cria um ficheiro MP4 simulado: primeiros bytes contêm o padrão 'ftyp'
  const mp4Header = Buffer.from([0x00, 0x00, 0x00, 0x18, 0x66, 0x74, 0x79, 0x70, 0x6d, 0x70, 0x34, 0x32]);
  const fakeVideoContent = Buffer.concat([mp4Header, Buffer.alloc(1024, 0xaa)]);
  await writeFile("valid-video.mp4", fakeVideoContent);

  // Cenário 1: Testar o ficheiro falso
  await processVideoUpload("fake-video.mp4");

  // Cenário 2: Testar o ficheiro legítimo
  await processVideoUpload("valid-video.mp4");
}

const isMain = process.argv[1]?.endsWith("video-ingestion.ts");
if (isMain) {
  runDemo().catch((err) => console.error("Erro fatal na demonstração:", err));
}
