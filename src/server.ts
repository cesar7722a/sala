import express, { Request, Response } from "express";
import process from "node:process";
import { requestLoggerAndTimer } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import apiRouter from "./routes/index.js";

export const app = express();

// 1. Middlewares Globais de Infra-estrutura
app.use(express.json());
app.use(requestLoggerAndTimer);

// 2. Montagem da API v1 através do Router Centralizador
app.use("/api/v1", apiRouter);

// 3. Rota de Health Check na raiz para balanceadores de carga / probes
app.get("/health", (_req: Request, res: Response) => {
  return res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

// 4. Middleware 404 — Captura rotas não mapeadas
app.use((req: Request, res: Response) => {
  return res.status(404).json({
    success: false,
    error: "Rota não encontrada",
    path: req.originalUrl,
  });
});

// 5. Middleware Global de Tratamento de Erros (4 argumentos)
app.use(errorHandler);

// 6. Arranque do Servidor
const PORT = 3333;
const isMain = process.argv[1]?.endsWith("server.ts");

if (isMain) {
  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor Express da Plataforma a correr em http://localhost:${PORT}`,
    );
    console.log(`📡 Endpoints disponíveis:`);
    console.log(`   - GET    /health (Global)`);
    console.log(`   - GET    /api/v1/health`);
    console.log(`   - GET    /api/v1/courses (com filtros & paginação)`);
    console.log(`   - GET    /api/v1/courses/featured`);
    console.log(`   - GET    /api/v1/courses/:id`);
    console.log(`   - GET    /api/v1/courses/:courseId/lessons`);
    console.log(`   - GET    /api/v1/courses/:courseId/lessons/:lessonId`);
    console.log(`   - POST   /api/v1/courses`);
    console.log(`   - DELETE /api/v1/courses/:id (Protegido por x-admin-key)`);
  });
}
