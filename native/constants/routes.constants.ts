import { Href } from "expo-router";

export const ROUTES = {
  ONBOARDING: "/(onboarding)/onboarding",
  SELECT_ROLE: "/(onboarding)/select-role",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  OTP_VERIFICATION: "/otp-verification",
  HOME: "/home",
  MESSAGES: "/messages",
  PROFILE: "/profile",
  EDIT_PROFILE: "/(screens)/edit-profile",
  HELP_SUPPORT: "/(screens)/help-support",
  SETTINGS: "/(screens)/settings",
  FILTERED_FREELANCERS: "/(screens)/filtered-freelancers",
  FREELANCER_DETAILS: "/(screens)/freelancer-details",
  JOB_REQUEST: "/(screens)/job-request",
  FREELANCER_ONBOARDING: "/(screens)/complete-profile",
  ALL_VISIBLE_FREELANCERS: "/(tabs)/all-visible-freelancers",
  FREELANCER_HOME: "/(tabs)/home/freelancer",
  USER_HOME: "/(tabs)/home/user",
  CONVERSATION: "/(screens)/conversation",
  CONVERSATION_START: "/(screens)/conversation/start",
} as const;

export const getFreelancerDetailsRoute = (freelancerId: string): Href =>
  `${ROUTES.FREELANCER_DETAILS}/${freelancerId}`;

export const getConversationRoute = (conversationId: string): Href =>
  `${ROUTES.CONVERSATION}/${conversationId}` as Href;

export const getStartConversationRoute = (freelancerId: string): Href =>
  `${ROUTES.CONVERSATION_START}/${freelancerId}` as Href;
