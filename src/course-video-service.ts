import process from "node:process";
import { isMP4Video, calculateSHA256 } from "./video-ingestion.js";
import { safeAsync } from "./safe-async.js";

// 1. Tipagem das Respostas
export interface VideoSubmissionResult {
  statusCode: 202 | 400;
  message: string;
  jobId?: string;
  sha256?: string;
}

// 2. Simulação de um Worker em Background (como o BullMQ fará no futuro)
function runBackgroundTranscoder(
  jobId: string,
  courseId: number,
  durationMs = 2000,
): void {
  console.log(
    `[Background Worker] A iniciar transcodificação do Job ${jobId} para o Curso ${courseId}...`,
  );

  // setTimeout simula o processamento pesado fora do ciclo da requisição
  setTimeout(() => {
    console.log(
      `[Background Worker] Job ${jobId} CONCLUÍDO! Vídeo transcodificado em 720p e 1080p.`,
    );
    console.log(
      `[Database] Status do vídeo no PostgreSQL atualizado para 'PUBLICADO'!\n`,
    );
  }, durationMs);
}

// 3. Função do Serviço (o que o Controller do Express vai chamar)
export async function submitCourseVideo(
  instructorId: number,
  courseId: number,
  videoFilePath: string,
): Promise<VideoSubmissionResult> {
  const startTime = Date.now();
  console.log(
    `Recebido upload do Produtor ${instructorId} para o Curso ${courseId}`,
  );
  // Passo A: Validar Magic Bytes
  const [errMagic, isValid] = await safeAsync(isMP4Video(videoFilePath));
  if (errMagic || !isValid) {
    return {
      statusCode: 400,
      message: "Falha de validação: O ficheiro não é um vídeo MP4 legítimo!",
    };
  }
  // Passo B: Calcular Hash de integridade via Stream
  const [errHash, sha256] = await safeAsync(calculateSHA256(videoFilePath));
  if (errHash || !sha256) {
    return {
      statusCode: 400,
      message: "Falha ao calcular checksum de integridade do vídeo.",
    };
  }
  // Passo C: Gerar JobId e delegar ao Worker em background
  const jobId = `job_${Date.now()}_${courseId}`;
  runBackgroundTranscoder(jobId, courseId);
  const responseTime = Date.now() - startTime;
  console.log(`Resposta HTTP 202 gerada em apenas ${responseTime}ms!`);
  // Resposta imediata (HTTP 202)
  return {
    statusCode: 202,
    message:
      "Vídeo aceite para processamento. A transcodificação está a decorrer em background.",
    jobId,
    sha256,
  };
}

// 4. Demonstração dos Cenários da Plataforma de Cursos
async function runDemo() {
  console.log("=== SIMULAÇÃO DA API: INGESTÃO DE VÍDEOS DE CURSOS ===\n");

  // Cenário 1: Upload de Vídeo Legítimo (MP4 real)
  console.log("--- TESTE 1: Submissão de Vídeo Válido pelo Produtor 1 ---");
  const resValido = await submitCourseVideo(1, 101, "valid-video.mp4");
  console.log("📡 Resposta Devolvida ao Cliente (HTTP Status):", resValido.statusCode);
  console.log("📦 Payload da Resposta:", resValido);

  console.log("\n--------------------------------------------------------------\n");

  // Cenário 2: Upload de Ficheiro Falso (Texto mascarado de .mp4)
  console.log("--- TESTE 2: Submissão de Ficheiro Inválido pelo Produtor 2 ---");
  const resFalso = await submitCourseVideo(2, 102, "fake-video.mp4");
  console.log("📡 Resposta Devolvida ao Cliente (HTTP Status):", resFalso.statusCode);
  console.log("📦 Payload da Resposta:", resFalso);
}

const isMain = process.argv[1]?.endsWith("course-video-service.ts");
if (isMain) {
  runDemo().catch((err) => console.error("Erro na simulação:", err));
}
