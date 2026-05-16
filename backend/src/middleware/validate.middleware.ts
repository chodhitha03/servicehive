import { RequestHandler } from "express";
import { ZodSchema } from "zod";
import { ApiError } from "./error.middleware";

type ValidationPayload = {
  body?: unknown;
  params?: unknown;
  query?: unknown;
};

export const validate = (schema: ZodSchema): RequestHandler =>
  (req, _res, next) => {
    const result = schema.safeParse({
      body: req.body,
      params: req.params,
      query: req.query
    });

    if (!result.success) {
      return next(new ApiError(400, "Validation failed", result.error.flatten()));
    }

    const data = result.data as ValidationPayload;

    if (data.body) {
      req.body = data.body as typeof req.body;
    }

    if (data.params) {
      req.params = data.params as typeof req.params;
    }

    if (data.query) {
      req.query = data.query as typeof req.query;
    }

    return next();
  };