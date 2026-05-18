import { z } from "zod";
import { UserRole } from "../../shared/constants/roles";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .max(72, "Password must be at most 72 characters");

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Valid email required"),
    password: passwordSchema,
    role: z.nativeEnum(UserRole).optional()
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email("Valid email required"),
    password: z.string().min(1, "Password is required")
  })
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().min(1, "Refresh token required")
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    email: z.string().email("Valid email required"),
    newPassword: passwordSchema
  })
});