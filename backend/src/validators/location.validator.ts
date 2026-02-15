import { z } from "zod";
import { locationSchema } from "./zod.schema";

export const validateGetAddressFromCoordinatesInput = z.object({
  location: locationSchema,
});
