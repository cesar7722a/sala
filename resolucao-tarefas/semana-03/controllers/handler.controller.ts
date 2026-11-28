import { Request, Response } from "express";

export function handler(_req: Request, res: Response) {
  res.status(200).json({ message: "sucesso!!" });
}
