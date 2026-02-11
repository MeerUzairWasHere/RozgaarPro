import { router } from "expo-router";
import { CustomInput, CustomTouchableOpacityButton } from "@/components";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Camera, MapPin, Clock } from "lucide-react-native";
import { useColorScheme } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { ROUTES } from "@/constants";
import {
  useAuthStore,
  useCompleteProfileStore,
  useLocationStore,
} from "@/store";
import {
  useCompleteFreelancerProfile,
  useGetProfessions,
  useGetSkillsByProfession,
} from "@/mutations";
import { cn, getExperienceLabel } from "@/utils";

import { useEffect, useState } from "react";

export default function CompleteProfile() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const mutationCompleteProfile = useCompleteFreelancerProfile();
  const { setProfileCompleted } = useAuthStore();
  const {
    step,
    loading,
    formData,
    setStep,
    nextStep,
    setLoading,
    setExperience,
    resetProfile,
    setProfession,
    clearSkills,
    toggleSkill,
  } = useCompleteProfileStore();

  const [experienceText, setExperienceText] = useState("");

  useEffect(() => {
    if (step === 3) {
      setExperienceText(
        formData.experience !== null ? String(formData.experience) : "",
      );
    }
  }, [step]);

  const { coordinates, permissionGranted } = useLocationStore();
  const { data: skills, isLoading: isLoadingSkills } = useGetSkillsByProfession(
    formData.professionId!,
  );
  const { data: professions, isLoading: isLoadingProfessions } =
    useGetProfessions();

  const handleNext = async () => {
    if (step < 4) {
      nextStep();
      return;
    }
    setLoading(true);
    try {
      await mutationCompleteProfile.mutateAsync({
        professionId: formData.professionId!,
        skillIds: formData.skills,
        experience: formData.experience!,
        location: {
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          accuracy: coordinates.accuracy,
        },
      });

      setProfileCompleted(true);
      resetProfile();
      router.replace(ROUTES.HOME);
    } finally {
      setLoading(false);
    }
  };

  const isNextDisabled =
    (step === 1 && !formData.professionId) ||
    (step === 2 && formData.skills.length === 0) ||
    (step === 3 &&
      (formData.experience === null ||
        Number.isNaN(formData.experience) ||
        formData.experience <= 0)) ||
    (step === 4 && !permissionGranted);

  return (
    <View className="flex-1 bg-primary-50 dark:bg-primary-950">
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
            {[1, 2, 3, 4].map((s) => (
              <TouchableOpacity
                key={s}
                onPress={() => {
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
                      ? "bg-brand dark:bg-brand-400"
                      : "bg-primary-200 dark:bg-primary-800"
                  }`}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text className="text-sm text-primary-600 dark:text-primary-400 mt-2">
            Step {step} of 4
          </Text>
        </View>

        <View className="px-4 pb-32">
          {/* Step 1: Profession */}
          {step === 1 && (
            <Animated.View entering={FadeInRight}>
              <Text className="text-xl font-bold text-primary-900 dark:text-primary-50 mb-2">
                Choose your profession
              </Text>
              <Text className="text-primary-600 dark:text-primary-400 mb-6">
                Select your main profession
              </Text>

              {isLoadingProfessions ? (
                <View className="flex-row flex-wrap justify-between gap-y-3">
                  {[...Array(7)].map((_, i) => (
                    <View
                      key={i}
                      className="w-[48%] p-4 rounded-2xl border-2 border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="h-4 w-24 rounded-md bg-primary-200 dark:bg-primary-700 animate-pulse" />
                        <View className="w-4 h-4 rounded-full bg-primary-200 dark:bg-primary-700 animate-pulse" />
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View className="flex-row flex-wrap gap-3">
                  {professions?.map((profession) => {
                    const isSelected = formData.professionId === profession.id;

                    return (
                      <TouchableOpacity
                        key={profession.id}
                        onPress={() => {
                          setProfession(profession.id);
                          clearSkills(); // 🔥 reset skills if profession changes
                        }}
                        className={`w-[48%] p-4 rounded-2xl border-2 ${
                          isSelected
                            ? "border-brand dark:border-brand-400 bg-brand/10 dark:bg-brand-500/20"
                            : "border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900"
                        }`}
                        activeOpacity={0.7}
                      >
                        <View className="flex-row items-center justify-between ">
                          <Text className="font-medium text-primary-900 dark:text-primary-50">
                            {profession.name}
                          </Text>
                          {isSelected && (
                            <View className="w-4 h-4 bg-brand dark:bg-brand-400 rounded-full items-center justify-center">
                              <Text className="text-white text-xs font-bold">
                                ✓
                              </Text>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}
            </Animated.View>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <Animated.View entering={FadeInRight}>
              <Text className="text-xl font-bold text-primary-900 dark:text-primary-50 mb-2">
                Select up to 3 skills
              </Text>

              {isLoadingSkills ? (
                <View className="flex-row flex-wrap justify-between gap-y-3">
                  {[...Array(3)].map((_, i) => (
                    <View
                      key={i}
                      className="w-[48%] p-4 rounded-2xl border-2 border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900"
                    >
                      <View className="flex-row items-center justify-between">
                        <View className="h-4 w-24 rounded-md bg-primary-200 dark:bg-primary-700 animate-pulse" />
                        <View className="w-4 h-4 rounded-full bg-primary-200 dark:bg-primary-700 animate-pulse" />
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View className="flex-row flex-wrap gap-3">
                  {skills?.map((skill) => {
                    const isSelected = formData.skills.includes(skill.id);

                    return (
                      <TouchableOpacity
                        key={skill.id}
                        onPress={() => toggleSkill(skill.id)}
                        className={`w-[48%] p-4 rounded-2xl border-2 ${
                          isSelected
                            ? "border-brand dark:border-brand-400 bg-brand/10 dark:bg-brand-500/20"
                            : "border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900"
                        }`}
                        activeOpacity={0.7}
                      >
                        <View className="flex-row items-center justify-between ">
                          <Text className="font-medium text-primary-900 dark:text-primary-50">
                            {skill.name}
                          </Text>
                          {isSelected && (
                            <View className="w-4 h-4 bg-brand dark:bg-brand-400 rounded-full items-center justify-center">
                              <Text className="text-white text-xs font-bold">
                                ✓
                              </Text>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              <Text className="text-sm mt-2 text-primary-600 dark:text-primary-400">
                {formData.skills.length}/3 selected
              </Text>
            </Animated.View>
          )}

          {/* Step 3: Experience */}
          {step === 3 && (
            <Animated.View entering={FadeInRight}>
              <Text className="text-xl font-bold text-primary-900 dark:text-primary-50 mb-2">
                Your experience
              </Text>
              <Text className="text-primary-600 dark:text-primary-400 mb-6">
                Enter total experience in years (decimals allowed, e.g. 1.5)
              </Text>

              <CustomInput
                icon={<Clock size={15} color={isDark ? "#B3A5F5" : "#6B4EEA"} />}
                placeholder="e.g. 1.5"
                value={experienceText}
                keyboardType="decimal-pad"
                returnKeyType="done"
                submitBehavior="blurAndSubmit"
                onChangeText={(text) => {
                  // allow digits + dot
                  const sanitized = text.replace(/[^0-9.]/g, "");

                  // block multiple dots
                  if ((sanitized.match(/\./g)?.length ?? 0) > 1) return;

                  // update text ALWAYS
                  setExperienceText(sanitized);

                  // allow intermediate typing
                  if (
                    sanitized === "" ||
                    sanitized === "." ||
                    sanitized.endsWith(".")
                  ) {
                    setExperience(null);
                    return;
                  }

                  const numericValue = Number(sanitized);

                  if (!Number.isNaN(numericValue)) {
                    setExperience(numericValue);
                  }
                }}
              />

              {formData.experience !== null && formData.experience > 0 && (
                <Text className="mt-2 text-sm text-primary-600 dark:text-primary-400">
                  Experience: {getExperienceLabel(formData.experience)}
                </Text>
              )}
            </Animated.View>
          )}

          {/* Step 4: Verification */}
          {step === 4 && (
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
                  <View className="w-16 h-16 bg-brand/10 dark:bg-brand-500/20 rounded-full items-center justify-center mb-3">
                    <Camera size={28} color={isDark ? "#B3A5F5" : "#6B4EEA"} />
                  </View>
                  <Text className="font-medium text-primary-900 dark:text-primary-50 mb-1">
                    Upload ID Photo
                  </Text>
                  <Text className="text-sm text-primary-600 dark:text-primary-400">
                    Aadhaar, PAN, or Voter ID
                  </Text>
                </TouchableOpacity>

                <View
                  className={cn(
                    "rounded-2xl p-4 border",
                    permissionGranted
                      ? "bg-green-500 border-green-500"
                      : "bg-primary-50 border-primary-300 dark:bg-primary-900 dark:border-primary-700",
                  )}
                >
                  <View className="flex-row gap-3">
                    <View
                      className={cn(
                        "w-8 h-8 rounded-full items-center justify-center mt-0.5",
                        permissionGranted ? "bg-white" : "bg-green-500",
                      )}
                    >
                      <MapPin
                        size={16}
                        color={permissionGranted ? "#16a34a" : "#FFFFFF"}
                      />
                    </View>

                    <View className="flex-1">
                      <Text
                        className={cn(
                          "font-medium mb-1",
                          permissionGranted
                            ? "text-white"
                            : "text-primary-900 dark:text-primary-50",
                        )}
                      >
                        Location Access
                      </Text>
                      <Text
                        className={cn(
                          "text-sm",
                          permissionGranted
                            ? "text-green-100"
                            : "text-primary-600 dark:text-primary-400",
                        )}
                      >
                        {permissionGranted
                          ? "Location access granted"
                          : "Allow location access so customers can find you nearby"}
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
            loading
              ? "Saving..."
              : step === 4 && !permissionGranted
                ? "Enable Location to Continue"
                : step === 4
                  ? "Complete Profile"
                  : "Continue"
          }
        />
      </View>
    </View>
  );
}
