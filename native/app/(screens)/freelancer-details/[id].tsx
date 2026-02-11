import { AppHeader, FreelancerDetails } from "@/components";
import React from "react";
import { View } from "react-native";

export default function FreelancerDetailScreen() {
  return (
    <>
      <AppHeader showBack={true} title="Freelancer Profile" />
      <View className="flex-1 bg-primary-50 dark:bg-primary-950 ">
        <FreelancerDetails />
      </View>
    </>
  );
}
