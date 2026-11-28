import { NextFunction, Request, Response, Router } from "express";
import {
  getCourses,
  getCoursesById,
  getFeatured,
  getReviews,
} from "../controllers/courses.controllers.js";

const coursesRouter = Router();

coursesRouter.use((_req: Request, _res: Response, next: NextFunction) => {
  console.log("Entraste no módulo de cursos!");
  next();
});

function adminGuard(req: Request, res: Response, next: NextFunction) {
  const key = req.headers["x-admin-key"];

  if (key !== "123") {
    return res.status(403).json({ message: "Acesso negado!!" });
  }

  next();
}

coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCoursesById);
coursesRouter.get("/featured", getFeatured);
coursesRouter.get("/:id/reviews", getReviews);
coursesRouter.delete("/:id", adminGuard, (req: Request, res: Response) => {
  res.send(`Curso ${req.params.id} eliminado com sucesso!`);
});

export default coursesRouter;
