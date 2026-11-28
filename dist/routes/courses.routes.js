import { Router } from "express";
import { getCourses, getFeaturedCourses, getCourseById, createCourse, deleteCourse, } from "../controllers/courses.controller.js";
import { adminGuard } from "../middlewares/adminGuard.js";
const coursesRouter = Router();
// 1. Rota mais específica PRIMEIRO (evita que /featured seja capturado por /:id)
coursesRouter.get("/featured", getFeaturedCourses);
// 2. Rotas gerais e com parâmetros
coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCourseById);
// 3. Rotas de escrita (DELETE protegido por adminGuard)
coursesRouter.post("/", createCourse);
coursesRouter.delete("/:id", adminGuard, deleteCourse);
export default coursesRouter;
