import React from "react";
import { View, Text } from "react-native";
import { Briefcase } from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import BackButton from "../common/BackButton";
import InitialAvatar from "../common/InitialAvatar";

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
          <View className="w-28 h-28 bg-brand/10 dark:bg-brand-500/20 rounded-full items-center justify-center mb-4 shadow-xl border-4 border-white dark:border-primary-800">
            <Text className="text-5xl font-bold text-brand dark:text-brand-300">
              <InitialAvatar
                name={name}
                className="justify-center items-center"
              />
            </Text>
          </View>

          <Text className="text-3xl font-bold text-primary-950 dark:text-primary-50 mb-4 text-center">
            {name}
          </Text>

          <View className="flex-row items-center gap-2 px-5 py-2.5 bg-brand dark:bg-brand-500 rounded-full border border-brand/20 dark:border-brand-500/30 shadow-card">
            <Briefcase size={16} color="#fff" strokeWidth={2.5} />
            <Text className="font-semibold text-white">{profession}</Text>
          </View>
        </Animated.View>
      </View>
    </View>
  );
}
