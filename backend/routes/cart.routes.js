import express from "express";
import { addToCart, removeAllFromCart, getCartProducts, updateQuantity ,clearCart} from "../controller/cart.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectedRoute, getCartProducts);
router.post("/", protectedRoute, addToCart);
router.delete("/", protectedRoute, removeAllFromCart);
router.patch("/:id", protectedRoute, updateQuantity);
router.delete("/clear", protectedRoute, clearCart);



export default router;