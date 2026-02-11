import { Href } from "expo-router";

export const ROUTES = {
  ONBOARDING: "/(onboarding)/onboarding",
  FREELANCER_ONBOARDING: "/complete-profile",
  SELECT_ROLE: "/(onboarding)/select-role",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  OTP_VERIFICATION: "/otp-verification",
  HOME: "/home",
  JOBS: "/jobs",
  MESSAGES: "/messages",
  PROFILE: "/profile",
  EDIT_PROFILE: "/(screens)/edit-profile",
  HELP_SUPPORT: "/(screens)/help-support",
  SETTINGS: "/(screens)/settings",
  FREELANCERS: "/(screens)/freelancers",
  FREELANCER_HOME: "/(tabs)/home/freelancer",
  USER_HOME: "/(tabs)/home/user",
} as const;

export const getFreelancerDetailsRoute = (id: string): Href =>
  `${ROUTES.FREELANCER_HOME}/${id}`;
