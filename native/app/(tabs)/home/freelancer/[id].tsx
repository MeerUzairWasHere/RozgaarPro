import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetSingleVisibleFreelancerDetail } from "@/mutations";
import { useLocationStore } from "@/store";
import {
  Star,
  MapPin,
  Phone,
  Clock,
  Award,
  Briefcase,
  CheckCircle,
} from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BackButton } from "@/components";
import { formatDistance } from "@/lib";

export default function FreelancerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { coordinates } = useLocationStore();
  const colourScheme = useColorScheme();

  // Fetch freelancer details
  const {
    data: freelancer,
    isLoading,
    error,
  } = useGetSingleVisibleFreelancerDetail({
    freelancerId: id,
    query: { location: coordinates },
  });

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50 dark:bg-primary-950">
        <Text className="text-lg text-primary-950 dark:text-primary-50">
          Loading...
        </Text>
      </View>
    );
  }

  if (error || !freelancer) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50 dark:bg-primary-950 px-6">
        <Text className="text-lg text-red-500 dark:text-red-400 mb-4">
          Failed to load freelancer details
        </Text>
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-6 py-3 bg-primary-800 dark:bg-primary-700 rounded-xl"
        >
          <Text className="text-primary-50 font-semibold">Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary-50 dark:bg-primary-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-4 pb-32 ">
          {/* Name & Profession */}
          <View className="flex flex-row justify-between">
            <BackButton />
            <Animated.View
              entering={FadeInDown.delay(200)}
              className="mb-6 flex justify-between flex-row"
            >
              <View>
                <Text className="text-3xl font-bold text-primary-950 dark:text-primary-50 mb-2">
                  {freelancer.name}
                </Text>
                <View className="flex-row  ml-auto items-center gap-2 px-4 py-3 bg-primary-100 dark:bg-primary-800 rounded-xl ">
                  <Briefcase
                    size={18}
                    color={colourScheme === "light" ? "#000" : "#fff"}
                  />
                  <Text className="font-medium text-primary-950 dark:text-primary-50">
                    {freelancer.primary_profession_name}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </View>

          {/* Stats Cards */}
          <Animated.View
            entering={FadeInDown.delay(300)}
            className="flex-row gap-3 mb-8"
          >
            {/* Rating Card */}
            <View className="flex-1 bg-white dark:bg-primary-900 rounded-2xl p-4 border border-primary-200 dark:border-primary-800">
              <View className="flex-row items-center gap-2 mb-1">
                <Star
                  size={15}
                  color={colourScheme === "light" ? "#000" : "#fff"}
                  fill={colourScheme === "light" ? "#000" : "#fff"}
                />
                <Text className="text-2xl font-bold text-primary-950 dark:text-primary-50">
                  {freelancer.rating.toFixed(1)}
                </Text>
              </View>
              <Text className="text-sm text-primary-600 dark:text-primary-400">
                Rating
              </Text>
            </View>

            {/* Experience Card */}
            <View className="flex-1 bg-white dark:bg-primary-900 rounded-2xl p-4 border border-primary-200 dark:border-primary-800">
              <View className="flex-row items-center gap-2 mb-1">
                <Clock
                  size={15}
                  color={colourScheme === "light" ? "#000" : "#fff"}
                />
                <Text className="text-2xl font-bold text-primary-950 dark:text-primary-50">
                  {freelancer.experience}
                </Text>
              </View>
              <Text className="text-sm text-primary-600 dark:text-primary-400">
                Years of Exp
              </Text>
            </View>

            {/* Distance Card */}
            <View className="flex-1 bg-white dark:bg-primary-900 rounded-2xl p-4 border border-primary-200 dark:border-primary-800">
              <View className="flex-row items-center gap-2 mb-1">
                <MapPin
                  size={15}
                  color={colourScheme === "light" ? "#000" : "#fff"}
                />
                <Text className="text-2xl font-bold text-primary-950 dark:text-primary-50">
                  {formatDistance(freelancer.distance_km)}
                </Text>
              </View>
              <Text className="text-sm text-primary-600 dark:text-primary-400">
                away from you
              </Text>
            </View>
          </Animated.View>

          {/* About Section */}
          <Animated.View entering={FadeInDown.delay(400)} className="mb-6">
            <Text className="text-xl font-semibold text-primary-950 dark:text-primary-50 mb-3">
              About
            </Text>
            <View className="bg-white dark:bg-primary-900 rounded-2xl p-4 border border-primary-200 dark:border-primary-800">
              <Text className="text-primary-950 dark:text-primary-50 leading-relaxed">
                {freelancer.description
                  ? freelancer.description
                  : `Professional ${freelancer.primary_profession_name.toLowerCase()} with ${freelancer.experience} years of experience. Specialized in high-quality work with attention to detail. Committed to delivering excellent results and customer satisfaction.`}
              </Text>
            </View>
          </Animated.View>

          {/* Location Section */}
          <Animated.View entering={FadeInDown.delay(500)} className="mb-6">
            <Text className="text-xl font-semibold text-primary-950 dark:text-primary-50 mb-3">
              Location
            </Text>
            <View className="bg-white dark:bg-primary-900 rounded-2xl p-4 border border-primary-200 dark:border-primary-800">
              <View className="flex-row items-start gap-3">
                <View className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-xl items-center justify-center">
                  <MapPin
                    size={15}
                    color={colourScheme === "light" ? "#000" : "#fff"}
                  />
                </View>
                <View className="flex-1">
                  <Text className="font-medium text-primary-950 dark:text-primary-50">
                    {freelancer.location || "Location not available"}
                  </Text>
                  <Text className="text-sm text-primary-600 dark:text-primary-400 mt-1">
                    Approximately {formatDistance(freelancer.distance_km)} from
                    your location
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Verification Badges */}
          <Animated.View entering={FadeInDown.delay(600)} className="mb-6">
            <Text className="text-xl font-semibold text-primary-950 dark:text-primary-50 mb-3">
              Verification
            </Text>
            <View className="flex-row flex-wrap gap-2">
              {/* ID Verified */}
              {freelancer.status === "APPROVED" && (
                <View className="flex-row items-center gap-2 px-4 py-3 bg-primary-100 dark:bg-primary-800 rounded-xl">
                  <CheckCircle
                    size={15}
                    color={colourScheme === "light" ? "#000" : "#fff"}
                  />
                  <Text className="font-medium text-primary-950 dark:text-primary-50">
                    ID Verified
                  </Text>
                </View>
              )}

              {/* Phone Verified */}
              <View className="flex-row items-center gap-2 px-4 py-3 bg-primary-100 dark:bg-primary-800 rounded-xl">
                <Phone
                  size={15}
                  color={colourScheme === "light" ? "#000" : "#fff"}
                />
                <Text className="font-medium text-primary-950 dark:text-primary-50">
                  Phone Verified
                </Text>
              </View>

              {/* Top Rated */}
              {freelancer.rating >= 4.5 && (
                <View className="flex-row items-center gap-2 px-4 py-3 bg-primary-100 dark:bg-primary-800 rounded-xl">
                  <Award
                    size={15}
                    color={colourScheme === "light" ? "#000" : "#fff"}
                  />
                  <Text className="font-medium text-primary-950 dark:text-primary-50">
                    Top Rated
                  </Text>
                </View>
              )}
            </View>
          </Animated.View>

          {/* Reviews */}
          <Animated.View entering={FadeInDown.delay(700)}>
            <Text className="text-xl font-semibold text-primary-950 dark:text-primary-50 mb-3">
              Recent Reviews
            </Text>
            <View className="bg-white dark:bg-primary-900 rounded-2xl p-4 border border-primary-200 dark:border-primary-800">
              <View className="flex-row items-center gap-2 mb-3">
                <View className="flex-row">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      color={colourScheme === "light" ? "#000" : "#fff"}
                      fill={colourScheme === "light" ? "#000" : "#fff"}
                    />
                  ))}
                </View>
                <Text className="text-sm text-primary-600 dark:text-primary-400">
                  • 2 days ago
                </Text>
              </View>
              <Text className="text-primary-950 dark:text-primary-50 mb-4 leading-relaxed">
                "Excellent work! Very professional and completed the job on
                time. Would definitely hire again."
              </Text>
              <Text className="text-sm text-primary-600 dark:text-primary-400">
                - Satisfied Customer
              </Text>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
