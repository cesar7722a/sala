import { Router } from "express";
import { getLesson } from "../controllers/lessons.controllers.js";

const lessonRouter = Router();

lessonRouter.get("/", getLesson);

export default lessonRouter;
