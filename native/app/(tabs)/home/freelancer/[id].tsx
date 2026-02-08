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
  Award,
  Briefcase,
  Calendar,
  TrendingUp,
  Shield,
} from "lucide-react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { BackButton, InitialAvatar } from "@/components";
import { formatDistance } from "@/lib";

export default function FreelancerDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { coordinates } = useLocationStore();
  const colourScheme = useColorScheme();
  const isDark = colourScheme === "dark";

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
      <View className="flex-1 items-center justify-center bg-gradient-to-b from-primary-50 to-primary-100 dark:from-primary-950 dark:to-primary-900">
        <View className="items-center">
          <View className="w-16 h-16 bg-primary-200 dark:bg-primary-800 rounded-full mb-4 animate-pulse" />
          <Text className="text-lg font-medium text-primary-950 dark:text-primary-50">
            Loading profile...
          </Text>
        </View>
      </View>
    );
  }

  if (error || !freelancer) {
    return (
      <View className="flex-1 items-center justify-center bg-primary-50 dark:bg-primary-950 px-6">
        <View className="bg-white dark:bg-primary-900 rounded-3xl p-8 items-center shadow-lg">
          <View className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full items-center justify-center mb-4">
            <Text className="text-3xl">⚠️</Text>
          </View>
          <Text className="text-lg font-semibold text-primary-950 dark:text-primary-50 mb-2">
            Something went wrong
          </Text>
          <Text className="text-sm text-primary-600 dark:text-primary-400 text-center mb-6">
            We couldn't load this freelancer's profile
          </Text>
          <TouchableOpacity
            onPress={() => router.back()}
            className="px-8 py-3.5 bg-primary-900 dark:bg-primary-700 rounded-full shadow-sm active:opacity-80"
          >
            <Text className="text-white font-semibold">Go Back</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary-50 dark:bg-primary-950">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header Section with Gradient */}
        <View className="relative">
          <View className="p-4">
            {/* Back Button */}
            <BackButton />

            {/* Profile Header */}
            <Animated.View
              entering={FadeInDown.delay(100)}
              className="items-center"
            >
              {/* Avatar */}
              <View className="w-28 h-28  dark:bg-primary-800 rounded-full items-center justify-center mb-4 shadow-xl border-4 border-white dark:border-primary-700">
                <Text className="text-5xl font-bold text-primary-600 dark:text-primary-300">
                  <InitialAvatar
                    name={freelancer.name}
                    className="text-primary-950 justify-center items-center"
                  />
                </Text>
              </View>

              {/* Name */}
              <Text className="text-3xl font-bold dark:text-white  mb-2 text-center">
                {freelancer.name}
              </Text>

              {/* Profession Badge */}
              <View className="flex-row my-4 items-center gap-2 px-5 py-2.5 bg-black dark:bg-white/10 backdrop-blur-xl rounded-full border border-white/30">
                <Briefcase size={16} color="#fff" strokeWidth={2.5} />
                <Text className="font-semibold text-white">
                  {freelancer.primary_profession_name}
                </Text>
              </View>
            </Animated.View>
          </View>
        </View>

        <View className="px-6 -mt-4">
          {/* Quick Stats Cards */}
          <Animated.View
            entering={FadeInDown.delay(200)}
            className="bg-white dark:bg-primary-900 rounded-3xl p-5 shadow-2xl mb-6 border border-primary-100 dark:border-primary-800"
          >
            <View className="flex-row justify-around">
              {/* Rating */}
              <View className="items-center">
                <View className="flex-row items-center gap-1 mb-1">
                  <Star size={18} color="#FFA500" fill="#FFA500" />
                  <Text className="text-2xl font-bold text-primary-950 dark:text-primary-50">
                    {freelancer.rating.toFixed(1)}
                  </Text>
                </View>
                <Text className="text-xs font-medium text-primary-500 dark:text-primary-400">
                  124 reviews {/* TODO: Add these */}
                </Text>
              </View>

              {/* Divider */}
              <View className="w-px bg-primary-200 dark:bg-primary-800" />

              {/* Experience */}
              <View className="items-center">
                <View className="flex-row items-center gap-1 mb-1">
                  <TrendingUp
                    size={18}
                    color={isDark ? "#a5b4fc" : "#6366f1"}
                  />
                  <Text className="text-2xl font-bold text-primary-950 dark:text-primary-50">
                    {freelancer.experience} Years
                  </Text>
                </View>
                <Text className="text-xs font-medium text-primary-500 dark:text-primary-400">
                  Experience
                </Text>
              </View>

              {/* Divider */}
              <View className="w-px bg-primary-200 dark:bg-primary-800" />

              {/* Distance */}
              <View className="items-center">
                <View className="flex-row items-center gap-1 mb-1">
                  <MapPin size={18} color={isDark ? "#86efac" : "#16a34a"} />
                  <Text className="text-2xl font-bold text-primary-950 dark:text-primary-50">
                    {parseFloat(formatDistance(freelancer.distance_km))}
                  </Text>
                </View>
                <Text className="text-xs font-medium text-primary-500 dark:text-primary-400">
                  km away
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* Verification Badges */}
          <Animated.View entering={FadeInDown.delay(300)} className="mb-6">
            <View className="flex-row flex-wrap gap-2">
              {freelancer.status === "APPROVED" && (
                <View className="flex-row items-center gap-2 px-4 py-2.5 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-900 rounded-full">
                  <Shield size={14} color={isDark ? "#86efac" : "#16a34a"} />
                  <Text className="text-xs font-semibold text-green-700 dark:text-green-400">
                    Verified
                  </Text>
                </View>
              )}

              {freelancer.rating >= 4.5 && (
                <View className="flex-row items-center gap-2 px-4 py-2.5 bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 rounded-full">
                  <Award size={14} color={isDark ? "#fcd34d" : "#f59e0b"} />
                  <Text className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                    Top Rated
                  </Text>
                </View>
              )}

              <View className="flex-row items-center gap-2 px-4 py-2.5 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-full">
                <Phone size={14} color={isDark ? "#93c5fd" : "#3b82f6"} />
                <Text className="text-xs font-semibold text-blue-700 dark:text-blue-400">
                  Phone Verified
                </Text>
              </View>
            </View>
          </Animated.View>

          {/* About Section */}
          <Animated.View entering={FadeInDown.delay(400)} className="mb-6">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-1 h-6 bg-primary-600 dark:bg-primary-400 rounded-full" />
              <Text className="text-xl font-bold text-primary-950 dark:text-primary-50">
                About
              </Text>
            </View>
            <View className="bg-white dark:bg-primary-900 rounded-2xl p-5 border border-primary-100 dark:border-primary-800">
              <Text className="text-primary-700 dark:text-primary-300 leading-7 text-base">
                {freelancer.description
                  ? freelancer.description
                  : `Professional ${freelancer.primary_profession_name.toLowerCase()} with ${freelancer.experience} years of experience. Specialized in high-quality work with attention to detail. Committed to delivering excellent results and customer satisfaction.`}
              </Text>
            </View>
          </Animated.View>

          {/* Location Section */}
          <Animated.View entering={FadeInDown.delay(500)} className="mb-6">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-1 h-6 bg-primary-600 dark:bg-primary-400 rounded-full" />
              <Text className="text-xl font-bold text-primary-950 dark:text-primary-50">
                Location
              </Text>
            </View>
            <View className="bg-white dark:bg-primary-900 rounded-2xl p-5 border border-primary-100 dark:border-primary-800">
              <View className="flex-row items-start gap-4">
                <View className="w-12 h-12 bg-primary-100 dark:bg-primary-800 rounded-2xl items-center justify-center">
                  <MapPin size={20} color={isDark ? "#a5b4fc" : "#6366f1"} />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-primary-950 dark:text-primary-50 text-base mb-1">
                    {freelancer.location || "Location not available"}
                  </Text>
                  <Text className="text-sm text-primary-600 dark:text-primary-400">
                    Approximately {formatDistance(freelancer.distance_km)} from
                    your current location
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Reviews Section */}
          <Animated.View entering={FadeInDown.delay(600)} className="mb-6">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-1 h-6 bg-primary-600 dark:bg-primary-400 rounded-full" />
              <Text className="text-xl font-bold text-primary-950 dark:text-primary-50">
                Recent Reviews
              </Text>
            </View>
            <View className="bg-white dark:bg-primary-900 rounded-2xl p-5 border border-primary-100 dark:border-primary-800">
              {/* Review Header */}
              <View className="flex-row items-center justify-between mb-4">
                <View className="flex-row items-center gap-2">
                  <View className="flex-row gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={14}
                        color="#FFA500"
                        fill="#FFA500"
                      />
                    ))}
                  </View>
                  <Text className="text-xs font-semibold text-primary-500 dark:text-primary-400">
                    5.0
                  </Text>
                </View>
                <View className="flex-row items-center gap-1">
                  <Calendar size={12} color={isDark ? "#9ca3af" : "#6b7280"} />
                  <Text className="text-xs text-primary-500 dark:text-primary-400">
                    2 days ago
                  </Text>
                </View>
              </View>

              {/* Review Text */}
              <Text className="text-primary-700 dark:text-primary-300 leading-6 mb-4">
                "Excellent work! Very professional and completed the job on
                time. Would definitely hire again. Great attention to detail and
                communication throughout."
              </Text>

              {/* Reviewer */}
              <View className="flex-row items-center gap-3 pt-4 border-t border-primary-100 dark:border-primary-800">
                <View className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full items-center justify-center">
                  <Text className="text-sm font-bold text-primary-600 dark:text-primary-300">
                    SC
                  </Text>
                </View>
                <View>
                  <Text className="font-semibold text-primary-950 dark:text-primary-50 text-sm">
                    Satisfied Customer
                  </Text>
                  <Text className="text-xs text-primary-500 dark:text-primary-400">
                    Verified Client
                  </Text>
                </View>
              </View>
            </View>
          </Animated.View>

          {/* Action Buttons */}
          <Animated.View entering={FadeInDown.delay(700)} className="mb-32">
            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 bg-primary-600 dark:bg-primary-500 rounded-2xl py-4 items-center shadow-lg active:opacity-90"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center gap-2">
                  <Phone size={20} color="#fff" />
                  <Text className="text-white font-bold text-base">
                    Contact
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                className="flex-1 bg-white dark:bg-primary-900 border-2 border-primary-600 dark:border-primary-500 rounded-2xl py-4 items-center active:opacity-80"
                activeOpacity={0.8}
              >
                <View className="flex-row items-center gap-2">
                  <Calendar size={20} color={isDark ? "#a5b4fc" : "#6366f1"} />
                  <Text className="text-primary-600 dark:text-primary-400 font-bold text-base">
                    Book Now
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </ScrollView>
    </View>
  );
}
