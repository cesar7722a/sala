import { Request, Response } from "express";

export function getCourses(_req: Request, res: Response) {
  res.status(200).json({ sucesso: "a funcionar" });
}

export function getFeatured(_req: Request, res: Response) {
  res.status(200).json({ return: "featured" });
}

export function getCoursesById(req: Request, res: Response) {
  const id = req.params;

  res.status(200).json({ id: id, return: "id" });
}

export function getReviews(req: Request, res: Response) {
  const { id } = req.params;

  res.status(200).json({ id: id, return: "reviews" });
}
