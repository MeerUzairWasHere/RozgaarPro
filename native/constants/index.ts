import { EXPERIENCE_LEVEL } from "@/types";

export const ROUTES = {
  ONBOARDING: "/onboarding",
  FREELANCER_ONBOARDING: "/freelancer-onboarding",
  SELECT_ROLE: "/select-role",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  FORGOT_PASSWORD: "/forgot-password",
  OTP_VERIFICATION: "/otp-verification",
  HOME: "/home",
  JOBS: "/jobs",
  MESSAGES: "/messages",
  PROFILE: "/profile",
} as const;

export const experienceLevels = [
  { title: "Less than 1 year", value: EXPERIENCE_LEVEL.LESS_THAN_ONE_YEAR },
  { title: "1-3 years", value: EXPERIENCE_LEVEL.ONE_TO_THREE_YEARS },
  { title: "3-5 years", value: EXPERIENCE_LEVEL.THREE_TO_FIVE_YEARS },
  { title: "5-10 years", value: EXPERIENCE_LEVEL.FIVE_TO_TEN_YEARS },
  { title: "More than 10 years", value: EXPERIENCE_LEVEL.MORE_THAN_TEN_YEARS },
];

export const QUERY_KEYS = {
  SKILLS: {
    all: ["skills"] as const,
    lists: () => [...QUERY_KEYS.SKILLS.all, "list"] as const,
    list: (filters?: Record<string, any>) =>
      [...QUERY_KEYS.SKILLS.lists(), filters] as const,
    details: () => [...QUERY_KEYS.SKILLS.all, "detail"] as const,
    detail: (id: string) => [...QUERY_KEYS.SKILLS.details(), id] as const,
  },
} as const;
