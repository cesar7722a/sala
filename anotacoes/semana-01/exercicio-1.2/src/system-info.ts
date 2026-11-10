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

function Metrics(): SystemMetrics {
  return {
    nodeVersion: process.version,
    platform: os.platform(),
    architecture: os.arch(),
    cpuCount: os.cpus().length,
    freeMemoryMB: Math.round(os.freemem() / (1024 * 1024)),
    totalMemoryMB: Math.round(os.totalmem() / (1024 * 1024)),
    uptimeHours: Number((os.uptime() / 3600).toFixed(2)),
  };
}

const metrics = Metrics();
console.log("=== MÉTRICAS DO SISTEMA E RUNTIME NODE.JS ===");
console.log(metrics);
