import { MessageCircle, Phone } from "lucide-react-native";
import React from "react";
import { View, TouchableOpacity, Linking } from "react-native";
import { AppText as Text } from "@/components";
import { useTranslation } from "react-i18next";
import { router } from "expo-router";
import { getStartConversationRoute } from "@/constants";

type Props = {
  freelancerId: string;
  phone: string;
};

export default function ActionButtons({ freelancerId, phone }: Props) {
  const { t } = useTranslation();
  const handleCall = () => {
    if (!phone) return;
    Linking.openURL(`tel:${phone}`);
  };
  const handleMessage = () => {
    router.push(getStartConversationRoute(freelancerId));
  };

  return (
    <View className="flex-row gap-3">
      <TouchableOpacity
        onPress={handleMessage}
        className="flex-1 bg-brand-600 dark:bg-brand-500 rounded-2xl py-4 items-center shadow-lg"
      >
        <View className="flex-row items-center gap-2">
          <MessageCircle size={16} color="#fff" strokeWidth={2.5} />
          <Text className="text-white font-bold text-base">{t("message")}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCall}
        className="flex-1 bg-brand-600 dark:bg-brand-500 rounded-2xl py-4 items-center shadow-lg"
      >
        <View className="flex-row items-center gap-2">
          <Phone size={16} color="#fff" strokeWidth={2.5} />
          <Text className="text-white font-bold text-base">{t("call")}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
