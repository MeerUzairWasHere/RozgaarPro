import { z } from "zod";

export const requiredFieldStringSchema = (
  field: string,
  min: number = 1,
  max: number = 255,
) =>
  z
    .string(`${field} is required and must be a string`)
    .min(min, { message: `${field} must be at least ${min} characters long` })
    .max(max, { message: `${field} must be at most ${max} characters long` });

export const requiredFieldNumberSchema = (
  field: string,
  min: number = 1,
  max: number = 255,
) =>
  z
    .number(`${field} is required and must be a number`)
    .min(min, { message: `${field} must be at least ${min}` })
    .max(max, { message: `${field} must be at most ${max}` });

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

export const allowedOperatorSchema = z.enum([
  "eq",
  "neq",
  "gt",
  "gte",
  "lt",
  "lte",
  "in",
  "nin",
  "contains",
  "startsWith",
  "endsWith",
] as const);

export function allowedFilterFieldSchema<
  T extends readonly [string, ...string[]],
>(fields: T) {
  return z.enum(fields);
}

export function filterableFields<
  T extends readonly [string, ...string[]],
>(fields: T) {
  return z.object({
    field: allowedFilterFieldSchema(fields),
    operator: allowedOperatorSchema,
    value: z.any(),
  });
}
