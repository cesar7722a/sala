import { Router } from "express";
import { getCategories } from "../controllers/categories.controllers.js";

const categorriesRouter = Router();

categorriesRouter.get("/", getCategories);

export default categorriesRouter;
