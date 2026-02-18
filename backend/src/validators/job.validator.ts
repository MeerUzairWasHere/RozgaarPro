import { z } from "zod";
import { requiredFieldStringSchema } from "./zod.schema";

export const validateJobCreateInput = z.object({
  title: requiredFieldStringSchema("title", 1, 255),
  description: requiredFieldStringSchema("description", 1, 500),
  location: requiredFieldStringSchema("location", 1, 255),
  budget: z.number().optional(),
  isCompleted: z.boolean().default(false),
  userId: requiredFieldStringSchema("userId", 1, 255),
});
