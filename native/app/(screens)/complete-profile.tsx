import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import {
  CustomInput,
  CustomTouchableOpacityButton,
  StatusBanner,
} from "@/components";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import { Camera, MapPin, Clock } from "lucide-react-native";
import { useColorScheme } from "react-native";
import Animated, { FadeInRight } from "react-native-reanimated";
import { ROUTES } from "@/constants";
import { useFormErrors } from "@/hooks";
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
import {
  cn,
  getExperienceLabel,
  pickImageFromGallery,
  takePhotoWithCamera,
} from "@/utils";
import { useEffect, useState } from "react";
import RequiredLabel from "@/components/common/RequiredLabel";

export default function CompleteProfile() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const mutationCompleteProfile = useCompleteFreelancerProfile();
  const { generalError, clearErrors } = useFormErrors(mutationCompleteProfile);
  const { setProfileCompleted } = useAuthStore();
  const {
    step,
    loading,
    formData,
    setProfileImage,
    setIdImage,
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

  const handlePickProfileImage = async () => {
    const uri = await pickImageFromGallery();
    if (uri) setProfileImage(uri);
  };

  const handleTakeProfilePhoto = async () => {
    const uri = await takePhotoWithCamera(ImagePicker.CameraType.front);
    if (uri) setProfileImage(uri);
  };

  const handlePickIdImage = async () => {
    const uri = await pickImageFromGallery();
    if (uri) setIdImage(uri);
  };

  const handleTakeIdPhoto = async () => {
    const uri = await takePhotoWithCamera(ImagePicker.CameraType.back);
    if (uri) setIdImage(uri);
  };

  const handleNext = async () => {
    if (step < 4) {
      nextStep();
      return;
    }

    Keyboard.dismiss();
    clearErrors();

    setLoading(true);

    try {
      const form = new FormData();

      form.append("professionId", formData.professionId!);
      form.append("experience", String(formData.experience!));
      form.append("skillIds", JSON.stringify(formData.skills));

      form.append(
        "location",
        JSON.stringify({
          latitude: coordinates.latitude,
          longitude: coordinates.longitude,
          accuracy: coordinates.accuracy,
        }),
      );

      if (formData.profileImage) {
        form.append("profileImage", {
          uri: formData.profileImage,
          name: "profile.jpg",
          type: "image/jpeg",
        } as any);
      }

      if (formData.idImage) {
        form.append("idImage", {
          uri: formData.idImage,
          name: "id.jpg",
          type: "image/jpeg",
        } as any);
      }

      await mutationCompleteProfile.mutateAsync(form);

      setProfileCompleted(true);
      resetProfile();
      router.replace(ROUTES.HOME);
    } catch (error) {
      // ❗ Prevent uncaught promise error
      console.log("Profile completion error:", error);
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
    (step === 4 && (!permissionGranted || !formData.idImage));

  return (
    <View className="flex-1 bg-primary-50 dark:bg-primary-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="p-4 pt-16">
          <Text className="text-2xl font-bold text-primary-900 dark:text-primary-50">
            Complete your profile
          </Text>
          <Text className="text-sm text-primary-600 dark:text-primary-400 mt-1">
            Set up your freelancer profile to get started
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
            {`Step ${step} of 4`}
          </Text>
        </View>
        {generalError && (
          <Animated.View entering={FadeInRight} className="px-4 mb-4">
            <StatusBanner
              variant="error"
              message={generalError}
              onDismiss={clearErrors}
            />
          </Animated.View>
        )}

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
                {`${formData.skills.length}/3 selected`}
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
                How many years of experience do you have?
              </Text>

              <CustomInput
                icon={
                  <Clock size={15} color={isDark ? "#B3A5F5" : "#6B4EEA"} />
                }
                placeholder="e.g. 2.5"
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
            <Animated.View entering={FadeInRight} className="gap-5">
              <Text className="text-xl font-bold text-primary-900 dark:text-primary-50">
                Verify your identity
              </Text>
              {/* ID Verification Card */}
              <View className="bg-white dark:bg-primary-900 rounded-2xl p-4 border border-primary-200 dark:border-primary-700">
                <Text className="font-semibold text-primary-900 dark:text-primary-50 mb-2">
                  <RequiredLabel label="Government ID" />
                </Text>

                <Text className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                  CNIC, passport, or driver's license
                </Text>

                <View className="items-center gap-3">
                  {formData.idImage ? (
                    <>
                      <Image
                        source={{ uri: formData.idImage }}
                        className="w-full h-40 rounded-xl"
                        resizeMode="cover"
                      />
                      <View className="flex-row gap-3">
                        <TouchableOpacity
                          onPress={() => setIdImage(null)}
                          className="px-4 py-2 bg-red-100 rounded-xl"
                        >
                          <Text className="text-sm font-medium text-red-600">
                            Remove
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={handleTakeIdPhoto}
                          className="px-4 py-2 bg-primary-200 dark:bg-primary-700 rounded-xl"
                        >
                          <Text className="text-sm font-medium">Retake</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={handlePickIdImage}
                          className="px-4 py-2 bg-primary-200 dark:bg-primary-700 rounded-xl"
                        >
                          <Text className="text-sm font-medium">Gallery</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={handleTakeIdPhoto}
                        className="w-full h-40 rounded-xl border-2 border-dashed border-primary-300 items-center justify-center"
                      >
                        <Camera
                          size={32}
                          color={isDark ? "#B3A5F5" : "#6B4EEA"}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handlePickIdImage}
                        className="px-4 py-2 bg-primary-200 dark:bg-primary-700 rounded-xl"
                      >
                        <Text className="text-sm font-medium">
                          Select from gallery
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>
              {/* Profile Photo Card */}
              <View className="bg-white dark:bg-primary-900 rounded-2xl p-4 border border-primary-200 dark:border-primary-700">
                <Text className="font-semibold text-primary-900 dark:text-primary-50 mb-2">
                  Profile photo (optional)
                </Text>
                <Text className="text-sm text-primary-600 dark:text-primary-400 mb-3">
                  A clear photo helps clients trust you
                </Text>

                <View className="items-center gap-3">
                  {formData.profileImage ? (
                    <>
                      <Image
                        source={{ uri: formData.profileImage }}
                        className="w-28 h-28 rounded-full"
                      />
                      <View className="flex-row gap-3">
                        <TouchableOpacity
                          onPress={() => setProfileImage(null)}
                          className="px-4 py-2 bg-red-100 rounded-xl"
                        >
                          <Text className="text-sm font-medium text-red-600">
                            Remove
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={handleTakeProfilePhoto}
                          className="px-4 py-2 bg-primary-200 dark:bg-primary-700 rounded-xl"
                        >
                          <Text className="text-sm font-medium">Retake</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={handlePickProfileImage}
                          className="px-4 py-2 bg-primary-200 dark:bg-primary-700 rounded-xl"
                        >
                          <Text className="text-sm font-medium">Gallery</Text>
                        </TouchableOpacity>
                      </View>
                    </>
                  ) : (
                    <>
                      <TouchableOpacity
                        onPress={handleTakeProfilePhoto}
                        className="w-28 h-28 rounded-full border-2 border-dashed border-primary-300 items-center justify-center"
                      >
                        <Camera
                          size={32}
                          color={isDark ? "#B3A5F5" : "#6B4EEA"}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={handlePickProfileImage}
                        className="px-4 py-2 bg-primary-200 dark:bg-primary-700 rounded-xl"
                      >
                        <Text className="text-sm font-medium">
                          Select from gallery
                        </Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </View>

              {/* Location Card */}
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
                      Location access
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
                        ? "Location granted"
                        : "Allow location to show clients where you work"}
                    </Text>
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
                ? "Enable location to continue"
                : step === 4
                  ? "Complete profile"
                  : "Continue"
          }
        />
      </View>
    </View>
  );
}
