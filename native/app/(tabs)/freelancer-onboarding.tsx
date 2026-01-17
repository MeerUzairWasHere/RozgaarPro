import CustomTouchableOpacityButton from "@/components/CustomTouchableOpacityButton";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { Camera, MapPin, Clock } from "lucide-react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { Toast } from "toastify-react-native";
import { useGetSkills } from "@/hooks/useSkillsMutation";
import { EXPERIENCE_LEVEL } from "@/types";
import { experienceLevels } from "@/constants";

export default function CompleteProfile() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    skills: [] as string[],
    experience: EXPERIENCE_LEVEL.ONE_TO_THREE_YEARS,
    idDocument: null,
  });

  const { data: skills } = useGetSkills();

  const handleSkillToggle = (skillId: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skillId)
        ? prev.skills.filter((s) => s !== skillId)
        : [...prev.skills, skillId],
    }));
  };

  const handleNext = async () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      setLoading(true);
      try {
        // Update profile via API/Store
        // await updateUser({
        //   skills: formData.skills,
        //   experience: formData.experience,
        //   profileCompleted: true,
        // });

        Toast.success("Profile completed successfully!");

        // Navigation will happen automatically via _layout.tsx
        // No need to manually navigate
      } catch (error) {
        console.error("Profile completion error:", error);
        Toast.error("Failed to complete profile");
      } finally {
        setLoading(false);
      }
    }
  };

  const isNextDisabled =
    (step === 1 && formData.skills.length === 0) ||
    (step === 2 && !formData.experience);

  return (
    <View className="flex-1 bg-white dark:bg-primary-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="p-4 pt-16">
          <Text className="text-2xl font-bold text-primary-900 dark:text-primary-50">
            Complete Your Profile
          </Text>
          <Text className="text-sm text-primary-600 dark:text-primary-400 mt-1">
            Let's set up your freelancer profile
          </Text>
        </View>
        {/* Progress */}
        <View className="px-4 py-4">
          <View className="flex-row gap-2">
            {[1, 2, 3].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => {
                  // Only allow going back to previous steps, not forward
                  if (s < step) {
                    setStep(s);
                  }
                }}
                activeOpacity={0.7}
                disabled={s > step} // Disable future steps
                className="flex-1"
              >
                <View
                  className={`h-2 rounded-full ${
                    s <= step
                      ? "bg-primary-900 dark:bg-primary-50"
                      : "bg-primary-200 dark:bg-primary-800"
                  }`}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text className="text-sm text-primary-600 dark:text-primary-400 mt-2">
            Step {step} of 3
          </Text>
        </View>

        <View className="px-4 pb-32">
          {/* Step 1: Skills */}
          {step === 1 && (
            <Animated.View entering={FadeInRight}>
              <Text className="text-xl font-bold text-primary-900 dark:text-primary-50 mb-2">
                What skills do you have?
              </Text>
              <Text className="text-primary-600 dark:text-primary-400 mb-6">
                Select all the skills you can offer
              </Text>

              <View className="flex-row flex-wrap gap-3">
                {skills?.map((category) => {
                  const isSelected = formData.skills.includes(category.id);
                  return (
                    <TouchableOpacity
                      key={category.id}
                      onPress={() => handleSkillToggle(category.id)}
                      className={`w-[48%] p-4 rounded-2xl border-2 ${
                        isSelected
                          ? "border-primary-900 dark:border-primary-50 bg-primary-100 dark:bg-primary-800"
                          : "border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900"
                      }`}
                      activeOpacity={0.7}
                    >
                      <View className="flex-row items-center justify-between ">
                        <Text className="font-medium text-primary-900 dark:text-primary-50">
                          {category.name}
                        </Text>
                        {isSelected && (
                          <View className="w-4 h-4 bg-primary-900 dark:bg-primary-50 rounded-full items-center justify-center">
                            <Text className="text-white dark:text-primary-900 text-xs font-bold ">
                              ✓
                            </Text>
                          </View>
                        )}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          )}

          {/* Step 2: Experience */}
          {step === 2 && (
            <Animated.View entering={FadeInRight}>
              <Text className="text-xl font-bold text-primary-900 dark:text-primary-50 mb-2">
                Your experience
              </Text>
              <Text className="text-primary-600 dark:text-primary-400 mb-6">
                Tell us about your work experience
              </Text>

              <View className="gap-3">
                {experienceLevels.map((exp) => {
                  const isSelected = formData.experience === exp.value;
                  return (
                    <TouchableOpacity
                      key={exp.title}
                      onPress={() =>
                        setFormData({ ...formData, experience: exp.value })
                      }
                      className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${
                        isSelected
                          ? "border-primary-900 dark:border-primary-50 bg-primary-100 dark:bg-primary-800"
                          : "border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900"
                      }`}
                      activeOpacity={0.7}
                    >
                      <View className="flex-row items-center gap-3">
                        <Clock
                          size={20}
                          color={isSelected ? "#1A1A1A" : "#666666"}
                        />
                        <Text className="font-medium text-primary-900 dark:text-primary-50">
                          {exp.title}
                        </Text>
                      </View>
                      {isSelected && (
                        <View className="w-4 h-4 bg-primary-900 dark:bg-primary-50 rounded-full items-center justify-center">
                          <Text className="text-white dark:text-primary-900 text-xs font-bold ">
                            ✓
                          </Text>
                        </View>
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>
            </Animated.View>
          )}

          {/* Step 3: Verification */}
          {step === 3 && (
            <Animated.View entering={FadeInRight}>
              <Text className="text-xl font-bold text-primary-900 dark:text-primary-50 mb-2">
                Verify your identity
              </Text>
              <Text className="text-primary-600 dark:text-primary-400 mb-6">
                Upload a photo ID to get verified
              </Text>

              <View className="gap-4">
                <TouchableOpacity
                  className="p-6 rounded-2xl border-2 border-dashed border-primary-300 dark:border-primary-700 bg-primary-50 dark:bg-primary-900 items-center"
                  activeOpacity={0.7}
                >
                  <View className="w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-full items-center justify-center mb-3">
                    <Camera size={28} color="#666666" />
                  </View>
                  <Text className="font-medium text-primary-900 dark:text-primary-50 mb-1">
                    Upload ID Photo
                  </Text>
                  <Text className="text-sm text-primary-600 dark:text-primary-400">
                    Aadhaar, PAN, or Voter ID
                  </Text>
                </TouchableOpacity>

                <View className="bg-green-50 dark:bg-green-900/30 rounded-2xl p-4 border border-green-200 dark:border-green-800">
                  <View className="flex-row gap-3">
                    <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mt-0.5">
                      <MapPin size={16} color="#FFFFFF" />
                    </View>
                    <View className="flex-1">
                      <Text className="font-medium text-primary-900 dark:text-primary-50 mb-1">
                        Location Access
                      </Text>
                      <Text className="text-sm text-primary-600 dark:text-primary-400">
                        Allow location access so customers can find you nearby
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </Animated.View>
          )}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View className="absolute bottom-0 left-0 right-0 bg-white dark:bg-primary-950 border-t border-primary-200 dark:border-primary-800 p-4">
        <CustomTouchableOpacityButton
          onPress={handleNext}
          disabled={isNextDisabled || loading}
          title={
            loading ? "Saving..." : step === 3 ? "Complete Profile" : "Continue"
          }
        />
      </View>
    </View>
  );
}
