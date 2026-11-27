import { Request, Response, Router } from "express";

const studentsRoutes = Router();

studentsRoutes.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ sucesso: "a funcionar" });
});

studentsRoutes.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  res.json({
    mensagem: "Usuário encontrado",
    id: id,
  });
});

studentsRoutes.get("/:id/profile", (req: Request, res: Response) => {
  res.status(200).json({ sucesso: "podes ver o teu perfil" });
});

export default studentsRoutes;
