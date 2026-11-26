import express, { Request, Response } from "express";
import { courses } from "../data";

const app = express();

app.use(express.json());

// tarefa 01

app.get("/echo-query", (req: Request, res: Response) => {
  const name =
    typeof req.query.name === "string" ? req.query.name : "visitante";

  res.status(200).json({ saudacao: "Olá " + name });
});

// tarefa 02
app.get("/somar", (req: Request, res: Response) => {
  const a = Number(req.query.a);
  const b = Number(req.query.b);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    return res
      .status(400)
      .json({ error: "Parâmetros 'a' e 'b' devem ser números válidos!" });
  }

  const somar = a + b;

  res.status(200).json({ somar });
});

// tarefa 03

const allTags = ["nodejs", "typescript", "backend", "express", "react"];

app.get("/tags", (req: Request, res: Response) => {
  const search = req.query.search;

  if (typeof search !== "string" || search.trim() === "") {
    return res.status(200).json(allTags);
  }

  const tag = allTags.filter((e) =>
    e.toLowerCase().includes(search.toLowerCase()),
  );

  res.status(200).json(tag);
});

// tarefa 04
const listNumer = [15000, 5000, 30000, 10000];
app.get("/precos", (req: Request, res: Response) => {
  const sort = req.query.sort;

  if (typeof sort !== "string" || sort.trim() === "") {
    return res.status(400).json({
      error: "É necessario o parametro para fazer a ordenação do array número!",
    });
  }

  if (sort === "asc") {
    const ordenarySort = listNumer.sort((a, b) => a - b);
    return res.status(200).json(ordenarySort);
  } else {
    const ordenarySort = listNumer.sort((a, b) => b - a);
    return res.status(200).json(ordenarySort);
  }
});

// tarefa 05

app.get("/couses", (req: Request, res: Response) => {
  const safeLimit = Math.min(50, Math.max(1, Number(req.query.limit) || 10));

  return res.status(200).json({ safeLimit });
});

//tarefa 06
function calculatePagination(
  page: number,
  limit: number,
): { startIndex: number; endIndex: number } {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return { startIndex, endIndex };
}

//tarefa 07
const coursesAll = courses;

app.get("/cursos-paginados", (req: Request, res: Response) => {
  const page = Number(req.query.page);
  const limit = Number(req.query.limit);

  if (Number.isNaN(page) || Number.isNaN(limit)) {
    return res
      .status(400)
      .json({ error: "os dados da page e limit precisam ser um numero!!" });
  }

  const { startIndex, endIndex } = calculatePagination(page, limit);
  const data = coursesAll.slice(startIndex, endIndex);

  const totalItems = coursesAll.length;
  const totalPages = Math.ceil(totalItems / limit);

  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;

  res.status(200).json({
    metadados: {
      page: page,
      limit: limit,
      totalItems: totalItems,
      hasNextPage: hasNextPage,
      hasPrevPage: hasPrevPage,
    },
    data: data,
  });
});

//tarefa 08
app.get("/cursos", (req: Request, res: Response) => {
  const categoria = req.query.categoria;
  const maxPrice = Number(req.query.maxPrice);

  if (
    typeof categoria !== "string" ||
    categoria.trim() === "" ||
    Number.isNaN(maxPrice)
  ) {
    return res
      .status(400)
      .json({ error: "Os dados deve ser enviado na url!!" });
  }

  const data = coursesAll.filter((e) => {
    return (
      e.category.toLowerCase().includes(categoria.toLowerCase()) &&
      e.price >= maxPrice
    );
  });

  res.status(200).json(data);
});

//tarefa 09
app.get("/forcar-erro", () => {
  throw new Error("Falha intencional de simulação!");
});

const port = 7001;
app.listen(port, () => {
  console.log(`Servidor a rodar na port ${port}`);
});
