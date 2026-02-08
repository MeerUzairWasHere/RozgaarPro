import React from "react";
import { View, Text } from "react-native";
import { Briefcase } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { InitialAvatar, BackButton } from "@/components";

type Props = {
  name: string;
  profession: string;
};

export default function ProfileHeader({ name, profession }: Props) {
  return (
    <View className="relative my-4">
      <View>
        <BackButton />

        <Animated.View
          entering={FadeInDown.delay(100)}
          className="items-center"
        >
          <View className="w-28 h-28 dark:bg-primary-800 rounded-full items-center justify-center mb-4 shadow-xl border-4 border-white dark:border-primary-700">
            <Text className="text-5xl font-bold text-primary-600 dark:text-primary-300">
              <InitialAvatar
                name={name}
                className="justify-center items-center"
              />
            </Text>
          </View>

          <Text className="text-3xl font-bold dark:text-white mb-4 text-center">
            {name}
          </Text>

          <View className="flex-row  items-center gap-2 px-5 py-2.5 bg-black dark:bg-white/10 rounded-full border border-white/30">
            <Briefcase size={16} color="#fff" strokeWidth={2.5} />
            <Text className="font-semibold text-white">{profession}</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
