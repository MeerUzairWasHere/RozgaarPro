import { useState } from "react";
import { View, Text, Pressable, useColorScheme } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Search, ShieldCheck, Briefcase } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { ROUTES } from "@/constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { CustomTouchableOpacityButton } from "@/components";
import { cn } from "@/utils";

const slides = [
  {
    icon: Search,
    title: "Find Skilled Workers",
    description:
      "Search and connect with trusted local professionals — plumbers, electricians, carpenters, and more.",
  },
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description:
      "Every worker is phone-verified. Hire with confidence knowing you're getting quality help.",
  },
  {
    icon: Briefcase,
    title: "Work Opportunities",
    description:
      "Workers: Get discovered by customers in your area. No middlemen, direct connections.",
  },
];

export default function OnboardingScreen() {
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
            Skip
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
            {slide.title}
          </Text>

          <Text className="text-base text-primary-600 dark:text-primary-200 text-center leading-6 max-w-[280px]">
            {slide.description}
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
          title={currentSlide === slides.length - 1 ? "Get Started" : "Next"}
        />
      </View>
    </SafeAreaView>
  );
}
