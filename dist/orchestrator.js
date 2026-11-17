import process from "node:process";
export async function fetchServiceData(serviceId) {
    await new Promise((r) => setTimeout(r, 50 + serviceId * 20));
    if (serviceId === 3) {
        throw new Error(`Serviço ${serviceId} indisponível`);
    }
    return { serviceId, data: `payload-${serviceId}` };
}
export async function runOrchestrator() {
    const ids = [1, 2, 3, 4, 5];
    const results = await Promise.allSettled(ids.map((id) => fetchServiceData(id)));
    const report = { successful: [], failed: [] };
    results.forEach((result, index) => {
        const serviceId = ids[index];
        if (result.status === `fulfilled`) {
            report.successful.push(result.value);
        }
        else {
            const reason = result.reason instanceof Error
                ? result.reason.message
                : String(result.reason);
            report.failed.push({ serviceId, reason });
        }
    });
    return report;
}
// Execução autónoma se executado directamente via CLI
const isMainModule = process.argv[1]?.endsWith("orchestrator.ts");
if (isMainModule) {
    console.log("⚡ A disparar 5 consultas concorrentes com Promise.allSettled...\n");
    const startTime = Date.now();
    runOrchestrator().then((report) => {
        const totalTime = Date.now() - startTime;
        console.log(`⏱️ Tempo total de execução: ${totalTime}ms (concorrência total)\n`);
        console.log("✅ Serviços com Sucesso (Fulfilled):");
        console.table(report.successful);
        console.log("\n❌ Falhas Isoladas e Tratadas (Rejected):");
        console.table(report.failed);
    }).catch((err) => {
        console.error("Erro inesperado no orquestrador:", err);
    });
}
