import express from 'express'

import {
  getAllCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  toggleEnable,
} from "../controllers/category.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";


const router = express.Router();

//Categories
router.get("/", getAllCategories);
router.post("/", protectRoute, adminRoute, createCategory);
router.put("/:id", protectRoute, adminRoute, updateCategory);
router.patch("/:id", protectRoute, adminRoute, toggleEnable);
router.delete("/:id", protectRoute, adminRoute, deleteCategory);

export default router