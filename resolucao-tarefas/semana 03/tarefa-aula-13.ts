import express, { Request, Response } from "express";

const app = express();
app.use(express.json());

// tarefa 1
app.get("/api/v1/info", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ name: "Video Platform API", version: "1.0.0", author: "Teu Nome" });
});

// tarefa 2

app.get("/ping", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ message: "pong", serverTime: new Date().toISOString() });
});

// tarefa 3

app.post("/test-created", (req: Request, res: Response) => {
  const { name, email, id } = req.body;
  res.status(201).json({ success: true, id, email, name });
});

// tarefa 4

app.delete("/clear-session", (_req: Request, res: Response) => {
  res.status(204).send();
});
