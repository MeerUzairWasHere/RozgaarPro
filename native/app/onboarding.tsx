import { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronRight,
  Search,
  ShieldCheck,
  Briefcase,
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";

const slides = [
  {
    icon: Search,
    title: "Find Skilled Workers",
    description:
      "Search and connect with trusted local professionals — plumbers, electricians, carpenters, and more.",
    color: "bg-primary",
  },
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description:
      "Every worker is phone-verified. Hire with confidence knowing you're getting quality help.",
    color: "bg-success",
  },
  {
    icon: Briefcase,
    title: "Work Opportunities",
    description:
      "Workers: Get discovered by customers in your area. No middlemen, direct connections.",
    color: "bg-accent",
  },
];

export default function OnboardingScreen() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      router.replace("/(auth)/login");
    }
  };

  const handleSkip = () => {
    router.replace("/(auth)/login");
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <View className="flex-1 bg-background">
      {/* Skip */}
      <View className="items-end p-4">
        <TouchableOpacity onPress={handleSkip}>
          <Text className="text-muted-foreground text-sm font-medium">
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="flex-1 items-center justify-center px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
            className="items-center"
          >
            <View
              className={`w-28 h-28 ${slide.color} rounded-full items-center justify-center mb-10`}
            >
              <Icon size={56} color="white" />
            </View>

            <Text className="text-2xl font-bold text-center mb-4">
              {slide.title}
            </Text>

            <Text className="text-muted-foreground text-center leading-relaxed max-w-xs">
              {slide.description}
            </Text>
          </motion.div>
        </AnimatePresence>
      </View>

      {/* Footer */}
      <View className="p-8 space-y-6">
        {/* Dots */}
        <View className="flex-row justify-center gap-2 mb-6">
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentSlide(index)}
              className={`h-2 rounded-full ${
                index === currentSlide
                  ? "w-8 bg-primary"
                  : "w-2 bg-muted-foreground/30"
              }`}
            />
          ))}
        </View>

        {/* Action Button */}
        <Button
          onPress={handleNext}
          className="h-14 rounded-2xl flex-row items-center justify-center gap-2"
        >
          <Text className="text-base font-semibold text-primary-foreground">
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
          <ChevronRight size={20} color="white" />
        </Button>
      </View>
    </View>
  );
}
