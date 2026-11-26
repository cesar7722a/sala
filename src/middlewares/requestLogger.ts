import type { Request, Response, NextFunction } from "express";

export function requestLogger(
  req: Request,
  _res: Response,
  next: NextFunction,
) {
  console.log(`[INFO] ${req.method} ${req.originalUrl}`);

  next();
}
