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
