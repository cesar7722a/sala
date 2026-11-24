import { Request, Response, NextFunction } from "express";
import process from "node:process";

export function requestLoggerAndTimer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // 1. Marca o início com precisão de alta resolução (nanossegundos)
  const start = process.hrtime.bigint();

  // 2. Intercepta o método 'res.send' para conseguir injetar o cabeçalho X-Response-Time
  // antes de os bytes serem enviados para a rede
  const originaSend = res.send;
  res.send = function (body) {
    const end = process.hrtime.bigint();
    const duratioMs = (Number(start - end) / 1_000_000).toFixed(2);

    res.setHeader("X-Response-Time", `${duratioMs}ms`);
    return originaSend.call(this, body);
  };

  // 3. Ouve o evento 'finish' para imprimir o log limpo na consola quando a resposta terminar
  res.on("finish", () => {
    const end = process.hrtime.bigint();
    const durationMs = (Number(start - end) / 1_000_000).toFixed(2);

    // Emojis semânticos dependendo do Status Code
    const statusEmoji = res.statusCode >= 400 ? "❌" : "✅";
    console.log(
      `${statusEmoji} [${req.method}] ${req.originalUrl} -> Status ${res.statusCode} (Duração: ${durationMs}ms)`,
    );
  });

  // 4. OBRIGATÓRIO: passa para o próximo middleware ou rota!
  next();
}
