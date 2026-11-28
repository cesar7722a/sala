import { Router } from "express";
import {
  getLessonsByCourse,
  getLessonById,
} from "../controllers/lessons.controller.js";

const lessonsRouter = Router();

// Sub-recursos aninhados: /courses/:courseId/lessons
lessonsRouter.get("/courses/:courseId/lessons", getLessonsByCourse);
lessonsRouter.get("/courses/:courseId/lessons/:lessonId", getLessonById);

export default lessonsRouter;
