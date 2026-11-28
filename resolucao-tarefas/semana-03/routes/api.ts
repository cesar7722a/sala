import { Router } from "express";
import coursesRouter from "./courses.routes";
import categorriesRouter from "./categories.routes";
import instructorsRouter from "./instructors.routes";
import healthRoutes from "./routes.health";
import studentsRoutes from "./students.routes";
import lessonRouter from "./lessons.routes";

const apiRouter = Router();

apiRouter.use("/health", healthRoutes);
apiRouter.use("/students", studentsRoutes);
apiRouter.use("/instructors", instructorsRouter);
apiRouter.use("/courses", coursesRouter);
apiRouter.use("/lessons", lessonRouter);
apiRouter.use("/categories", categorriesRouter);

export default apiRouter;
