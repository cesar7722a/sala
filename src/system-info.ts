import os from "node:os";
import process from "node:process";

interface SystemMetrics {
  nodeVersion: string;
  platform: string;
  architecture: string;
  cpuCount: number;
  freeMemoryMB: number;
  totalMemoryMB: number;
  uptimeHours: number;
}

function getSystemMetrics(): SystemMetrics {
  const nodeVersion = process.version;
  const platform = os.platform();
  const architecture = os.arch();
  const cpuCount = os.cpus().length;
  const freeMemoryMB = Math.round(os.freemem() / (1024 * 1024));
  const totalMemoryMB = Math.round(os.totalmem() / (1024 * 1024));
  const uptimeHours = Number((os.uptime() / 3600).toFixed(2));

  return {
    nodeVersion,
    platform,
    architecture,
    cpuCount,
    freeMemoryMB,
    totalMemoryMB,
    uptimeHours,
  };
}

// Execução e exibição das métricas
const metrics = getSystemMetrics();
console.log("=== MÉTRICAS DO SISTEMA E RUNTIME NODE.JS ===");
console.table(metrics);
