import { Request, Response } from "express";
import { sendSuccess } from "../../shared/utils/response";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response) => {
  const result = await authService.register(req.body);
  return sendSuccess(res, 201, "User registered successfully", result);
};

export const login = async (req: Request, res: Response) => {
  const result = await authService.login(req.body);
  return sendSuccess(res, 200, "Login successful", result);
};

export const refresh = async (req: Request, res: Response) => {
  const result = await authService.refresh(req.body);
  return sendSuccess(res, 200, "Token refreshed", result);
};

export const logout = async (req: Request, res: Response) => {
  const user = req.user;
  if (user) {
    await authService.logout(user.userId);
  }
  return sendSuccess(res, 200, "Logged out successfully");
};

export const me = async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return sendSuccess(res, 200, "User profile", null);
  }
  const result = await authService.getMe(user.userId);
  return sendSuccess(res, 200, "User profile", result);
};