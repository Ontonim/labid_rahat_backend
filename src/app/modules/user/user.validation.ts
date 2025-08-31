import * as z from "zod";
import { Role, isActive } from "./user.interface";


export const createUserValidation = z.object({
  body: z.object({
    name: z.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters"),
    email: z.string()
      .email("Invalid email address"),
    password: z.string()
      .min(6, "Password must be at least 6 characters"),
    picture: z.string()
      .url("Invalid image URL")
      .optional(),
    role: z.enum([Role.USER, Role.ADMIN, Role.MODERATOR, Role.PENDING]).optional(),
    isActive: z.enum([isActive.ACTIVE, isActive.INACTIVE, isActive.BLOCKED]).optional(),
    isVerified: z.boolean().optional(),
  }),
});

export const updateUserValidation = z.object({
  body: z.object({
    name: z.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name cannot exceed 50 characters")
      .optional(),
    email: z.string()
      .email("Invalid email address")
      .optional(),
    picture: z.string()
      .url("Invalid image URL")
      .optional(),
    isActive: z.enum([isActive.ACTIVE, isActive.INACTIVE, isActive.BLOCKED])
      .optional(),
    isVerified: z.boolean().optional(),
  }),
});
