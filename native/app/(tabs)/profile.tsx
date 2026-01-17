import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfileScreen() {
  return (
    <SafeAreaView className="bg-primary dark:bg-primary-950">
      <View className="flex justify-center items-center h-screen">
        <Text className="primary-text">This is Profile Screen</Text>
      </View>
    </SafeAreaView>
  );
}
