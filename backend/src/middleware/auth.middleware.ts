import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "./error.middleware";
import { JwtPayload } from "../modules/auth/auth.types";

export const authMiddleware: RequestHandler = (req, _res, next) => {
  const header = req.headers.authorization;

  if (!header || !header.startsWith("Bearer ")) {
    return next(new ApiError(401, "Authorization required"));
  }

  const token = header.split(" ")[1];

  try {
    const payload = jwt.verify(token, env.JWT_ACCESS_SECRET) as JwtPayload;
    req.user = payload;
    return next();
  } catch (error) {
    return next(new ApiError(401, "Invalid or expired token"));
  }
};