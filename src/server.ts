import express, { Request, Response, NextFunction } from "express";
import process from "node:process";
import { requestLoggerAndTimer } from "./middlewares/logger.js";
import healthRouter from "./routes/health.routes.js";
import coursesRouter from "./routes/courses.routes.js";

export const app = express();

// 1. Middlewares Globais de Infraestrutura
app.use(express.json());
app.use(requestLoggerAndTimer);

// 2. Módulos de Rotas (Prefixos)
app.use("/health", healthRouter);
app.use("/courses", coursesRouter);

// 3. Middleware 404 — Captura rotas não mapeadas
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    error: "Rota não encontrada",
    path: req.originalUrl,
  });
});

// 4. Middleware Global de Tratamento de Erros (4 argumentos obrigatórios)
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("💥 [Erro Global Capturado]:", err.message);

  return res.status(400).json({
    success: false,
    error: "Erro na requisição",
    details: err.message,
    timestamp: new Date().toISOString(),
  });
});

// 5. Arranque do Servidor
const PORT = 3333;
const isMain = process.argv[1]?.endsWith("server.ts");

if (isMain) {
  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor Express da Plataforma a correr em http://localhost:${PORT}`,
    );
    console.log(`📡 Endpoints disponíveis:`);
    console.log(`   - GET    /health`);
    console.log(`   - GET    /courses`);
    console.log(`   - GET    /courses/featured`);
    console.log(`   - GET    /courses/:id`);
    console.log(`   - POST   /courses`);
    console.log(`   - DELETE /courses/:id`);
  });
}
