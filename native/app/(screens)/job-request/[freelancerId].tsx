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
import { useState } from "react";
import { ScrollView, useColorScheme, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function JobRequest() {
  const { freelancerId } = useLocalSearchParams<{ freelancerId: string }>();
  const { coordinates } = useLocationStore();
  const colourScheme = useColorScheme();

  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobBudget, setJobBudget] = useState("");

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

      <View className="flex-1">
        <ScrollView className="p-4">
          <Animated.View entering={FadeInUp.delay(100)}>
            <JobRequestHeader {...freelancer} />
          </Animated.View>

          <View className="flex-col gap-4 mt-4">
            {/* Job Title */}
            <Animated.View entering={FadeInUp.delay(200)}>
              <CustomInput
                icon={
                  <FileText
                    size={15}
                    color={colourScheme === "dark" ? "#B3A5F5" : "#6B4EEA"}
                  />
                }
                placeholder="e.g. Fix bathroom leakage"
                value={jobTitle}
                label={"Job Title"}
                onChangeText={(text) => {
                  setJobTitle(text);
                }}
              />
            </Animated.View>

            {/* Job Description */}
            <Animated.View entering={FadeInUp.delay(300)}>
              <CustomTextArea
                placeholder="Describe the work you need done..."
                value={jobDescription}
                label="Description"
                onChangeText={(text) => {
                  setJobDescription(text);
                }}
                maxLength={1000}
              />
            </Animated.View>

            {/* Job Location */}
            <Animated.View entering={FadeInUp.delay(400)}>
              <CustomInput
                icon={
                  <MapPin
                    size={15}
                    color={colourScheme === "dark" ? "#B3A5F5" : "#6B4EEA"}
                  />
                }
                placeholder="e.g. 123 Main Street, City"
                value={jobLocation}
                label="Location"
                onChangeText={(text) => {
                  setJobLocation(text);
                }}
              />
            </Animated.View>

            {/* Job Budget */}
            <Animated.View entering={FadeInUp.delay(500)}>
              <CustomInput
                icon={
                  <IndianRupee
                    size={15}
                    color={colourScheme === "dark" ? "#B3A5F5" : "#6B4EEA"}
                  />
                }
                placeholder="e.g. 5000"
                value={jobBudget}
                label="Budget (Optional)"
                onChangeText={(text) => {
                  setJobBudget(text);
                }}
              />
            </Animated.View>
          </View>
        </ScrollView>

        {/* Fixed button at bottom */}
        <Animated.View
          entering={FadeInDown.delay(100)}
          className="p-4 pb-6 bg-white dark:bg-primary-950 border-t border-primary-200 dark:border-primary-800"
        >
          <CustomTouchableOpacityButton title="Request Job" />
        </Animated.View>
      </View>
    </>
  );
}
