import { FREELANCER_STATUS, NearbyFreelancer } from "@/types";
import {
  View,
  Text,
  TouchableOpacity,
  useColorScheme,
  Image,
} from "react-native";
import { MapPin, ShieldCheck, Star } from "lucide-react-native";
import { formatDistance } from "@/lib";
import { router } from "expo-router";
import { getFreelancerDetailsRoute } from "@/constants";
import InitialAvatar from "../common/InitialAvatar";
import { getExperienceLabel } from "@/utils";
import Animated, { FadeInUp } from "react-native-reanimated";

export default function FreelancerCard({
  freelancer,
}: {
  freelancer: NearbyFreelancer;
}) {
  const colourScheme = useColorScheme();
  return (
    <Animated.View entering={FadeInUp.duration(300).springify()}>
      <TouchableOpacity
        key={freelancer.freelancer_id}
        className="w-full bg-white  dark:bg-primary-900 rounded-xl p-3 border border-primary-100 dark:border-primary-800 shadow-sm activer:opacity-90 mb-4"
        onPress={() =>
          router.push(getFreelancerDetailsRoute(freelancer.freelancer_id))
        }
        activeOpacity={0.7}
      >
        <View className="flex-row items-start gap-3">
          {/* Profile Image */}
          <View className="relative flex-shrink-0">
            {freelancer.profile_image_url !== null ? (
              <Image
                source={{ uri: freelancer.profile_image_url }}
                alt={freelancer.name}
                className="w-16 h-16 rounded-md bg-brand/40 dark:bg-brand/40"
              />
            ) : (
              <InitialAvatar
                name={freelancer.name}
                className="bg-brand/40 dark:bg-brand/40 rounded-xl items-center
          justify-center"
              />
            )}

            {freelancer.status === FREELANCER_STATUS.APPROVED && (
              <View
                className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full items-center justify-center
                  bg-green-500 dark:bg-green-400
 border-white dark:border-primary-900"
              >
                <ShieldCheck size={12} color="#FFF" />
              </View>
            )}
          </View>

          {/* Freelancer Info */}
          <View className="flex-1 min-w-0">
            {/* Name */}
            <View className="flex-row items-center gap-2 mb-2">
              <Text className="font-semibold text-primary-900 dark:text-primary-50 truncate">
                {freelancer.name}
              </Text>
            </View>

            {/* Profession & Experience */}
            <View className="flex-row items-center gap-2 mb-2">
              <View className="bg-brand-300 dark:bg-brand-300 px-2 py-1 rounded-md ">
                <Text className="text-sm font-medium text-black dark:text-primary-950">
                  {freelancer.primary_profession_name}
                </Text>
              </View>
              <Text className="text-xs text-primary-600 dark:text-primary-400">
                {getExperienceLabel(freelancer.experience)}
              </Text>
            </View>

            {/* Rating & Distance */}
            <View className="flex-row items-center gap-6">
              {/* Rating */}
              <View className="flex-row items-center gap-1">
                <Star size={14} fill="#FFA500" color="#FFA500" />
                <Text className="text-sm font-medium text-primary-900 dark:text-primary-50">
                  {freelancer.rating.toFixed(1)}
                </Text>
                <Text className="text-xs text-primary-600 dark:text-primary-400">
                  ({Math.round(Math.random() * 100)}) {/* TODO: Add these */}
                </Text>
              </View>

              {/* Distance */}
              <View className="flex-row items-center gap-1">
                <MapPin
                  size={14}
                  color={colourScheme === "dark" ? "#86efac" : "#16a34a"}
                />
                <Text className="text-xs text-primary-600 dark:text-primary-400">
                  {formatDistance(freelancer.distance_km)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}
