import { Request, Response } from "express";

export function getCategories(_req: Request, res: Response) {
  res.status(200).json({ sucesso: "esta a funcionar" });
}
