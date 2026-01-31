import { Slot } from "expo-router";
import { View } from "react-native";

export default function HomeLayout() {
  return (
    <View className="flex-1 dark:bg-black">
      <Slot />
    </View>
  );
}
