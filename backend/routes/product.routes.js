import express from "express";
import {
  getAllProducts,
  getFeaturedProducts,
  createProduct,
  deleteProduct,
  getRecommendedProducts,
  getProducstByCategory,
  toggleFeaturedProduct,
} from "../controller/product.controller.js";
import { adminRoute, protectedRoute } from "../middleware/auth.middleware.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

/*  MULTER CONFIG */

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9,
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

/*  ROUTES  */

router.get("/", protectedRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommended", getRecommendedProducts);
router.get("/category/:category", getProducstByCategory);
router.patch("/:id", protectedRoute, adminRoute, toggleFeaturedProduct);

router.post(
  "/",
  protectedRoute,
  adminRoute,
  upload.array("images", 5), //  multi image
  createProduct,
);

router.delete("/:id", protectedRoute, adminRoute, deleteProduct);

export default router;
