import { Router } from "express";

import {
  getCourses,
  getCourseById,
  getFeaturedCourses,
} from "../controllers/courses.controller.js";

const coursesRouter = Router();

// Rota mais específica primeiro
coursesRouter.get("/featured", getFeaturedCourses);

// Rotas gerais
coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCourseById);

export default coursesRouter;
