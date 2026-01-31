import { z } from "zod";
import {
  requiredFieldNumberSchema,
  requiredFieldStringSchema,
} from "./zod.schema";

export const validateFreelancerProfileCompletedInput = z.object({
  professionId: z.uuid({ message: "Invalid professionId" }),
  skillIds: z
    .array(z.uuid({ message: "Invalid skillId" }))
    .min(1, {
      message: "skillIds must be at least 1 long",
    })
    .max(3, { message: "skillIds must be at most 3 long" }),
  experience: requiredFieldNumberSchema("experience", 0, 5),
  location: z.object(
    {
      latitude: requiredFieldNumberSchema("latitude", -90, 90),
      longitude: requiredFieldNumberSchema("longitude", -180, 180),
      accuracy: requiredFieldNumberSchema("accuracy", 0, 15),
    },
    "location must be a valid object of latitude, longitude and accuracy",
  ),
});

export const validateGetAllVisibleFreelancersInput = z.object({
  location: z.object(
    {
      latitude: requiredFieldNumberSchema("latitude", -90, 90),
      longitude: requiredFieldNumberSchema("longitude", -180, 180),
    },
    "location must be a valid object of latitude, longitude.",
  ),
});
