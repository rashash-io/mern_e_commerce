import express from 'express'

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

//Categories
router.get("/", getAllCategories);
router.post("/", protectRoute, adminRoute, createCategory);
router.patch("/:id", protectRoute, adminRoute, updateCategory);
router.delete("/:id", protectRoute, adminRoute, deleteCategory);

export default router