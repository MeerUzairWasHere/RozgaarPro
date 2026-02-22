import { View, TouchableOpacity } from "react-native";
import { AppText as Text } from "@/components";
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
import { useTranslation } from "react-i18next";

export default function RoleSelectScreen() {
  const { t } = useTranslation();
  const router = useRouter();

  const { setUserRole, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(isAuthenticated ? ROUTES.HOME : ROUTES.SELECT_ROLE);
    }
  }, [isAuthenticated]);

  const handleSelectRole = (role: USER_ROLE) => {
    setUserRole(role);
    router.push(ROUTES.SIGN_IN);
  };

  return (
    <SafeAreaView className="flex-1 bg-primary-50 dark:bg-primary-950">
      <View className="flex-1 px-6">
        {/* Header */}
        <View className="items-center pt-8 pb-10 mt-24">
          <Animated.View
            entering={FadeIn}
            className="w-14 h-14 rounded-2xl bg-brand dark:bg-brand-500 items-center justify-center mb-4 shadow-card-lg"
          >
            <Briefcase
              size={32}
              color="#FFFFFF"
            />
          </Animated.View>

          <Animated.Text
            entering={FadeInDown.delay(100)}
            className="text-2xl font-bold text-primary-900 dark:text-primary-50 mb-2"
          >
            {t("welcome_rozgaarpro")}
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.delay(200)}
            className="text-sm text-primary-600 dark:text-primary-400 text-center"
          >
            {t("how_use_app")}
          </Animated.Text>
        </View>

        {/* Role Cards */}
        <View className="flex-1 space-y-4 flex gap-4">
          {/* Customer */}
          <Animated.View entering={FadeInLeft.delay(300)}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleSelectRole(USER_ROLE.USER)}
              className="flex-row gap-4 p-6 bg-white dark:bg-primary-900 border border-primary-200 dark:border-primary-800 rounded-3xl shadow-card"
            >
              <View className="w-14 h-14 rounded-2xl bg-brand dark:bg-brand-500 items-center justify-center">
                <Search
                  size={28}
                  color="#FFFFFF"
                />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-1">
                  {t("i_am_user")}
                </Text>
                <Text className="text-sm text-primary-600 dark:text-primary-400 leading-5">
                  {t("i_am_user_desc")}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>

          {/* Freelancer */}
          <Animated.View entering={FadeInRight.delay(400)}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => handleSelectRole(USER_ROLE.FREELANCER)}
              className="flex-row gap-4 p-6 bg-white dark:bg-primary-900 border border-primary-200 dark:border-primary-800 rounded-3xl shadow-card"
            >
              <View className="w-14 h-14 rounded-2xl bg-brand dark:bg-brand-500 items-center justify-center">
                <Wrench
                  size={28}
                  color="#FFFFFF"
                />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-semibold text-primary-900 dark:text-primary-50 mb-1">
                  {t("i_am_freelancer")}
                </Text>
                <Text className="text-sm text-primary-600 dark:text-primary-400 leading-5">
                  {t("i_am_freelancer_desc")}
                </Text>
              </View>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Footer */}
        <Animated.Text
          entering={FadeIn.delay(600)}
          className="text-center text-xs primary-text py-6"
        >
          {t("terms_of_service")}
        </Animated.Text>
      </View>
    </SafeAreaView>
  );
}
