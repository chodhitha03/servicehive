import { Router } from "express";
import { asyncHandler } from "../../shared/utils/async-handler";
import { validate } from "../../middleware/validate.middleware";
import { authMiddleware } from "../../middleware/auth.middleware";
import * as authController from "./auth.controller";
import { loginSchema, refreshSchema, registerSchema, resetPasswordSchema } from "./auth.validation";

export const authRoutes = Router();

authRoutes.post(
  "/register",
  validate(registerSchema),
  asyncHandler(authController.register)
);

authRoutes.post(
  "/login",
  validate(loginSchema),
  asyncHandler(authController.login)
);

authRoutes.post(
  "/refresh",
  validate(refreshSchema),
  asyncHandler(authController.refresh)
);

authRoutes.post(
  "/logout",
  authMiddleware,
  asyncHandler(authController.logout)
);

authRoutes.get("/me", authMiddleware, asyncHandler(authController.me));

authRoutes.post(
  "/reset-password",
  validate(resetPasswordSchema),
  asyncHandler(authController.resetPassword)
);