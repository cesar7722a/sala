import { Router } from "express";
import healthRouter from "./health.routes.js";
import coursesRouter from "./courses.routes.js";
import lessonsRouter from "./lessons.routes.js";
const apiRouter = Router();
// Submódulos montados sob /api/v1
apiRouter.use("/health", healthRouter);
apiRouter.use("/courses", coursesRouter);
apiRouter.use(lessonsRouter);
export default apiRouter;
