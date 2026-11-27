import { Request, Response } from "express";

export function getLesson(_req: Request, res: Response) {
  res.status(200).json({ sucesso: "a funcionar" });
}
