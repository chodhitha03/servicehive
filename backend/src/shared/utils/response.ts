import { Response } from "express";
import { ApiResponse } from "../types/api";

export const sendSuccess = <T>(
  res: Response,
  status: number,
  message: string,
  data?: T
): Response<ApiResponse<T>> =>
  res.status(status).json({
    success: true,
    message,
    data
  });