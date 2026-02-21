import { Phone } from "lucide-react-native";
import React from "react";
import { View, Text, TouchableOpacity, Linking } from "react-native";
import { useTranslation } from "react-i18next";

type Props = {
  freelancerId: string;
  phone: string;
};

export default function ActionButtons({ phone }: Props) {
  const { t } = useTranslation();
  const handleCall = () => {
    if (!phone) return;
    Linking.openURL(`tel:${phone}`);
  };

  return (
    <View className="flex-row gap-3">
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
