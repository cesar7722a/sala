import type { Request, Response } from "express";

export function getInstructors(_req: Request, res: Response) {
  return res.status(200).json({
    sucesso: true,
    data: [
      { id: "1", nome: "Carlos Mendes", especialidade: "Node.js & Backend" },
      { id: "2", nome: "Ana Silva", especialidade: "TypeScript Avançado" },
    ],
  });
}
