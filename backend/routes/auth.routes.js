import express from "express";
import { login, signup, logout, refreshToken} from "../controller/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { getProfile } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/login", login);

router.post("/signup", signup);

router.post("/logout", logout);

router.post("/refreshToken",refreshToken);

router.get("/profile", protectedRoute, getProfile);




export default router;


