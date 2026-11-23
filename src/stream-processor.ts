import { createReadStream, createWriteStream } from "node:fs";
import { writeFile } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { Transform } from "node:stream";
import process from "node:process";

// 1. Função auxiliar para medir o consumo de RAM em Megabytes
function getMemoryUsageMB(): string {
  const bytes = process.memoryUsage().heapUsed;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// 2. Função para criar um ficheiro CSV de teste com 50.000 linhas
export async function generateSampleCSV(
  filePath: string,
  totalRows = 50_000,
): Promise<void> {
  console.log(
    `📝 A gerar ficheiro de teste '${filePath}' com ${totalRows.toLocaleString()} linhas...`,
  );

  const writeStream = createWriteStream(filePath);
  writeStream.write("id,nome_aluno,curso,preco\n");

  for (let i = 1; i <= totalRows; i++) {
    const row = `${i},Aluno_${i},Curso_NodeJS_Backend,15000\n`;

    // Se o buffer interno encher, o writeStream.write devolve 'false'
    // Isso avisa para esperar que o disco esvazie (controlo de backpressure)
    const canContinue = writeStream.write(row);
    if (!canContinue) {
      await new Promise((resolve) => writeStream.once("drain", resolve));
    }
  }

  writeStream.end();
  await new Promise((resolve) => writeStream.once("finish", resolve));
  console.log(`✅ Ficheiro '${filePath}' gerado com sucesso!\n`);
}

// 3. A nossa Transform Stream que processa pedaço a pedaço
export function createUpperCaseTransform(): Transform {
  return new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      try {
        // Converte o pedaço (chunk) de Buffer binário para String
        const textChunk = chunk.toString("utf-8");

        // Aplica a transformação: converte todo o texto do chunk para maiúsculas
        const upperChunk = textChunk.toUpperCase();

        // Envia o chunk transformado para o próximo elo do pipeline
        // callback(erro, dadoTransformado)
        callback(null, upperChunk);
      } catch (error) {
        callback(error instanceof Error ? error : new Error(String(error)));
      }
    },
  });
}

// 4. Função principal que liga o pipeline completo
export async function processCSVWithStreams(
  inputFile: string,
  outputFile: string,
): Promise<void> {
  console.log("🚀 A iniciar processamento com Streams...");
  console.log(`📊 Memória RAM inicial: ${getMemoryUsageMB()}`);

  const startTime = Date.now();

  // O PIPELINE liga Leitura -> Transformação -> Escrita de forma segura
  await pipeline(
    createReadStream(inputFile, { highWaterMark: 64 * 1024 }), // 1. Lê em fatias de 64 KB
    createUpperCaseTransform(), // 2. Transforma cada fatia
    createWriteStream(outputFile), // 3. Grava no disco
  );

  const duration = Date.now() - startTime;
  console.log(`✅ Processamento concluído em ${duration}ms!`);
  console.log(`📊 Memória RAM final: ${getMemoryUsageMB()}`);
}

// 5. Execução directa do ficheiro
const isMain = process.argv[1]?.endsWith("stream-processor.ts");
if (isMain) {
  const inputFile = "input.csv";
  const outputFile = "output.csv";

  async function run() {
    // Passo A: Criar o ficheiro volumoso
    await generateSampleCSV(inputFile, 50_000);

    // Passo B: Processar com streaming
    await processCSVWithStreams(inputFile, outputFile);
  }

  run().catch((err) => {
    console.error("❌ Erro no pipeline de streams:", err);
  });
}
