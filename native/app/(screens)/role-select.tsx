import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
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
import { useAuthStore } from "@/store";
import { USER_ROLE } from "@/types";
import { useEffect } from "react";

export default function RoleSelectScreen() {
  const router = useRouter();

  const { setUserRole, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(isAuthenticated ? ROUTES.HOME : ROUTES.SELECT_ROLE);
    }
  }, [isAuthenticated]);

  const handleSelectRole = (role: USER_ROLE) => {
    setUserRole(role);
    router.push(ROUTES.LOGIN);
  };

  const colourScheme = useColorScheme();
  return (
    <SafeAreaView className="flex-1 bg-primary-50 dark:bg-primary-950">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="items-center pt-8 pb-10 mt-24">
          <Animated.View
            entering={FadeIn}
            className="w-14 h-14 rounded-2xl bg-primary-950 dark:bg-primary-50 items-center justify-center mb-4"
          >
            <Briefcase
              size={32}
              color={colourScheme === "dark" ? "#000" : "#fff"}
              className="bg-primary-50 dark:bg-primary-950"
            />
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(100)}
            className="text-2xl font-bold text-slate-900 dark:text-primary-50 mb-2"
          >
            Welcome to RozgaarPro
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(200)}
            className="text-sm text-slate-500 dark:text-primary-300 text-center"
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
              onPress={() => handleSelectRole(USER_ROLE.USER)}
              className="flex-row gap-4 p-6 bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800 rounded-3xl"
            >
              <View className="w-14 h-14 rounded-2xl bg-primary-950 dark:bg-primary-50 items-center justify-center">
                <Search size={28} color={colourScheme === "dark" ? "#000" : "#fff"} />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-slate-900 dark:text-primary-50 mb-1">
                  I am a user
                </Text>
                <Text className="text-sm text-slate-500 dark:text-primary-300 leading-5">
                  Find and hire skilled professionals for your home or business
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Freelancer */}
          <Animated.View entering={FadeInRight.delay(400)}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleSelectRole(USER_ROLE.FREELANCER)}
              className="flex-row gap-4 p-6 bg-white dark:bg-primary-900 border border-gray-200 dark:border-primary-800 rounded-3xl"
            >
              <View className="w-14 h-14 rounded-2xl bg-primary-950 dark:bg-primary-50 items-center justify-center">
                <Wrench size={28} color={colourScheme === "dark" ? "#000" : "#fff"} />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-slate-900 dark:text-primary-50 mb-1">
                  I am a freelancer
                </Text>
                <Text className="text-sm text-slate-500 dark:text-primary-300 leading-5">
                  Get discovered by customers and find work nearby
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.Text
          entering={FadeIn.delay(600)}
          className="text-center text-xs text-slate-500 dark:text-primary-400 py-6"
        >
          By continuing, you agree to our{" "}
          <Text className="text-primary font-medium">Terms of Service</Text>
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
}
