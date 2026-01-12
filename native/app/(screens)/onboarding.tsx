import { useState } from "react";
import { View, Text, Pressable, Platform } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Search, ShieldCheck, Briefcase } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { ROUTES } from "@/constants";
import { Button } from "@/components/Button";
import { SafeAreaView } from "react-native-safe-area-context";

const slides = [
  {
    icon: Search,
    title: "Find Skilled Workers",
    description:
      "Search and connect with trusted local professionals — plumbers, electricians, carpenters, and more.",
    color: "#2563eb",
  },
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description:
      "Every worker is phone-verified. Hire with confidence knowing you're getting quality help.",
    color: "#16a34a",
  },
  {
    icon: Briefcase,
    title: "Work Opportunities",
    description:
      "Workers: Get discovered by customers in your area. No middlemen, direct connections.",
    color: "#9333ea",
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();
  const completeOnboarding = useOnboardingStore((s) => s.completeOnboarding);

  const handleFinish = () => {
    completeOnboarding(true);
    router.replace(ROUTES.SELECT_ROLE);
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top */}
      <View className="flex-row justify-end px-6 pt-2">
        <Pressable
          onPress={handleFinish}
          android_ripple={{ color: "rgba(0,0,0,0.1)" }}
          className="rounded-full px-4 py-2 overflow-hidden"
        >
          <Text className="text-slate-500 font-medium">Skip</Text>
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
          <View
            style={{ backgroundColor: slide.color }}
            className="h-28 w-28 rounded-full items-center justify-center mb-10"
          >
            <Icon size={56} color="white" />
          </View>

          <Text className="text-2xl font-bold text-slate-900 text-center mb-4">
            {slide.title}
          </Text>

          <Text className="text-base text-slate-500 text-center leading-6 max-w-[280px]">
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
              className={`h-2 rounded-full mx-1 ${
                index === currentSlide ? "w-8 bg-blue-600" : "w-2 bg-slate-300"
              }`}
            />
          ))}
        </View>

        {/* Button */}
        <Button
          onPress={() =>
            currentSlide === slides.length - 1
              ? handleFinish()
              : setCurrentSlide((p) => p + 1)
          }
          android_ripple={{ color: "rgba(255,255,255,0.25)" }}
          className="h-14 rounded-2xl bg-blue-600 items-center justify-center overflow-hidden"
        >
          <Text className="text-white text-base font-semibold">
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  );
}
