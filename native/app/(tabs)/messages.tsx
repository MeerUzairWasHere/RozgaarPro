import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessagesScreen() {
  return (
    <SafeAreaView className="bg-primary dark:bg-primary-950">
      <View className="flex justify-center items-center h-screen">
        <Text className="primary-text">This is Messages Screen</Text>
      </View>
    </SafeAreaView>
  );
}
