import process from "node:process";

export interface AppConfig {
  port: number;
  nodeEnv: "development" | "production" | "test";
  databaseUrl: string;
}

export function loadConfig(): AppConfig {
  // Carrega o ficheiro .env nativamente no Node.js v20+ se existir
  try {
    process.loadEnvFile();
  } catch {
    // Se o ficheiro .env não existir fisicamente, continua usando variáveis do sistema
  }

  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    console.error(
      "[ERRO FATAL]: A variável DATABASE_URL é obrigatória e não foi definida!",
    );
    console.error(
      "Define a variável no teu ficheiro .env ou no ambiente antes de iniciar.",
    );
    process.exit(1);
  }

  const port = Number(process.env.PORT) || 3000;

  const rawNodeEnv = process.env.NODE_ENV;
  const nodeEnv: AppConfig["nodeEnv"] =
    rawNodeEnv === "production" || rawNodeEnv === "test"
      ? rawNodeEnv
      : "development";

  return {
    port,
    nodeEnv,
    databaseUrl,
  };
}

const isMain = process.argv[1]?.endsWith("config.ts");
if (isMain) {
  const config = loadConfig();
  console.log("Configuração carregada com sucesso:");
  console.table(config);
}
