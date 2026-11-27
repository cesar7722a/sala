import { Request, Response, Router } from "express";

const healthRoutes = Router();

healthRoutes.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "online" });
});

export default healthRoutes;
