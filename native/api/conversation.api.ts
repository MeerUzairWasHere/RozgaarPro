import { api } from "@/lib";
import { ListQuery, PaginatedResponse } from "@/types";
import {
  Conversation,
  Message,
  StartConversationResult,
} from "@/types/conversation.types";

export const conversationApiClient = {
  getConversations: async (
    query: ListQuery,
  ): Promise<PaginatedResponse<Conversation>> => {
    const { data } = await api.post<PaginatedResponse<Conversation>>(
      "/conversations",
      query,
    );
    return data;
  },

  getConversationByFreelancer: async (
    freelancerId: string,
  ): Promise<Conversation | null> => {
    try {
      const { data } = await api.get<Conversation>(
        `/conversations/by-freelancer/${freelancerId}`,
      );
      return data;
    } catch (err: unknown) {
      if (err && typeof err === "object" && "response" in err) {
        const axErr = err as { response?: { status?: number } };
        if (axErr.response?.status === 404) return null;
      }
      throw err;
    }
  },

  startConversation: async (
    freelancerId: string,
    text: string,
  ): Promise<StartConversationResult> => {
    const { data } = await api.post<StartConversationResult>(
      "/conversations/start",
      { freelancerId, text },
    );
    return data;
  },

  getMessages: async (
    conversationId: string,
    params?: { since?: string; limit?: number },
  ): Promise<Message[]> => {
    const { data } = await api.get<Message[]>(
      `/conversations/${conversationId}/messages`,
      { params },
    );
    return data;
  },

  sendMessage: async (
    conversationId: string,
    text: string,
  ): Promise<Message> => {
    const { data } = await api.post<Message>(
      `/conversations/${conversationId}/messages`,
      { text },
    );
    return data;
  },
};
