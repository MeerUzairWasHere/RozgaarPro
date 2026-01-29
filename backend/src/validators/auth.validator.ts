import { Role } from "@prisma/client";
import { z } from "zod";
import {
  emailSchema,
  requiredFieldStringSchema,
  otpSchema,
  passwordSchema,
  phoneSchema,
} from "./zod.schema";

export const validateRegisterInput = z.object({
  name: requiredFieldStringSchema("name"),
  phone: phoneSchema,
  password: passwordSchema(),
  role: z.enum([Role.USER, Role.FREELANCER]),
});

export const validateLoginInput = z.object({
  email: emailSchema.optional(),
  phone: phoneSchema.optional(),
  password: passwordSchema(),
});

export const validateUpdatePasswordInput = z.object({
  oldPassword: passwordSchema("oldPassword"),
  newPassword: passwordSchema("newPassword"),
});

export const validateVerifyEmailInput = z.object({
  verificationToken: requiredFieldStringSchema("verificationToken"),
  email: emailSchema,
});

export const validateForgotPasswordInput = z.object({
  email: emailSchema,
});

export const validateResetPasswordInput = z.object({
  token: requiredFieldStringSchema("token"),
  newPassword: passwordSchema("newPassword"),
  email: emailSchema,
});

export const validateRequestOtpInput = z.object({
  phone: phoneSchema,
});

export const validateVerifyOtpInput = z.object({
  phone: phoneSchema,
  code: otpSchema,
});
