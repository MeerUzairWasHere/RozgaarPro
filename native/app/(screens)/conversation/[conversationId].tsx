import { useState, useRef, useEffect } from "react";
import {
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { AppText as Text } from "@/components";
import { useLocalSearchParams } from "expo-router";
import { AppHeader } from "@/components";
import { useGetMessages, useSendMessage } from "@/mutations";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils";
import { Message } from "@/types/conversation.types";
import { useAuthStore } from "@/store";
import { USER_ROLE } from "@/types";

function MessageBubble({ message }: { message: Message }) {
  const isSelf = message.isFromSelf;
  return (
    <View
      className={cn(
        "max-w-[80%] rounded-2xl px-4 py-2.5 mb-2",
        isSelf
          ? "bg-brand-600 dark:bg-brand-500 self-end"
          : "bg-primary-200 dark:bg-primary-800 self-start",
      )}
    >
      <Text
        className={cn(
          "text-base",
          isSelf ? "text-white" : "text-primary-950 dark:text-primary-50",
        )}
      >
        {message.body}
      </Text>
    </View>
  );
}

export default function ConversationThreadScreen() {
  const { t } = useTranslation();
  const { conversationId, otherPartyName } = useLocalSearchParams<{
    conversationId: string;
    otherPartyName?: string;
  }>();
  const [text, setText] = useState("");
  const flatListRef = useRef<FlatList>(null);
  const user = useAuthStore((s) => s.user);
  const { data: messages = [], isLoading } = useGetMessages(conversationId);
  const sendMessage = useSendMessage(conversationId ?? "");

  const canSend = (() => {
    if (!messages.length) return true;
    const last = messages[messages.length - 1];
    if (messages.length === 1) return last.isFromSelf ? false : true;
    return true;
  })();
  const userWaitingForReply =
    messages.length === 1 &&
    messages[0]?.isFromSelf &&
    user?.role === USER_ROLE.USER;

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(
        () => flatListRef.current?.scrollToEnd({ animated: true }),
        100,
      );
    }
  }, [messages.length]);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed || sendMessage.isPending || !canSend) return;
    sendMessage.mutate(trimmed, {
      onSuccess: () => {
        setText("");
      },
    });
  };

  if (!conversationId) return null;

  return (
    <>
      <AppHeader showBack title={otherPartyName ?? t("conversation")} />
      <KeyboardAvoidingView
        className="flex-1 bg-primary-50 dark:bg-primary-950"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {isLoading ? (
          <View className="flex-1 items-center justify-center">
            <Text className="text-primary-600 dark:text-primary-400">
              {t("loading")}…
            </Text>
          </View>
        ) : (
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <MessageBubble message={item} />}
            contentContainerStyle={{
              padding: 16,
              paddingBottom: 8,
              flexGrow: 1,
            }}
            ListEmptyComponent={
              <View className="flex-1 justify-center py-8">
                <Text className="text-center text-primary-500 dark:text-primary-400">
                  {t("no_messages_yet")}
                </Text>
              </View>
            }
          />
        )}

        {userWaitingForReply && (
          <View className="px-4 pb-2">
            <Text className="text-sm text-primary-500 dark:text-primary-400 text-center">
              {t("wait_for_freelancer_reply")}
            </Text>
          </View>
        )}

        <View className="flex-row items-end gap-2 px-4 pb-6 pt-2 border-t border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900">
          <TextInput
            className="flex-1 min-h-[44] max-h-24 rounded-2xl border border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-primary-800 px-4 py-2.5 text-primary-950 dark:text-primary-50"
            placeholder={t("type_a_message")}
            placeholderTextColor="#9ca3af"
            value={text}
            onChangeText={setText}
            multiline
            editable={canSend}
          />
          <TouchableOpacity
            className={cn(
              "rounded-2xl px-5 py-3 items-center justify-center min-h-[44]",
              canSend && text.trim()
                ? "bg-brand-600 dark:bg-brand-500"
                : "bg-primary-200 dark:bg-primary-700",
            )}
            onPress={handleSend}
            disabled={!text.trim() || sendMessage.isPending || !canSend}
          >
            <Text
              className={cn(
                "font-semibold",
                canSend && text.trim()
                  ? "text-white"
                  : "text-primary-500 dark:text-primary-400",
              )}
            >
              {t("send")}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}
