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
  FREELANCER_HOME: "/(tabs)/home/freelancer",
  USER_HOME: "/(tabs)/home/user",
} as const;

export const QUERY_KEYS = {
  CURENT_USER: {
    all: ["current-user"] as const,
  },
  SKILLS: {
    all: ["skills"] as const,
    lists: () => [...QUERY_KEYS.SKILLS.all, "list"] as const,
    list: (filters?: Record<string, any>) =>
      [...QUERY_KEYS.SKILLS.lists(), filters] as const,
    details: () => [...QUERY_KEYS.SKILLS.all, "detail"] as const,
    detail: (id: string) => [...QUERY_KEYS.SKILLS.details(), id] as const,
  },
  PROFESSIONS: {
    all: ["professions"] as const,
    lists: () => [...QUERY_KEYS.PROFESSIONS.all, "list"] as const,
    list: (filters?: Record<string, any>) =>
      [...QUERY_KEYS.PROFESSIONS.lists(), filters] as const,
    details: () => [...QUERY_KEYS.PROFESSIONS.all, "detail"] as const,
    detail: (id: string) => [...QUERY_KEYS.PROFESSIONS.details(), id] as const,
    listByLocation: (lat: number, lng: number) =>
      [...QUERY_KEYS.PROFESSIONS.lists(), lat, lng] as const,
  },
  FREELANCERS: {
    all: ["freelancers"] as const,
    lists: () => [...QUERY_KEYS.FREELANCERS.all, "list"] as const,
    list: (filters?: Record<string, any>) =>
      [...QUERY_KEYS.FREELANCERS.lists(), filters] as const,
    details: () => [...QUERY_KEYS.FREELANCERS.all, "detail"] as const,
    detail: (id: string) => [...QUERY_KEYS.FREELANCERS.details(), id] as const,
    listByLocation: (lat: number, lng: number) =>
      [...QUERY_KEYS.FREELANCERS.lists(), lat, lng] as const,
  },
} as const;
