import { Router } from "express";
import { getInstructors } from "../controllers/instructors.controller.js";

const instructorsRouter = Router();

instructorsRouter.get("/", getInstructors);

export default instructorsRouter;
