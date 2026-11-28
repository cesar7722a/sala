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

coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCoursesById);
coursesRouter.get("/featured", getFeatured);
coursesRouter.get("/:id/reviews", getReviews);

export default coursesRouter;
