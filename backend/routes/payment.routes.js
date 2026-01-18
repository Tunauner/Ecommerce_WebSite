import express from "express";
import { createCheckoutSession} from "../controller/payment.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess } from "../controller/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectedRoute, createCheckoutSession);
router.post("/checkout-success", protectedRoute,checkoutSuccess);


export default router;