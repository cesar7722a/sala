import express, { Request, Response } from "express";
import process from "node:process";
import { requestLoggerAndTimer } from "./middlewares/logger.js";

// 1. Tipagem da Entidade de Curso
export interface Course {
  id: string;
  title: string;
  price: number;
  instructorId: number;
  createdAt: Date;
}
// 2. Base de Dados em memória (Array tipado para testes iniciais)
const courses: Course[] = [
  {
    id: "1",
    title: "Fundamentos de Node.js e TypeScript",
    price: 15000,
    instructorId: 101,
    createdAt: new Date(),
  },
];

export const app = express();

app.use(express.json());

app.use(requestLoggerAndTimer);

app.get("/health", (_req: Request, res: Response) => {
  res
    .status(200)
    .json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.get("/courses", (req: Request, res: Response) => {
  // 1. Extração e sanitização dos parâmetros de consulta (req.query)
  const search =
    typeof req.query.search === "string" ? req.query.search.toLowerCase() : "";
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;
  // Validação: se minPrice for maior que maxPrice, lança erro!
  if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
    throw new Error("O preço mínimo não pode ser superior ao preço máximo!");
  }
  // 2. Paginação defensiva (padrão: página 1, limite 5; limite máximo de segurança: 20)
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(20, Math.max(1, Number(req.query.limit) || 5));
  // 3. Aplicação dos filtros dinâmicos
  let filteredCourses = courses;
  if (search) {
    filteredCourses = filteredCourses.filter((c) =>
      c.title.toLowerCase().includes(search),
    );
  }
  if (minPrice !== undefined) {
    filteredCourses = filteredCourses.filter((c) => c.price >= minPrice);
  }
  if (maxPrice !== undefined) {
    filteredCourses = filteredCourses.filter((c) => c.price <= maxPrice);
  }
  // 4. Corte de paginação com slice
  const startIndex = (page - 1) * limit;
  const paginatedData = filteredCourses.slice(startIndex, startIndex + limit);
  // 5. Resposta padronizada com metadados para o Frontend (React/Next.js)
  return res.status(200).json({
    page,
    limit,
    totalItems: filteredCourses.length,
    totalPages: Math.ceil(filteredCourses.length / limit),
    data: paginatedData,
  });
});

app.get("/courses/:id", (req: Request, res: Response) => {
  const { id } = req.params;

  const course = courses.find((e) => e.id === id);

  if (!course) {
    return res
      .status(404)
      .json({ error: `Curso com ID '${id}' não encontrado!` });
  }

  return res.status(200).json(course);
});

app.post("/courses", (req: Request, res: Response) => {
  const { title, price, instructorId } = req.body;

  // Validação Fail-Fast de entrada
  if (!title || typeof price !== "number" || !instructorId) {
    return res.status(400).json({
      error:
        "Campos obrigatórios inválidos: 'title' (string), 'price' (number) e 'instructorId' (number) são necessários.",
    });
  }

  const newCourse: Course = {
    id: String(Date.now()),
    title,
    price,
    instructorId,
    createdAt: new Date(),
  };

  courses.push(newCourse);

  // Status 201 Created é obrigatório na criação de recursos REST
  return res.status(201).json(newCourse);
});

// DELETE /courses/:id — Eliminar curso
app.delete("/courses/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const index = courses.findIndex((c) => c.id === id);
  if (index === -1) {
    return res
      .status(404)
      .json({ error: `Curso com ID '${id}' não encontrado!` });
  }
  courses.splice(index, 1);
  // Status 204 No Content: Sucesso absoluto, sem corpo de resposta
  return res.status(204).send();
});

// Middleware Global de Tratamento de Erros (4 argumentos obrigatórios!)
app.use(
  (err: Error, _req: Request, res: Response, _next: express.NextFunction) => {
    console.error("💥 [Erro Global Capturado]:", err.message);

    return res.status(400).json({
      error: "Erro na requisição",
      details: err.message,
      timestamp: new Date().toISOString(),
    });
  },
);

// 4. Arranque do Servidor
const PORT = 3333;
const isMain = process.argv[1]?.endsWith("server.ts");
if (isMain) {
  app.listen(PORT, () => {
    console.log(
      `🚀 Servidor Express da Plataforma a correr em http://localhost:${PORT}`,
    );
    console.log(`📡 Endpoints disponíveis:`);
    console.log(`   - GET    /health`);
    console.log(`   - GET    /courses`);
    console.log(`   - GET    /courses/:id`);
    console.log(`   - POST   /courses`);
    console.log(`   - DELETE /courses/:id`);
  });
}
