import { Router } from "express";
import {
  getCourses,
  getCoursesById,
  getFeatured,
  getReviews,
} from "../controllers/courses.controllers.js";

const coursesRouter = Router();

coursesRouter.get("/", getCourses);
coursesRouter.get("/:id", getCoursesById);
coursesRouter.get("/featured", getFeatured);
coursesRouter.get("/:id/reviews", getReviews);

export default coursesRouter;
