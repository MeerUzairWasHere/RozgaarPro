import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { RelativePathString, router } from "expo-router";
import { useGetConversations } from "@/mutations";
import { usePullToRefresh } from "@/hooks";
import { extractInfiniteList } from "@/utils";
import { QUERY_KEYS } from "@/constants";
import { getConversationRoute } from "@/constants/routes.constants";
import { Conversation } from "@/types/conversation.types";
import InitialAvatar from "@/components/common/InitialAvatar";
import { EmptyState, FreelancerListSkeleton } from "@/components";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

function formatConversationTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

function ConversationRow({ item }: { item: Conversation }) {
  const preview = item.lastMessage?.body?.slice(0, 50) ?? "";
  const previewText =
    preview.length < (item.lastMessage?.body?.length ?? 0)
      ? `${preview}…`
      : preview;
  return (
    <TouchableOpacity
      className="flex-row items-center gap-3 bg-white dark:bg-primary-900 rounded-xl p-4 border border-primary-100 dark:border-primary-800 mb-2"
      onPress={() =>
        router.push({
          pathname: getConversationRoute(item.id) as RelativePathString,
          params: { otherPartyName: item.otherParty.name },
        })
      }
      activeOpacity={0.7}
    >
      {item.profile_image_url !== null ? (
        <Image
          source={{ uri: item.profile_image_url }}
          alt={item.otherParty.name}
          className="w-14 h-14 rounded-md bg-brand/40 dark:bg-brand/40"
        />
      ) : (
        <InitialAvatar
          name={item.otherParty.name}
          size={48}
          className="rounded-md  bg-brand/40 dark:bg-brand/40 items-center justify-center"
        />
      )}

      <View className="flex-1 min-w-0">
        <View className="flex-row justify-between items-center gap-2">
          <Text
            className="text-base font-semibold text-primary-950 dark:text-primary-50"
            numberOfLines={1}
          >
            {item.otherParty.name}
          </Text>
          <Text className="text-xs text-primary-500 dark:text-primary-400 flex-shrink-0">
            {formatConversationTime(item.updatedAt)}
          </Text>
        </View>
        {item.lastMessage && (
          <Text
            className="text-sm text-primary-600 dark:text-primary-400 mt-0.5"
            numberOfLines={1}
          >
            {previewText}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

export default function MessagesScreen() {
  const { t } = useTranslation();
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetConversations({});
  const { items: conversations } = extractInfiniteList(data);
  const { refreshing, onRefresh } = usePullToRefresh({
    queryKey: QUERY_KEYS.CONVERSATIONS.listQuery({}),
  });
  const tabBarHeight = useBottomTabBarHeight();
  return (
    <View className="flex-1 bg-primary-50 dark:bg-primary-950">
      {isLoading ? (
        <FreelancerListSkeleton />
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ConversationRow item={item} />}
          contentContainerStyle={{
            padding: 16,
            paddingBottom: 20 + tabBarHeight,
            flexGrow: 1,
          }}
          onEndReached={() => {
            if (hasNextPage) fetchNextPage();
          }}
          onEndReachedThreshold={0.4}
          ListFooterComponent={
            isFetchingNextPage ? (
              <ActivityIndicator style={{ marginVertical: 16 }} />
            ) : null
          }
          ListEmptyComponent={
            !isLoading ? (
              <EmptyState
                title={t("no_conversations")}
                message={t("your_conversations")}
              />
            ) : null
          }
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
    </View>
  );
}
