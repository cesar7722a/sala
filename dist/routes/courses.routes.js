import { Router } from "express";
import { getCourses, getFeaturedCourses, getCourseById, createCourse, deleteCourse, } from "../controllers/courses.controller.js";
const coursesRouter = Router();
// 1. Rota mais específica primeiro (evita que /featured seja capturado por /:id)
coursesRouter.get("/featured", getFeaturedCourses);
// 2. Rotas gerais e por parâmetro
coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCourseById);
coursesRouter.post("/", createCourse);
coursesRouter.delete("/:id", deleteCourse);
export default coursesRouter;
