import express, { Request, Response } from "express";
import { requestTime } from "./middlewares/logger";

const app = express();
app.use(express.json());

// tarefa 01
app.use((_req, _res, next) => {
  console.log("👉 Pedido recebido!");
  next();
});

// tarefa 02
app.use((req, res, next) => {
  res.on("finish", () => {
    console.log(`Metodo: ${req.method}, url:${req.originalUrl}`);
  });

  next();
});

// tarefa 03
app.use((_req, res, next) => {
  res.setHeader("X-Powered-By-Platform", "VideoPlatform-Engine");
  next();
});

// tarefa 04

app.use((_req, res, next) => {
  const isMaintenanceMode = false;

  if (isMaintenanceMode) {
    return res
      .status(503)
      .json({ error: "Sistema temporariamente em manutenção!" });
  }
  next();
});

// tarefa 05
app.use((_req, res, next) => {
  res.on("finish", () => {
    console.log("Resposta enviada com status:", res.statusCode);
  });

  next();
});

app.use(requestTime);

app.get("/users", (_req: Request, res: Response) => {
  res.status(200).json({ user: "users" });
});

app.get("/ping", (req: Request, res: Response) => {
  const time = (req as any).requestTime;

  res.json({
    message: "Pong!",
    requestTime: time,
  });
});

const port = 7000;

app.listen(port, () => {
  console.log(`server a rodar na port ${port}`);
});
