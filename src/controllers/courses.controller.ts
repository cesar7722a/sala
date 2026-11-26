import type { Request, Response } from "express";

interface Course {
  id: string;
  title: string;
  price: number;
}

const courses: Course[] = [
  { id: "1", title: "Node.js Fundamentals", price: 15000 },
  { id: "2", title: "TypeScript Avançado", price: 20000 },
  { id: "3", title: "Express.js na Prática", price: 12000 },
];

// GET /courses
export function getCourses(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    data: courses,
  });
}

// GET /courses/:id
export function getCourseById(req: Request, res: Response) {
  const { id } = req.params;

  const course = courses.find((item) => item.id === id);

  if (!course) {
    return res.status(404).json({
      success: false,
      error: "Curso não encontrado",
    });
  }

  return res.status(200).json({
    success: true,
    data: course,
  });
}

// GET /courses/featured
export function getFeaturedCourses(_req: Request, res: Response) {
  return res.status(200).json({
    success: true,
    data: courses.slice(0, 2),
  });
}
