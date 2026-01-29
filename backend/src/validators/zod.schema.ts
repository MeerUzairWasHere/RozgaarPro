import { z } from "zod";

export const requiredFieldStringSchema = (
  field: string,
  min: number = 1,
  max: number = 255,
) =>
  z
    .string(`${field} is required`)
    .min(min, { message: `${field} must be at least ${min} characters long` })
    .max(max, { message: `${field} must be at most ${max} characters long` });

export const requiredFieldNumberSchema = (
  field: string,
  min: number = 1,
  max: number = 255,
) =>
  z
    .number(`${field} is required`)
    .min(min, { message: `${field} must be at least ${min} characters long` })
    .max(max, {
      message: `${field} must be at most ${max} characters long`,
    });

export const phoneSchema = z
  .string("phone is required")
  .regex(/^[0-9]{10}$/, { message: "phone must be a valid 10-digit number" });

export const passwordSchema = (field: string = "password") =>
  z
    .string(`${field} is required`)
    .min(8, { message: `${field} must be at least 8 characters long` })
    .max(20, { message: `${field} must be at most 20 characters long` });

export const emailSchema = z.email({ message: "Invalid email format" });

export const otpSchema = z
  .string("code is required")
  .length(6, { message: "code must be 6 digits" });
