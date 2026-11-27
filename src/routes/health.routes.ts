import { Router, Request, Response } from "express";

const healthRouter = Router();

// GET /health
healthRouter.get("/", (_req: Request, res: Response) => {
  return res.status(200).json({
    status: "healthy",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

export default healthRouter;
