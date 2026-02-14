import { z } from "zod";
import {
  filterableFields,
  locationSchema,
  locationWithAccuracySchema,
  requiredFieldNumberSchema,
  searchSchema,
  sortableFields,
  validatePaginationInput,
} from "./zod.schema";

export const validateFreelancerProfileCompletedInput = z.object({
  professionId: z.string().uuid({ message: "Invalid professionId" }),

  skillIds: z
    .string()
    .transform((val) => JSON.parse(val))
    .pipe(
      z
        .array(z.string().uuid({ message: "Invalid skillId" }))
        .min(1, { message: "skillIds must be at least 1 long" })
        .max(3, { message: "skillIds must be at most 3 long" }),
    ),

  experience: z
    .string()
    .transform((val) => Number(val))
    .pipe(requiredFieldNumberSchema("experience", 0, 99)),

  location: z
    .string()
    .transform((val) => JSON.parse(val))
    .pipe(locationWithAccuracySchema),
});




export const validateGetAllVisibleFreelancersInput = z.object({
  location: locationSchema,
  filters: z
    .array(
      filterableFields([
        "primaryProfessionId",
        "rating",
        "distance_km",
        "experience",
      ]),
    )
    .optional(),
  pagination: validatePaginationInput.optional(),
  sort: z
    .array(sortableFields(["rating", "distance_km", "experience"]))
    .optional(),
  search: searchSchema.optional(),
});

export const validateGetSingleVisibleFreelancerDetailInput = z.object({
  location: locationSchema,
});

export const freelancerIdParamSchema = z.object({
  freelancerId: z.uuid("freelancerId is required and must be a valid UUID"),
});
