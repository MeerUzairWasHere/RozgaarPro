import { ListQuery } from "@/types";

export const QUERY_KEYS = {
  CURENT_USER: {
    all: ["current-user"] as const,
  },
  SKILLS: {
    all: ["skills"] as const,
    byId: (id: string) => [...QUERY_KEYS.SKILLS.all, id] as const,
    listQuery: (query: ListQuery) =>
      [...QUERY_KEYS.SKILLS.all, JSON.stringify(query)] as const,
  },
  PROFESSIONS: {
    all: ["professions"] as const,
    byId: (id: string) => [...QUERY_KEYS.PROFESSIONS.all, id] as const,
    listQuery: (query: ListQuery) =>
      [...QUERY_KEYS.PROFESSIONS.all, JSON.stringify(query)] as const,
  },
  FREELANCERS: {
    all: ["freelancers"] as const,
    byId: (id: string) => [...QUERY_KEYS.FREELANCERS.all, id] as const,
    listQuery: (query: ListQuery) =>
      [...QUERY_KEYS.FREELANCERS.all, JSON.stringify(query)] as const,
  },
  LOCATIONS: {
    all: ["locations"] as const,
    lists: () => [...QUERY_KEYS.LOCATIONS.all, "list"] as const,
    listQuery: (query: ListQuery) =>
      [...QUERY_KEYS.LOCATIONS.all, JSON.stringify(query)] as const,
  },
  CONVERSATIONS: {
    all: ["conversations"] as const,
    byFreelancer: (freelancerId: string) =>
      [...QUERY_KEYS.CONVERSATIONS.all, "byFreelancer", freelancerId] as const,
    messages: (conversationId: string) =>
      [...QUERY_KEYS.CONVERSATIONS.all, "messages", conversationId] as const,
  },
} as const;
