import { useState } from "react";
import { View, Pressable, useColorScheme } from "react-native";
import { AppText as Text } from "@/components";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Search, ShieldCheck, Briefcase } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { ROUTES } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomTouchableOpacityButton } from "@/components";
import { cn } from "@/utils";
import { useTranslation } from "react-i18next";

const getSlides = (t: (key: string) => string) => [
  {
    icon: Search,
    titleKey: "find_skilled_freelancers" as const,
    descriptionKey: "find_freelancers_desc" as const,
  },
  {
    icon: ShieldCheck,
    titleKey: "verified_professionals" as const,
    descriptionKey: "verified_professionals_desc" as const,
  },
  {
    icon: Briefcase,
    titleKey: "work_opportunities" as const,
    descriptionKey: "work_opportunities_desc" as const,
  },
];

export default function OnboardingScreen() {
  const { t } = useTranslation();
  const slides = getSlides(t);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  const handleFinish = () => {
    completeOnboarding(true);
    router.replace(ROUTES.SELECT_ROLE);
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <SafeAreaView className="flex-1 bg-primary dark:bg-primary-950">
      {/* Top */}
      <View className="flex-row justify-end px-6 pt-2">
        <Pressable
          onPress={handleFinish}
          android_ripple={{
            color: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
          }}
          className="rounded-full px-4 py-2 overflow-hidden"
        >
          <Text className="text-primary-500 dark:text-primary-400 font-medium">
            {t("skip")}
          </Text>
        </Pressable>
      </View>

      {/* Center */}
      <View className="flex-1 justify-center items-center px-8">
        <Animated.View
          key={currentSlide}
          entering={FadeInRight}
          exiting={FadeOutLeft}
          className="items-center"
        >
          <View className="rounded-full items-center justify-center mb-10  ">
            <Icon size={56} color={isDark ? "#fff" : "#000"} />
          </View>

          <Text className="text-2xl font-bold text-primary-900 dark:text-primary-50 text-center mb-4">
            {t(slide.titleKey)}
          </Text>

          <Text className="text-base text-primary-600 dark:text-primary-200 text-center leading-6 max-w-[280px]">
            {t(slide.descriptionKey)}
          </Text>
        </Animated.View>
      </View>

      {/* Bottom */}
      <View className="px-8 pb-10">
        {/* Dots */}
        <View className="flex-row justify-center mb-6">
          {slides.map((_, index) => (
            <Pressable
              key={index}
              onPress={() => setCurrentSlide(index)}
              className={cn(
                "h-2 rounded-full mx-1",
                index === currentSlide
                  ? "w-8 bg-brand dark:bg-brand-400"
                  : "w-2 bg-primary-300 dark:bg-primary-700",
              )}
            />
          ))}
        </View>

        {/* Button */}
        <CustomTouchableOpacityButton
          onPress={() =>
            currentSlide === slides.length - 1
              ? handleFinish()
              : setCurrentSlide((p) => p + 1)
          }
          title={
            currentSlide === slides.length - 1 ? t("get_started") : t("next")
          }
        />
      </View>
    </SafeAreaView>
  );
}
