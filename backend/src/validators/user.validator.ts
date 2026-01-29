import { Role } from "@prisma/client";
import { z } from "zod";
import {
  emailSchema,
  requiredFieldStringSchema,
  passwordSchema,
  phoneSchema,
} from "./zod.schema";

//#region User

export const validateUserCreateInput = z.object({
  username: requiredFieldStringSchema("username").optional(),
  name: requiredFieldStringSchema("name"),
  email: emailSchema.optional(),
  phone: phoneSchema,
  password: passwordSchema(),
  role: z.enum(Role).default(Role.USER),
  isVerified: z.boolean().default(false).optional(),
  verificationToken: z.string().max(255).optional().nullable(),
  passwordToken: z.string().max(255).optional().nullable(),
  passwordTokenExpirationDate: z.date().optional().nullable(),
  verified: z.date().optional().nullable(),
});

export const validateUserUpdateInput = z.object({
  username: requiredFieldStringSchema("username").optional(),
  name: requiredFieldStringSchema("name").optional(),
  email: emailSchema.optional(),
  password: passwordSchema().optional(),
  role: z.enum(Role).optional(),
  profileCompleted: z.boolean().optional(),
  isVerified: z.boolean().optional(),
  verificationToken: requiredFieldStringSchema("verificationToken")
    .optional()
    .nullable(),
  passwordToken: requiredFieldStringSchema("passwordToken")
    .optional()
    .nullable(),
  passwordTokenExpirationDate: z.date().optional().nullable(),
  verified: z.date().optional().nullable(),
});

//#endregion
