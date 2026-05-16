import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  MONGODB_URI: z.string().min(1),
  JWT_ACCESS_SECRET: z.string().min(1),
  JWT_REFRESH_SECRET: z.string().min(1),
  JWT_ACCESS_EXPIRES_IN: z.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("http://localhost:5173")
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  const errorMessages = parsed.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join(" | ");
  throw new Error(`Invalid environment configuration: ${errorMessages}`);
}

export const env = parsed.data;