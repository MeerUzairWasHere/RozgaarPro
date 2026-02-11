import { z } from "zod";
import { requiredFieldNumberSchema } from "./zod.schema";

export const validateProfessionFilterListInput = z.object({
  location: z.object({
    latitude: requiredFieldNumberSchema("latitude", -90, 90),
    longitude: requiredFieldNumberSchema("longitude", -180, 180),
  }),
});
