import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function MessagesScreen() {
  return (
    <SafeAreaView className="dark:bg-black h-screen">
      <View className="flex justify-center items-center ">
        <Text className="primary-text">This is Messages Screen</Text>
      </View>
    </SafeAreaView>
  );
}
