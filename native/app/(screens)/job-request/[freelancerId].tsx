import {
  AppHeader,
  CustomInput,
  CustomTextArea,
  CustomTouchableOpacityButton,
  ErrorState,
  JobRequestHeader,
} from "@/components";
import { useGetSingleVisibleFreelancerDetail } from "@/mutations";
import { useLocationStore } from "@/store";
import { FilterOperator } from "@/types";
import { router, useLocalSearchParams } from "expo-router";
import { FileText, IndianRupee, MapPin } from "lucide-react-native";
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  useColorScheme,
  View,
} from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function JobRequest() {
  const { freelancerId } = useLocalSearchParams<{ freelancerId: string }>();
  const { coordinates } = useLocationStore();
  const colourScheme = useColorScheme();

  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    jobLocation: "",
    jobBudget: "",
  });

  // Create refs for each input
  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);
  const locationInputRef = useRef<TextInput>(null);
  const budgetInputRef = useRef<TextInput>(null);

  const { data: freelancer, error } = useGetSingleVisibleFreelancerDetail({
    location: coordinates,
    filters: [
      {
        field: "freelancerId",
        operator: FilterOperator.EQUAL_TO,
        value: freelancerId,
      },
    ],
  });

  if (error || !freelancer) {
    return (
      <ErrorState
        title="Something went wrong"
        message="We couldn't load this freelancer's profile"
        buttonText="Go Back"
        onPress={() => router.back()}
      />
    );
  }

  return (
    <>
      <AppHeader showBack={true} title="Job Request" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <View className="flex-1">
          <ScrollView className="p-4">
            <Animated.View entering={FadeInUp.delay(100)}>
              <JobRequestHeader {...freelancer} />
            </Animated.View>

            <View className="flex-col gap-4 mt-4">
              {/* Job Title */}
              <Animated.View entering={FadeInUp.delay(200)}>
                <CustomInput
                  ref={titleInputRef}
                  icon={
                    <FileText
                      size={15}
                      color={colourScheme === "dark" ? "#B3A5F5" : "#6B4EEA"}
                    />
                  }
                  placeholder="e.g. Fix bathroom leakage"
                  value={formData.jobTitle}
                  label={"Job Title"}
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, jobTitle: text }))
                  }
                  returnKeyType="next"
                  onSubmitEditing={() => descriptionInputRef.current?.focus()}
                />
              </Animated.View>

              {/* Job Description */}
              <Animated.View entering={FadeInUp.delay(300)}>
                <CustomTextArea
                  ref={descriptionInputRef}
                  placeholder="Describe the work you need done..."
                  value={formData.jobDescription}
                  label="Description"
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, jobDescription: text }))
                  }
                  maxLength={500}
                  returnKeyType="next"
                  onSubmitEditing={() => locationInputRef.current?.focus()}
                />
              </Animated.View>

              {/* Job Location */}
              <Animated.View entering={FadeInUp.delay(400)}>
                <CustomInput
                  ref={locationInputRef}
                  icon={
                    <MapPin
                      size={15}
                      color={colourScheme === "dark" ? "#B3A5F5" : "#6B4EEA"}
                    />
                  }
                  placeholder="e.g. 123 Main Street, City"
                  value={formData.jobLocation}
                  label="Location"
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, jobLocation: text }))
                  }
                  returnKeyType="next"
                  onSubmitEditing={() => budgetInputRef.current?.focus()}
                />
              </Animated.View>

              {/* Job Budget */}
              <Animated.View entering={FadeInUp.delay(500)}>
                <CustomInput
                  ref={budgetInputRef}
                  icon={
                    <IndianRupee
                      size={15}
                      color={colourScheme === "dark" ? "#B3A5F5" : "#6B4EEA"}
                    />
                  }
                  placeholder="e.g. 5000"
                  value={formData.jobBudget}
                  label="Budget (Optional)"
                  onChangeText={(text) =>
                    setFormData((prev) => ({ ...prev, jobBudget: text }))
                  }
                  keyboardType="numeric"
                  returnKeyType="done"
                  onSubmitEditing={() => budgetInputRef.current?.blur()}
                />
              </Animated.View>
            </View>
          </ScrollView>

          {/* Fixed button at bottom */}
        </View>
      </KeyboardAvoidingView>
      <Animated.View
        entering={FadeInDown.delay(100)}
        className="p-4 pb-6 bg-white dark:bg-primary-950 border-t border-primary-200 dark:border-primary-800"
      >
        <CustomTouchableOpacityButton title="Request Job" />
      </Animated.View>
    </>
  );
}
