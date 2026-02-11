import { z } from "zod";
import {
  filterableFields,
  locationSchema,
  locationWithAccuracySchema,
  requiredFieldNumberSchema,
  sortableFields,
  validatePaginationInput,
} from "./zod.schema";

export const validateFreelancerProfileCompletedInput = z.object({
  professionId: z.uuid({ message: "Invalid professionId" }),
  skillIds: z
    .array(z.uuid({ message: "Invalid skillId" }))
    .min(1, {
      message: "skillIds must be at least 1 long",
    })
    .max(3, { message: "skillIds must be at most 3 long" }),
  experience: requiredFieldNumberSchema("experience", 0, 99),
  location: locationWithAccuracySchema,
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
});

export const validateGetSingleVisibleFreelancerDetailInput = z.object({
  location: locationSchema,
});

export const freelancerIdParamSchema = z.object({
  freelancerId: z.uuid("freelancerId is required and must be a valid UUID"),
});
