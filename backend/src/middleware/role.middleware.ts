import { RequestHandler } from "express";
import { ApiError } from "./error.middleware";
import { UserRole } from "../shared/constants/roles";

export const requireRole = (...roles: UserRole[]): RequestHandler =>
  (req, _res, next) => {
    const user = req.user;

    if (!user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!roles.includes(user.role)) {
      return next(new ApiError(403, "Insufficient permissions"));
    }

    return next();
  };