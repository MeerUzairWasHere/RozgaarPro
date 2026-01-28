import { router } from "expo-router";
import { CustomTouchableOpacityButton } from "@/components";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Camera, MapPin, Clock } from "lucide-react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { experienceLevels, ROUTES } from "@/constants";
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
import { cn } from "@/utils/utils";

export default function CompleteProfile() {
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
    (step === 4 && !permissionGranted);

  return (
    <View className="flex-1 dark:bg-black">
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
                      ? "bg-primary-900 dark:bg-primary-50"
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
              <Text className="text-xl font-bold mb-2">
                Choose your profession
              </Text>
              <Text className="text-primary-600 mb-6">
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
                            ? "border-primary-900 dark:border-primary-50 bg-primary-100 dark:bg-primary-800"
                            : "border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900"
                        }`}
                        activeOpacity={0.7}
                      >
                        <View className="flex-row items-center justify-between ">
                          <Text className="font-medium text-primary-900 dark:text-primary-50">
                            {profession.name}
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
              )}
            </Animated.View>
          )}

          {/* Step 2: Skills */}
          {step === 2 && (
            <Animated.View entering={FadeInRight}>
              <Text className="text-xl font-bold mb-2">
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
                            ? "border-primary-900 dark:border-primary-50 bg-primary-100 dark:bg-primary-800"
                            : "border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900"
                        }`}
                        activeOpacity={0.7}
                      >
                        <View className="flex-row items-center justify-between ">
                          <Text className="font-medium text-primary-900 dark:text-primary-50">
                            {skill.name}
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
              )}

              <Text className="text-sm mt-2 text-primary-500">
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
                Tell us about your work experience
              </Text>

              <View className="gap-3">
                {experienceLevels.map((exp) => {
                  const isSelected = formData.experience === exp.value;
                  return (
                    <TouchableOpacity
                      key={exp.title}
                      onPress={() => setExperience(exp.value)}
                      className={cn(
                        `p-4 rounded-2xl border-2 flex-row items-center justify-between`,
                        isSelected
                          ? "border-primary-900 dark:border-primary-50 bg-primary-100 dark:bg-primary-800"
                          : "border-primary-200 dark:border-primary-700 bg-white dark:bg-primary-900",
                      )}
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
