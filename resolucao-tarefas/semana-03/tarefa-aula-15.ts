import express, { NextFunction, Request, Response } from "express";
import healthRoutes from "./routes/routes.health.js";
import studentsRoutes from "./routes/students.routes.js";
import instructorsRouter from "./routes/instructors.routes.js";
import coursesRouter from "./routes/courses.routes.js";
import lessonRouter from "./routes/lessons.routes.js";
import categorriesRouter from "./routes/categories.routes.js";
import { globalLogger } from "./middlewares/logger.js";

const app = express();
app.use(express.json());
app.use(globalLogger);

app.use("/health", healthRoutes);
app.use("/students", studentsRoutes);
app.use("/instructors", instructorsRouter);
app.use("/courses", coursesRouter);
app.use("/lessons", lessonRouter);
app.use("/categories", categorriesRouter);

const port = 7002;
app.listen(port, () => {
  console.log(`Servidor a rudar em ${port}`);
});
