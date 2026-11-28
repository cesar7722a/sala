import type { Request, Response, NextFunction } from "express";

/**
 * Middleware Global de Tratamento de Erros
 * Obrigatório ter exactamente 4 argumentos: (err, req, res, next)
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  console.error("💥 [Erro Global Capturado]:", err.message);

  return res.status(400).json({
    success: false,
    error: "Erro na requisição",
    details: err.message,
    timestamp: new Date().toISOString(),
  });
}
