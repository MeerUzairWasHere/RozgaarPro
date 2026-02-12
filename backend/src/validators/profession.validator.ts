import { z } from "zod";
import { locationSchema } from "./zod.schema";

export const validateProfessionFilterListInput = z.object({
  location: locationSchema,
  radius: z.number().min(1).max(100).optional(),
});
