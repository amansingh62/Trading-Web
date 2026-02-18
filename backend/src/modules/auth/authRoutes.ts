import { Router } from "express";
import { getMe, login, logout, refreshToken, register } from "../auth/authController.js";
import { requireAuth } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.post("/logout", logout);

router.get("/me", requireAuth, getMe);

export default router;