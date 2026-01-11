import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Search, ShieldCheck, Briefcase } from "lucide-react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { useOnboardingStore } from "@/store/useOnboardingStore";
import { ROUTES } from "@/constants";

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

  const completeOnboarding = useOnboardingStore(
    (state) => state.completeOnboarding
  );

  const handleFinish = () => {
    completeOnboarding();
    router.replace(ROUTES.LOGIN);
  };

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    handleFinish();
  };

  const slide = slides[currentSlide];
  const Icon = slide.icon;

  return (
    <View style={styles.container}>
      {/* Skip */}
      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.View
          key={currentSlide}
          entering={FadeInRight}
          exiting={FadeOutLeft}
          style={styles.center}
        >
          <View style={[styles.iconWrapper, { backgroundColor: slide.color }]}>
            <Icon size={56} color="white" />
          </View>

          <Text style={styles.title}>{slide.title}</Text>

          <Text style={styles.description}>{slide.description}</Text>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Dots */}
        <View style={styles.dots}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => setCurrentSlide(index)}
              style={[styles.dot, index === currentSlide && styles.activeDot]}
            />
          ))}
        </View>

        {/* Button */}
        <Button onPress={handleNext} style={styles.button}>
          <Text style={styles.buttonText}>
            {currentSlide === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  skipContainer: {
    alignItems: "flex-end",
    padding: 36,
    marginTop: 16,
  },
  skipText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },
  center: {
    alignItems: "center",
  },
  iconWrapper: {
    width: 112,
    height: 112,
    borderRadius: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 16,
    color: "#0f172a",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    color: "#64748b",
    lineHeight: 22,
    maxWidth: 280,
  },
  footer: {
    padding: 32,
  },
  dots: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 24,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#cbd5e1",
    marginHorizontal: 4,
  },
  activeDot: {
    width: 32,
    backgroundColor: "#2563eb",
  },
  button: {
    height: 56,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "center",
    gap: 8,
    backgroundColor: "#2563eb",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
});
