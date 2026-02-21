import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
  UseMutationResult,
  useQuery,
  UseQueryResult,
} from "@tanstack/react-query";
import { conversationApiClient } from "@/api";
import { QUERY_KEYS } from "@/constants";
import { ListQuery } from "@/types";
import {
  Conversation,
  Message,
  StartConversationResult,
} from "@/types/conversation.types";

const CONVERSATIONS_POLL_INTERVAL_MS = 8000;
const MESSAGES_POLL_INTERVAL_MS = 5000;

export const useGetConversations = (query: ListQuery = {}) => {
  return useInfiniteQuery({
    queryKey: QUERY_KEYS.CONVERSATIONS.listQuery(query),
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      conversationApiClient.getConversations({
        ...query,
        pagination: {
          page: pageParam,
          pageSize: query.pagination?.pageSize ?? 20,
        },
      }),
    getNextPageParam: (lastPage) => {
      if (lastPage.meta.hasNext) {
        return lastPage.meta.page + 1;
      }
      return undefined;
    },
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
      queryClient.invalidateQueries({
        predicate: (q) =>
          q.queryKey[0] === QUERY_KEYS.CONVERSATIONS.all[0],
      });
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
      queryClient.invalidateQueries({
        predicate: (q) =>
          q.queryKey[0] === QUERY_KEYS.CONVERSATIONS.all[0],
      });
    },
  });
};
