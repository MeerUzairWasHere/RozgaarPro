import { z } from "zod";
import {
  emailSchema,
  requiredFieldStringSchema,
  phoneSchema,
} from "./zod.schema";

export const validateCompanyCreateInput = z.object({
  name: requiredFieldStringSchema("name"),
  address: requiredFieldStringSchema("address"),
  website: z
    .url({ message: "Invalid website URL format" })
    .min(1, { message: "website is required" })
    .max(255, { message: "website must be at most 255 characters long" }),
  phone: phoneSchema,
  email: emailSchema,
  verified_resend_domain: requiredFieldStringSchema(
    "verified_resend_domain",
    1,
    55,
  ),
});
