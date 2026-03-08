import { Calendar, PenLine, Star } from "lucide-react-native";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useColorScheme,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import {
  useCanRateFreelancer,
  useCreateReview,
  useGetFreelancerReviews,
} from "@/mutations";

interface ReviewsSectionProps {
  freelancerId: string;
  averageRating: number;
  reviewCount: number;
}

const formatRelativeDate = (value: string) => {
  const reviewDate = new Date(value).getTime();
  const now = Date.now();
  const diffInDays = Math.max(0, Math.floor((now - reviewDate) / (1000 * 60 * 60 * 24)));

  if (diffInDays === 0) return "Today";
  if (diffInDays === 1) return "1 day ago";
  if (diffInDays < 30) return `${diffInDays} days ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths === 1) return "1 month ago";
  if (diffInMonths < 12) return `${diffInMonths} months ago`;

  const diffInYears = Math.floor(diffInMonths / 12);
  return diffInYears === 1 ? "1 year ago" : `${diffInYears} years ago`;
};

const initials = (name: string) => {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

export default function ReviewsSection({
  freelancerId,
  averageRating,
  reviewCount,
}: ReviewsSectionProps) {
  const isDark = useColorScheme() === "dark";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const { data: canRateResult } = useCanRateFreelancer(freelancerId);
  const { data: reviewResult, isLoading: isLoadingReviews } = useGetFreelancerReviews(
    freelancerId,
    {
      pagination: {
        page: 1,
        pageSize: 20,
      },
    },
  );

  const createReview = useCreateReview();

  const reviews = useMemo(() => reviewResult?.data ?? [], [reviewResult?.data]);

  const closeModal = () => {
    if (createReview.isPending) return;
    setIsModalVisible(false);
  };

  const handleSubmitReview = async () => {
    try {
      await createReview.mutateAsync({
        freelancerId,
        rating,
        comment,
      });

      setComment("");
      setRating(5);
      setIsModalVisible(false);
      Alert.alert("Review submitted", "Thanks for sharing your feedback.");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit review.";
      Alert.alert("Could not submit review", message);
    }
  };

  const disableWriteReview = !canRateResult?.canRate;

  return (
    <>
      <Animated.View entering={FadeInDown.delay(200)} className="mb-6">
        <View className="flex-row items-center gap-2 mb-3">
          <View className="w-1 h-6 bg-brand dark:bg-brand-400 rounded-full" />
          <Text className="text-xl font-bold text-primary-950 dark:text-primary-50">
            Reviews
          </Text>
          <TouchableOpacity
            onPress={() => setIsModalVisible(true)}
            disabled={disableWriteReview}
            className="rounded-full ml-auto flex flex-row gap-2 items-center justify-center py-2 px-3 bg-brand text-primary-foreground disabled:opacity-50"
          >
            <PenLine color="#FFF" size={14} />
            <Text className="text-primary-50 text-lg">Write Review</Text>
          </TouchableOpacity>
        </View>

        {disableWriteReview && canRateResult?.reason ? (
          <Text className="text-xs text-primary-500 dark:text-primary-400 mb-3">
            {canRateResult.reason}
          </Text>
        ) : null}

        <View className="mb-3 p-4 rounded-2xl border border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900">
          <View className="flex-row items-center gap-2">
            <Star size={18} color="#FFA500" fill="#FFA500" />
            <Text className="text-base font-semibold text-primary-950 dark:text-primary-50">
              {averageRating.toFixed(1)}
            </Text>
            <Text className="text-sm text-primary-500 dark:text-primary-400">
              ({reviewCount} reviews)
            </Text>
          </View>
        </View>

        {isLoadingReviews ? (
          <Text className="text-sm text-primary-500 dark:text-primary-400">
            Loading reviews...
          </Text>
        ) : reviews.length === 0 ? (
          <Text className="text-sm text-primary-500 dark:text-primary-400">
            No reviews yet.
          </Text>
        ) : (
          <View className="gap-3">
            {reviews.map((item) => (
              <View
                key={item.id}
                className="bg-white dark:bg-primary-900 rounded-2xl p-5 border border-primary-100 dark:border-primary-800"
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center gap-2">
                    <View className="flex-row gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={14}
                          color="#FFA500"
                          fill={star <= item.rating ? "#FFA500" : "transparent"}
                        />
                      ))}
                    </View>
                    <Text className="text-xs font-semibold text-primary-500 dark:text-primary-400">
                      {item.rating.toFixed(1)}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Calendar size={12} color={isDark ? "#9ca3af" : "#6b7280"} />
                    <Text className="text-xs text-primary-500 dark:text-primary-400">
                      {formatRelativeDate(item.created_at)}
                    </Text>
                  </View>
                </View>

                <Text className="text-primary-700 dark:text-primary-300 leading-6 mb-4">
                  {item.comment || "No written feedback."}
                </Text>

                <View className="flex-row items-center gap-3 pt-4 border-t border-primary-100 dark:border-primary-800">
                  <View className="w-10 h-10 bg-primary-100 dark:bg-primary-800 rounded-full items-center justify-center">
                    <Text className="text-sm font-bold text-primary-600 dark:text-primary-300">
                      {initials(item.reviewer_name)}
                    </Text>
                  </View>
                  <View>
                    <Text className="font-semibold text-primary-950 dark:text-primary-50 text-sm">
                      {item.reviewer_name}
                    </Text>
                    <Text className="text-xs text-primary-500 dark:text-primary-400">
                      Verified Client
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </Animated.View>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1 justify-end"
        >
          <Pressable onPress={closeModal} className="absolute inset-0 bg-black/40" />
          <View className="bg-white dark:bg-primary-900 rounded-t-3xl px-5 pt-5 pb-8 border-t border-primary-100 dark:border-primary-800 max-h-[80%]">
            <ScrollView showsVerticalScrollIndicator={false}>
              <View className="w-12 h-1.5 rounded-full bg-primary-200 dark:bg-primary-700 self-center mb-4" />
              <Text className="text-lg font-bold text-primary-950 dark:text-primary-50 mb-4">
                Write a Review
              </Text>

              <View className="flex-row gap-2 mb-4">
                {[1, 2, 3, 4, 5].map((star) => {
                  const active = star <= rating;
                  return (
                    <TouchableOpacity
                      key={star}
                      onPress={() => setRating(star)}
                      className="p-1"
                    >
                      <Star
                        size={28}
                        color={active ? "#FFA500" : isDark ? "#4b5563" : "#d1d5db"}
                        fill={active ? "#FFA500" : "transparent"}
                      />
                    </TouchableOpacity>
                  );
                })}
              </View>

              <TextInput
                value={comment}
                onChangeText={setComment}
                placeholder="Share your experience..."
                placeholderTextColor={isDark ? "#9ca3af" : "#6b7280"}
                multiline
                textAlignVertical="top"
                className="min-h-28 rounded-2xl border border-primary-200 dark:border-primary-700 px-4 py-3 text-primary-950 dark:text-primary-50"
              />

              <View className="flex-row gap-3 mt-5">
                <TouchableOpacity
                  onPress={closeModal}
                  disabled={createReview.isPending}
                  className="flex-1 items-center justify-center py-3 rounded-xl border border-primary-200 dark:border-primary-700"
                >
                  <Text className="font-semibold text-primary-700 dark:text-primary-200">
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleSubmitReview}
                  disabled={createReview.isPending}
                  className="flex-1 items-center justify-center py-3 rounded-xl bg-brand disabled:opacity-70"
                >
                  <Text className="font-semibold text-primary-50">
                    {createReview.isPending ? "Submitting..." : "Submit"}
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
}
