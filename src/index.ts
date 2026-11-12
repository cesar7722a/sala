import { loadConfig } from "./config.js";
import { getSystemMetrics } from "./system-info.js";

async function bootstrap(): Promise<void> {
  console.log("Iniciando o servdor backend... \n");

  const config = loadConfig();
  const metrics = getSystemMetrics();

  console.log("════════════════════════════════════════════════════════");
  console.log(`Servidor a escutar na porta : ${config.port}`);
  console.log(`Ambiente de Execução        : ${config.nodeEnv.toUpperCase()}`);
  console.log(
    `Runtime                     : Node.js ${metrics.nodeVersion} (${metrics.platform} - ${metrics.architecture})`,
  );
  console.log(
    `Memória Disponível          : ${metrics.freeMemoryMB} MB / ${metrics.totalMemoryMB} MB`,
  );
  console.log(`Núcleos de CPU              : ${metrics.cpuCount}`);
  console.log("════════════════════════════════════════════════════════\n");
  console.log("Aplicação Backend pronta para operar!");
}

bootstrap();
