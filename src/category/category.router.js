import { Router } from "express";
import { addCategory, deleteCategory, getCategory, updateCategory } from "./category.controller.js";
import { createCategoryValidator, deleteCategoryValidator, updateCategoryValidator } from "../middlewares/category-validators.js";

const router = Router();

router.post("/addCategory", createCategoryValidator, addCategory);

router.get("/", getCategory);

router.patch("/updateCategory/:id", updateCategoryValidator, updateCategory);

router.delete("/deleteCategory/:id", deleteCategoryValidator, deleteCategory);

export default router;

