import process from "node:process";
export function loadConfig() {
    const databaseUrl = process.env.DATABASE_URL;
    if (!databaseUrl) {
        console.error("[ERRO FATAL]: A variável DATABASE_URL é obrigatória e não foi definida!");
        console.error("Define a variável no teu ficheiro .env ou no ambiente antes de iniciar.");
        process.exit(1);
    }
    const port = Number(process.env.PORT) || 3000;
    const rawNodeEnv = process.env.NODE_ENV;
    const nodeEnv = rawNodeEnv === "production" || rawNodeEnv === "test"
        ? rawNodeEnv
        : "development";
    return {
        port,
        nodeEnv,
        databaseUrl,
    };
}
// const config = loadConfig();
// console.log("Configuração carregada com sucesso:");
// console.table(config);
