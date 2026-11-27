import express from "express";
import healthRoutes from "./routes/routes.health.js";
import studentsRoutes from "./routes/students.routes.js";
import instructorsRouter from "./routes/instructors.routes.js";

const app = express();
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/students", studentsRoutes);
app.use("/instructors", instructorsRouter);

const port = 7002;
app.listen(port, () => {
  console.log(`Servidor a rudar em ${port}`);
});
