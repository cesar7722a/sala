import express from "express";
import healthRoutes from "./routes/routes.health.js";
import studentsRoutes from "./routes/students.routes.js";

const app = express();
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/students", studentsRoutes);

const port = 7002;
app.listen(port, () => {
  console.log(`Servidor a rudar em ${port}`);
});
