import { FreelancerDetails } from "@/components";
import React from "react";
import { View } from "react-native";

export default function FreelancerDetailScreen() {
  return (
    <View className="flex-1 bg-primary-50 dark:bg-primary-950">
      <FreelancerDetails />
    </View>
  );
}
