import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Star, MapPin, ShieldCheck } from "lucide-react-native";
import { router } from "expo-router";

type Worker = {
  id: string;
  name: string;
  profession: string;
  experience: string;
  rating: number;
  reviewCount: number;
  distance: string;
  imageUrl: string;
  verified: boolean;
};

type NearbyWorkersProps = {
  workers?: Worker[];
  onSeeAllPress?: () => void;
  onWorkerPress?: (workerId: string) => void;
};

const DEFAULT_WORKERS: Worker[] = [
  {
    id: "1",
    name: "Ramesh Kumar",
    profession: "Electrician",
    experience: "8 years",
    rating: 4.8,
    reviewCount: 124,
    distance: "1.2 km",
    imageUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "2",
    name: "Suresh Sharma",
    profession: "Plumber",
    experience: "5 years",
    rating: 4.6,
    reviewCount: 89,
    distance: "2.5 km",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "3",
    name: "Vijay Singh",
    profession: "Carpenter",
    experience: "12 years",
    rating: 4.9,
    reviewCount: 156,
    distance: "0.8 km",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face",
    verified: true,
  },
  {
    id: "4",
    name: "Ajay Patel",
    profession: "Mason",
    experience: "6 years",
    rating: 4.5,
    reviewCount: 67,
    distance: "3.1 km",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    verified: false,
  },
];

export default function NearbyWorkers({
  workers = DEFAULT_WORKERS,
  onSeeAllPress,
  onWorkerPress,
}: NearbyWorkersProps) {
  return (
    <View className="px-4">
      {/* Header */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-semibold text-primary-900 dark:text-primary-50">
          Nearby Workers
        </Text>
        <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7}>
          <Text className="text-sm font-medium text-primary-600 dark:text-primary-400">
            See all
          </Text>
        </TouchableOpacity>
      </View>

      {/* Workers List */}
      <View className="flex flex-col gap-3 pb-4">
        {workers.map((worker) => (
          <TouchableOpacity
            key={worker.id}
            className="w-full bg-white dark:bg-primary-900 rounded-xl p-3 border border-primary-100 dark:border-primary-800 shadow-sm active:opacity-90"
            onPress={() => onWorkerPress?.(worker.id)}
            activeOpacity={0.7}
          >
            <View className="flex-row items-start gap-3">
              {/* Profile Image */}
              <View className="relative flex-shrink-0">
                <Image
                  source={{ uri: worker.imageUrl }}
                  className="w-14 h-14 rounded-xl"
                />
                {worker.verified && (
                  <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary-900 dark:bg-primary-50 rounded-full flex items-center justify-center border-2 border-white dark:border-primary-900">
                    <ShieldCheck
                      size={12}
                      color="#F2F2F2"
                      className="text-primary-50 dark:text-primary-900"
                    />
                  </View>
                )}
              </View>

              {/* Worker Info */}
              <View className="flex-1 min-w-0">
                {/* Name */}
                <View className="flex-row items-center gap-2 mb-1">
                  <Text className="font-semibold text-primary-900 dark:text-primary-50 truncate">
                    {worker.name}
                  </Text>
                </View>

                {/* Profession & Experience */}
                <View className="flex-row items-center gap-2 mb-2">
                  <View className="bg-primary-50 dark:bg-primary-800 px-2 py-0.5 rounded-md">
                    <Text className="text-sm font-medium text-primary-900 dark:text-primary-50">
                      {worker.profession}
                    </Text>
                  </View>
                  <Text className="text-xs text-primary-600 dark:text-primary-400">
                    • {worker.experience}
                  </Text>
                </View>

                {/* Rating & Distance */}
                <View className="flex-row items-center gap-6">
                  {/* Rating */}
                  <View className="flex-row items-center gap-1">
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <Text className="text-sm font-medium text-primary-900 dark:text-primary-50">
                      {worker.rating}
                    </Text>
                    <Text className="text-xs text-primary-600 dark:text-primary-400">
                      ({worker.reviewCount})
                    </Text>
                  </View>

                  {/* Distance */}
                  <View className="flex-row items-center gap-1">
                    <MapPin
                      size={14}
                      color="#666666"
                      className="text-primary-600 dark:text-primary-400"
                    />
                    <Text className="text-xs text-primary-600 dark:text-primary-400">
                      {worker.distance}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
