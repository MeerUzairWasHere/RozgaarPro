import {
  useMutation,
  useQueryClient,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { conversationApiClient } from "@/api";
import { QUERY_KEYS } from "@/constants";
import {
  Conversation,
  Message,
  StartConversationResult,
} from "@/types/conversation.types";

const CONVERSATIONS_POLL_INTERVAL_MS = 8000;
const MESSAGES_POLL_INTERVAL_MS = 5000;

export const useGetConversations = (): UseQueryResult<Conversation[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.CONVERSATIONS.all,
    queryFn: () => conversationApiClient.getConversations(),
    refetchInterval: CONVERSATIONS_POLL_INTERVAL_MS,
  });
};

export const useGetConversationByFreelancer = (
  freelancerId: string | undefined,
): UseQueryResult<Conversation | null> => {
  return useQuery({
    queryKey: QUERY_KEYS.CONVERSATIONS.byFreelancer(freelancerId ?? ""),
    queryFn: () =>
      freelancerId
        ? conversationApiClient.getConversationByFreelancer(freelancerId)
        : Promise.resolve(null),
    enabled: !!freelancerId,
  });
};

export const useGetMessages = (
  conversationId: string | undefined,
  options?: { since?: string; limit?: number },
): UseQueryResult<Message[]> => {
  return useQuery({
    queryKey: QUERY_KEYS.CONVERSATIONS.messages(conversationId ?? ""),
    queryFn: () =>
      conversationId
        ? conversationApiClient.getMessages(conversationId, options)
        : Promise.resolve([]),
    enabled: !!conversationId,
    refetchInterval: MESSAGES_POLL_INTERVAL_MS,
  });
};

export const useStartConversation = (): UseMutationResult<
  StartConversationResult,
  Error,
  { freelancerId: string; text: string }
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ freelancerId, text }) =>
      conversationApiClient.startConversation(freelancerId, text),
    onSuccess: (_, { freelancerId }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONVERSATIONS.all });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CONVERSATIONS.byFreelancer(freelancerId),
      });
    },
  });
};

export const useSendMessage = (
  conversationId: string,
): UseMutationResult<Message, Error, string> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (text: string) =>
      conversationApiClient.sendMessage(conversationId, text),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.CONVERSATIONS.messages(conversationId),
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.CONVERSATIONS.all });
    },
  });
};
