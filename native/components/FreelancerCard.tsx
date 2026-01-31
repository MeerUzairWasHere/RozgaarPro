import { FREELANCER_STATUS, NearbyFreelancer } from "@/types";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import InitialAvatar from "./InitialAvatar";
import { MapPin, ShieldCheck, Star } from "lucide-react-native";
import ExperienceText from "./ExperienceText";
import { formatDistance } from "@/lib/location";

export default function FreelancerCard({
  freelancer,
}: {
  freelancer: NearbyFreelancer;
}) {
  const colourScheme = useColorScheme();
  return (
    <TouchableOpacity
      key={freelancer.freelancer_id}
      className="w-full bg-white dark:bg-primary-900 rounded-xl p-3 border border-primary-100 dark:border-primary-800 shadow-sm activer:opacity-90 mb-4"
      //   onPress={() => onWorkerPress?.(freelancer.id)}
      activeOpacity={0.7}
    >
      <View className="flex-row items-start gap-3">
        {/* Profile Image */}
        <View className="relative flex-shrink-0">
          <InitialAvatar name={freelancer.name} />

          {freelancer.status === FREELANCER_STATUS.APPROVED && (
            <View
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full items-center justify-center
                  bg-primary-900 dark:bg-primary-50
                  border-2 border-white dark:border-primary-900"
            >
              {colourScheme === "light" ? (
                <ShieldCheck
                  size={12}
                  color="#F8FAFC"
                  className="block dark:hidden"
                />
              ) : (
                <ShieldCheck
                  size={12}
                  color="#0F172A"
                  className="hidden dark:block"
                />
              )}
            </View>
          )}
        </View>

        {/* Worker Info */}
        <View className="flex-1 min-w-0">
          {/* Name */}
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="font-semibold text-primary-900 dark:text-primary-50 truncate">
              {freelancer.name}
            </Text>
          </View>

          {/* Profession & Experience */}
          <View className="flex-row items-center gap-2 mb-2">
            <View className="bg-primary-50 dark:bg-primary-800 px-2 py-0.5 rounded-md">
              <Text className="text-sm font-medium text-primary-900 dark:text-primary-50">
                {freelancer.primary_profession_name}
              </Text>
            </View>

            <ExperienceText experience={freelancer.experience} />
          </View>

          {/* Rating & Distance */}
          <View className="flex-row items-center gap-6">
            {/* Rating */}
            <View className="flex-row items-center gap-1">
              <Star size={14} fill="#F59E0B" color="#F59E0B" />
              <Text className="text-sm font-medium text-primary-900 dark:text-primary-50">
                {freelancer.rating}
              </Text>
              <Text className="text-xs text-primary-600 dark:text-primary-400">
                (243)
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
                {formatDistance(freelancer.distance_km)}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
