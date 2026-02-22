import React from "react";
import { View, Image } from "react-native";
import { Text } from "react-native";
import { Briefcase } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import InitialAvatar from "../common/InitialAvatar";
import { AVAILABILITY_STATUS } from "@/types";
import AvailabilityStatus from "../common/AvailabilityStatus";

type Props = {
  name: string;
  profession: string;
  imageUrl: string | null;
  availability: AVAILABILITY_STATUS;
};

export default function ProfileHeader({
  name,
  profession,
  imageUrl,
  availability,
}: Props) {
  return (
    <View className="relative my-4">
      <View>
        <Animated.View
          entering={FadeInDown.delay(100)}
          className="items-center"
        >
          <View className="w-28 h-28 rounded-full overflow-hidden items-center justify-center mb-4 shadow-xl bg-brand/40 dark:bg-brand/40">
            {imageUrl ? (
              <Image
                source={{ uri: imageUrl }}
                alt={name}
                className="w-full h-full"
              />
            ) : (
              <InitialAvatar
                name={name}
                className="w-full h-full rounded-full items-center justify-center"
              />
            )}
          </View>

          <Text className="text-3xl font-bold text-primary-950 dark:text-primary-50 mb-2 text-center">
            {name}
          </Text>

          <View className="flex gap-2 flex-row">
            <View className="flex-row items-center gap-2 px-5 py-2.5 bg-brand dark:bg-brand-500 rounded-full border border-brand/20 dark:border-brand-500/30 shadow-card">
              <Briefcase size={16} color="#fff" strokeWidth={2.5} />
              <Text className="font-semibold text-white">{profession}</Text>
            </View>

            <AvailabilityStatus availability={availability} />
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
