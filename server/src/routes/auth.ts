import { Router } from "express";
import {
  register,
  login,
  getMe,
  refreshToken,
  logout,
} from "../controllers/authController";
import { authenticate as authMiddleware } from "../middleware/authMiddleware";

export const authRouter: Router = Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/refresh", refreshToken);
authRouter.post("/logout", logout);

authRouter.get("/me", authMiddleware, getMe);
