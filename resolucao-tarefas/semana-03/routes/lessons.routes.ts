import { Router } from "express";
import { getLesson } from "../controllers/lessons.controllers.js";
import { handler } from "../controllers/handler.controller.js";

const lessonsRouter = Router();

lessonsRouter.get("/lessons", getLesson);

lessonsRouter.get("/courses/:courseId/lessons", handler);

lessonsRouter.get("/courses/:courseId/lessons/:lessonId", handler);

export default lessonsRouter;
