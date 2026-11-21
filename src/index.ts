import { loadConfig } from "./config.js";
import { submitCourseVideo } from "./course-video-service.js";
import { runOrchestrator } from "./orchestrator.js";
import { safeAsync } from "./safe-async.js";
import { getSystemMetrics } from "./system-info.js";

async function bootstrap(): Promise<void> {
  console.log("════════════════════════════════════════════════════════");
  console.log("   NODE.JS BACKEND ROADMAP — BOOTSTRAP FASE 1          ");
  console.log("════════════════════════════════════════════════════════\n");

  const config = loadConfig();
  const metrics = getSystemMetrics();

  console.log(
    `🌍 Ambiente        : ${config.nodeEnv.toUpperCase()} (Porta: ${config.port})`,
  );
  console.log(
    `💻 Runtime         : Node.js ${metrics.nodeVersion} (${metrics.platform} - ${metrics.architecture})`,
  );
  console.log(
    `🧠 Memória Livre   : ${metrics.freeMemoryMB} MB / ${metrics.totalMemoryMB} MB`,
  );
  console.log(`⚙️ Núcleos de CPU  : ${metrics.cpuCount}\n`);

  // 2. Teste de Concorrência com Promise.allSettled
  console.log("⚡ A testar orquestração paralela com tolerância a falhas...");
  const [errOrch, report] = await safeAsync(runOrchestrator());
  if (!errOrch && report) {
    console.log(
      `✅ Concorrência OK: ${report.successful.length} serviços operacionais | ${report.failed.length} falhas isoladas com sucesso.`,
    );
  }

  // 3. Teste de Ingestão de Vídeo (HTTP 202 Desacoplado)
  console.log("\n⚡ A testar serviço de ingestão de vídeo da plataforma...");
  const [errVideo, videoRes] = await safeAsync(
    submitCourseVideo(1, 101, "valid-video.mp4"),
  );
  if (!errVideo && videoRes) {
    console.log(
      `✅ Ingestão OK: Status HTTP ${videoRes.statusCode} (${videoRes.message})`,
    );
    console.log(`📦 Job Enfileirado: ${videoRes.jobId}`);
  }

  console.log("\n════════════════════════════════════════════════════════");
  console.log("🎉 FASE 1: FUNDAMENTOS DE NODE.JS 100% CONCLUÍDA COM SUCESSO!");
  console.log("════════════════════════════════════════════════════════\n");
}

bootstrap().catch((err) => {
  console.error("❌ Falha crítica no bootstrap da aplicação:", err);
});
