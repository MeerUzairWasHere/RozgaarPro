import { z } from "zod";
import { locationSchema } from "./zod.schema";

export const validateProfessionFilterListInput = z.object({
  location: locationSchema,
});
