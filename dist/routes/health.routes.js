import { Router } from "express";
const healthRouter = Router();
// GET /health
healthRouter.get("/", (_req, res) => {
    return res.status(200).json({
        status: "healthy",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
    });
});
export default healthRouter;
