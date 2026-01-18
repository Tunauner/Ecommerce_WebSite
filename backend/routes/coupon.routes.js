import express from "express";
import { validateCoupon, getCoupon} from "../controller/coupon.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute,getCoupon);
router.post("/validate",protectedRoute, validateCoupon);

export default router;