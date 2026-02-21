import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {
  useLocalSearchParams,
  router,
  Href,
  RelativePathString,
} from "expo-router";
import { AppHeader } from "@/components";
import {
  useGetConversationByFreelancer,
  useStartConversation,
} from "@/mutations";
import { getConversationRoute } from "@/constants/routes.constants";
import { useTranslation } from "react-i18next";

export default function StartConversationScreen() {
  const { t } = useTranslation();
  const { freelancerId } = useLocalSearchParams<{ freelancerId: string }>();
  const [text, setText] = useState("");
  const { data: conversation, isLoading } =
    useGetConversationByFreelancer(freelancerId);
  const startConversation = useStartConversation();

  useEffect(() => {
    if (conversation) {
      const href: Href = {
        pathname: getConversationRoute(conversation.id) as RelativePathString,
        params: { otherPartyName: conversation.otherParty.name },
      };
      router.replace(href as Href);
    }
  }, [conversation]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || !freelancerId || startConversation.isPending) return;
    startConversation.mutate(
      { freelancerId, text: trimmed },
      {
        onSuccess: (result) => {
          router.replace(getConversationRoute(result.conversationId) as Href);
        },
      },
    );
  };

  if (!freelancerId) return null;

  if (isLoading) {
    return (
      <>
        <AppHeader showBack title={t("conversation")} />
        <View className="flex-1 bg-primary-50 dark:bg-primary-950 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  if (conversation) {
    return (
      <>
        <AppHeader showBack title={t("conversation")} />
        <View className="flex-1 bg-primary-50 dark:bg-primary-950 items-center justify-center">
          <ActivityIndicator size="large" />
        </View>
      </>
    );
  }

  return (
    <>
      <AppHeader showBack title={t("start_conversation")} />
      <View className="flex-1 bg-primary-50 dark:bg-primary-950 px-4 pt-6">
        <Text className="text-primary-600 dark:text-primary-400 mb-4">
          {t("send_first_message_to_start")}
        </Text>
        <TextInput
          className="min-h-[100] rounded-2xl border border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900 px-4 py-3 text-primary-950 dark:text-primary-50"
          placeholder={t("type_a_message")}
          placeholderTextColor="#9ca3af"
          value={text}
          onChangeText={setText}
          multiline
        />
        <TouchableOpacity
          className="mt-4 rounded-2xl bg-brand-600 dark:bg-brand-500 py-4 items-center"
          onPress={handleSend}
          disabled={!text.trim() || startConversation.isPending}
        >
          {startConversation.isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white font-semibold">{t("send")}</Text>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}
