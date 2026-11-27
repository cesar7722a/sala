import express from "express";
import healthRoutes from "./routes/routes.health.js";

const app = express();
app.use(express.json());

app.use("/health", healthRoutes);

const port = 7002;
app.listen(port, () => {
  console.log(`Servidor a rudar em ${port}`);
});
