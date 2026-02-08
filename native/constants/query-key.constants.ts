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
    DetailByLocation: (freelancerId: string, lat: number, lng: number) =>
      [...QUERY_KEYS.FREELANCERS.detail(freelancerId), lat, lng] as const,
  },
  LOCATIONS: {
    all: ["locations"] as const,
    lists: () => [...QUERY_KEYS.LOCATIONS.all, "list"] as const,
    listByLocation: (lat: number, lng: number) =>
      [...QUERY_KEYS.LOCATIONS.lists(), lat, lng] as const,
  },
} as const;
