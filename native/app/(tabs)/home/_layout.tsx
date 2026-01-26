import { Slot } from "expo-router";
import { ScrollView } from "react-native";

export default function HomeLayout() {
  return (
    <ScrollView className="dark:bg-black">
      <Slot />
    </ScrollView>
  );
}
