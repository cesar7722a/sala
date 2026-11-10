import process from "node:process";

export interface Appconfig {
  port: number;
  nodeEnv: "development" | "production" | "test";
  databaseUrl: string;
}

function LoadCongig(): Appconfig {
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
  const nodeEnv: Appconfig["nodeEnv"] =
    rawNodeEnv === "production" || rawNodeEnv === "test"
      ? rawNodeEnv
      : "development";

  return {
    port,
    nodeEnv,
    databaseUrl,
  };
}

const config = LoadCongig();
console.log("A rudar com sucesso");
console.log(config);
