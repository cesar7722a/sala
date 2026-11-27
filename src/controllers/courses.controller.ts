import type { Request, Response } from "express";

// 1. Tipagem da Entidade de Curso
export interface Course {
  id: string;
  title: string;
  price: number;
  instructorId: number;
  createdAt: Date;
}

// 2. Base de Dados em memória para simulação corporativa
const courses: Course[] = [
  {
    id: "1",
    title: "Fundamentos de Node.js e TypeScript",
    price: 15000,
    instructorId: 101,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "TypeScript Avançado",
    price: 20000,
    instructorId: 102,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Express.js na Prática",
    price: 12000,
    instructorId: 103,
    createdAt: new Date(),
  },
];

// GET /courses — Listagem com filtros e paginação defensiva
export function getCourses(req: Request, res: Response) {
  // 1. Extração e sanitização dos parâmetros de consulta (req.query)
  const search =
    typeof req.query.search === "string" ? req.query.search.toLowerCase() : "";
  const minPrice = req.query.minPrice ? Number(req.query.minPrice) : undefined;
  const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : undefined;

  // Validação: se minPrice for maior que maxPrice, lança erro para o errorHandler central
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

  if (minPrice !== undefined && !Number.isNaN(minPrice)) {
    filteredCourses = filteredCourses.filter((c) => c.price >= minPrice);
  }

  if (maxPrice !== undefined && !Number.isNaN(maxPrice)) {
    filteredCourses = filteredCourses.filter((c) => c.price <= maxPrice);
  }

  // 4. Corte de paginação com slice
  const startIndex = (page - 1) * limit;
  const paginatedData = filteredCourses.slice(startIndex, startIndex + limit);

  // 5. Resposta padronizada com metadados para consumo no Frontend
  return res.status(200).json({
    success: true,
    page,
    limit,
    totalItems: filteredCourses.length,
    totalPages: Math.ceil(filteredCourses.length / limit),
    data: paginatedData,
  });
}

// GET /courses/featured — Rota específica para cursos em destaque
export function getFeaturedCourses(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    data: courses.slice(0, 2),
  });
}

// GET /courses/:id — Obter curso por identificador único
export function getCourseById(req: Request, res: Response) {
  const { id } = req.params;
  const course = courses.find((item) => item.id === id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: `Curso com ID '${id}' não encontrado!`,
    });
  }

  return res.status(200).json({
    success: true,
    data: course,
  });
}

// POST /courses — Criar novo curso
export function createCourse(req: Request, res: Response) {
  const { title, price, instructorId } = req.body;

  // Validação Fail-Fast de entrada
  if (!title || typeof price !== "number" || !instructorId) {
    return res.status(400).json({
      success: false,
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
  return res.status(201).json({
    success: true,
    data: newCourse,
  });
}

// DELETE /courses/:id — Eliminar curso
export function deleteCourse(req: Request, res: Response) {
  const { id } = req.params;
  const index = courses.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({
      success: false,
      error: `Curso com ID '${id}' não encontrado!`,
    });
  }

  courses.splice(index, 1);

  // Status 204 No Content: Sucesso absoluto, sem corpo de resposta
  return res.status(204).send();
}
