import express from "express";
import { globalLogger } from "./middlewares/logger.js";
import apiRouter from "./routes/api.js";

const app = express();
app.use(express.json());
app.use(globalLogger);

app.use("/api/v1", apiRouter);

const port = 7002;
app.listen(port, () => {
  console.log(`Servidor a rudar em ${port}`);
});
