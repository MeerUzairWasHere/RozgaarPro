import { z } from "zod";

export const emailSchema = z.string().email("Invalid email address");

export const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits");

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters");
