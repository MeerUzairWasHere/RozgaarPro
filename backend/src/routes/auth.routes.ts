import { Router } from "express";
import { authController } from "../container";
import { validate } from "../decorators";
import {
  validateForgotPasswordInput,
  validateLoginInput,
  validateRegisterInput,
  validateRequestOtpInput,
  validateResetPasswordInput,
  validateVerifyEmailInput,
  validateVerifyOtpInput,
} from "../validators";

import { authGuard } from "../guards";

const router = Router();

router.post(
  "/sign-up",
  validate({ body: validateRegisterInput }),
  authController.registerUser,
);

router.post(
  "/sign-in",
  validate({ body: validateLoginInput }),
  authController.login,
);

router.post("/refresh-token", authController.refreshToken);

router.post("/sign-out", authGuard, authController.logout);

router.post(
  "/request-otp",
  validate({ body: validateRequestOtpInput }),
  authController.requestOtp,
);

router.post(
  "/verify-otp",
  validate({ body: validateVerifyOtpInput }),
  authController.verifyOtp,
);

router.post(
  "/verify-email",
  validate({ body: validateVerifyEmailInput }),
  authController.verifyEmail,
);

router.post(
  "/forgot-password",
  validate({ body: validateForgotPasswordInput }),
  authController.forgotPassword,
);

router.post(
  "/reset-password",
  validate({ body: validateResetPasswordInput }),
  authController.resetPassword,
);

export default router;
