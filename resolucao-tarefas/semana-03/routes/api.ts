import { Router } from "express";
import coursesRouter from "./courses.routes.js";
import categorriesRouter from "./categories.routes.js";
import instructorsRouter from "./instructors.routes.js";
import healthRoutes from "./routes.health.js";
import studentsRoutes from "./students.routes.js";
import lessonsRouter from "./lessons.routes.js";

const apiRouter = Router();
apiRouter.use("/health", healthRoutes);
apiRouter.use("/students", studentsRoutes);
apiRouter.use("/instructors", instructorsRouter);
apiRouter.use("/courses", coursesRouter);
apiRouter.use(lessonsRouter);
apiRouter.use("/categories", categorriesRouter);

export default apiRouter;
