import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import morgan from "morgan";
import { env } from "./config/env";
import { errorHandler, ApiError } from "./middleware/error.middleware";
import { authRoutes } from "./modules/auth/auth.routes";
import { leadRoutes } from "./modules/leads/leads.routes";

export const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.CORS_ORIGIN.split(",").map((origin) => origin.trim()),
    credentials: true
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

if (env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, message: "OK" });
});

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);

app.use((req, _res, next) => {
  next(new ApiError(404, `Route not found: ${req.method} ${req.path}`));
});

app.use(errorHandler);