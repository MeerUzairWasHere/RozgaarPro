import { z } from "zod";
import { validatePaginationInput } from "./zod.schema";

export const validateCreateReviewInput = z.object({
  freelancerId: z.uuid({ message: "Invalid freelancerId" }),
  rating: z.number().int().min(1).max(5),
  comment: z
    .string()
    .trim()
    .max(500, { message: "comment must be at most 500 characters" })
    .optional()
    .transform((value) => (value && value.length > 0 ? value : null)),
});

export const validateListReviewsInput = z.object({
  pagination: validatePaginationInput.optional(),
});

export const reviewFreelancerIdParamSchema = z.object({
  freelancerId: z.uuid("freelancerId is required and must be a valid UUID"),
});
