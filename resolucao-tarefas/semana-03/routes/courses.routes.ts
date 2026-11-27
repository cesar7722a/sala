import { Router } from "express";
import { getCourses } from "../controllers/courses.controllers.js";

const coursesRouter = Router();

coursesRouter.get("/", getCourses);

export default coursesRouter;
