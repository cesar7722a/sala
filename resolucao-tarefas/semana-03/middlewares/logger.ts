import { NextFunction, Request, Response } from "express";

export function TestMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.on("finish", () => {
    console.log(`Metodo: ${req.method}, url:${req.originalUrl}`);
  });

  next();
}

export function requestTime(req: Request, res: Response, next: NextFunction) {
  (req as any).requestTime = new Date();

  next();
}

export const globalLogger = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  console.log(`Método: ${req.method} | URL: ${req.url}`);
  next();
};
