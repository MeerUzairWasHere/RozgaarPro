import { z } from "zod";
import { FilterOperator } from "../dto";

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

export function allowedFilterFieldSchema<
  T extends readonly [string, ...string[]],
>(fields: T) {
  return z.enum(fields);
}

export function filterableFields<T extends readonly [string, ...string[]]>(
  fields: T,
) {
  return z
    .object({
      field: allowedFilterFieldSchema(fields),
      operator: z.enum(FilterOperator),
      value: z.unknown(),
    })
    .superRefine((data, ctx) => {
      const { operator, value } = data;

      switch (operator) {
        case FilterOperator.IN:
        case FilterOperator.NOT_IN:
          if (!Array.isArray(value)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "IN and NOT_IN require an array value",
              path: ["value"],
            });
          }
          break;

        case FilterOperator.BETWEEN:
          if (!Array.isArray(value) || value.length !== 2) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "BETWEEN requires [min, max]",
              path: ["value"],
            });
          }
          break;

        case FilterOperator.CONTAINS:
        case FilterOperator.STARTS_WITH:
        case FilterOperator.ENDS_WITH:
          if (typeof value !== "string") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "String value required for text operators",
              path: ["value"],
            });
          }
          break;

        case FilterOperator.GREATER_THAN:
        case FilterOperator.GREATER_THAN_OR_EQUAL:
        case FilterOperator.LESS_THAN:
        case FilterOperator.LESS_THAN_OR_EQUAL:
          if (typeof value !== "number") {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: "Numeric value required",
              path: ["value"],
            });
          }
          break;

        default:
          // eq / neq can accept any value
          break;
      }
    });
}

export const validatePaginationInput = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(25),
});
