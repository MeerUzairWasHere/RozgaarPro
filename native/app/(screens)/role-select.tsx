import { View, Text, TouchableOpacity } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInLeft,
  FadeInRight,
} from "react-native-reanimated";
import { Search, Wrench, Briefcase } from "lucide-react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";

export default function RoleSelectScreen() {
  const router = useRouter();

  const handleSelectRole = (role: "customer" | "worker") => {
    router.push(ROUTES.LOGIN);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="items-center pt-8 pb-10 mt-24">
          <Animated.View
            entering={FadeIn}
            className="w-16 h-16 rounded-2xl bg-blue-600 items-center justify-center mb-4"
          >
            <Briefcase size={32} color="#fff" />
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(100)}
            className="text-2xl font-bold text-slate-900 mb-2"
          >
            Welcome to RozgaarPro
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(200)}
            className="text-sm text-slate-500 text-center"
          >
            How would you like to use the app?
          </Animated.Text>
        </View>

        {/* Role Cards */}
        <View className="flex-1 space-y-4 flex gap-4">
          {/* Customer */}
          <Animated.View entering={FadeInLeft.delay(300)}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleSelectRole("customer")}
              className="flex-row gap-4 p-6 bg-white border border-gray-200 rounded-3xl"
            >
              <View className="w-14 h-14 rounded-2xl bg-blue-100 items-center justify-center">
                <Search size={28} color="#2563eb" />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-slate-900 mb-1">
                  I need a worker
                </Text>
                <Text className="text-sm text-slate-500 leading-5">
                  Find and hire skilled professionals for your home or business
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Worker */}
          <Animated.View entering={FadeInRight.delay(400)}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleSelectRole("worker")}
              className="flex-row gap-4 p-6 bg-white border border-gray-200 rounded-3xl"
            >
              <View className="w-14 h-14 rounded-2xl bg-violet-100 items-center justify-center">
                <Wrench size={28} color="#9333ea" />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-slate-900 mb-1">
                  I am a worker
                </Text>
                <Text className="text-sm text-slate-500 leading-5">
                  Get discovered by customers and find work nearby
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.Text
          entering={FadeIn.delay(600)}
          className="text-center text-xs text-slate-500 py-6"
        >
          By continuing, you agree to our{" "}
          <Text className="text-blue-600 font-medium">Terms of Service</Text>
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
}
