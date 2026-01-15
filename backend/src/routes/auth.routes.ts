import { Router } from "express";
import { authController } from "../container";
import { validate } from "../decorators";
import {
  validateForgotPasswordInput,
  validateLoginInput,
  validateRegisterInput,
  validateResetPasswordInput,
  validateVerifyEmailInput,
} from "../validators";

import { authGuard } from "../guards";

const router = Router();

router.post(
  "/sign-up",
  validate(validateRegisterInput),
  authController.registerUser
);

router.post("/sign-in", validate(validateLoginInput), authController.login);

router.delete("/logout", authGuard, authController.logout);

router.post(
  "/verify-email",
  validate(validateVerifyEmailInput),
  authController.verifyEmail
);

router.post(
  "/forgot-password",
  validate(validateForgotPasswordInput),
  authController.forgotPassword
);

router.post(
  "/reset-password",
  validate(validateResetPasswordInput),
  authController.resetPassword
);

export default router;
