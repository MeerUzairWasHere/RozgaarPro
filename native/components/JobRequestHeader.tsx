import { NearbyFreelancerDetail } from "@/types";
import { View, Text, Image } from "react-native";
import InitialAvatar from "./common/InitialAvatar";
import AvailabilityStatus from "./common/AvailabilityStatus";

export default function JobRequestHeader(freelancer: NearbyFreelancerDetail) {
  return (
    <View className="flex flex-row items-center bg-brand-400 rounded-full p-4">
      {freelancer.profile_image_url !== null ? (
        <Image
          source={{ uri: freelancer.profile_image_url }}
          alt={freelancer.name}
          className="w-16 h-16 rounded-full bg-brand/40 dark:bg-brand/40"
        />
      ) : (
        <InitialAvatar
          name={freelancer.name}
          className="bg-brand/40 dark:bg-brand/40 rounded-full items-center
          justify-center"
        />
      )}

      <View className="flex flex-col gap-1 ml-4 mr-auto">
        <Text className="text-2xl font-medium text-white">
          {freelancer.name}
        </Text>
        <Text className="text-md font-medium text-brand-200">
          {freelancer.primary_profession_name}
        </Text>
      </View>
      <AvailabilityStatus availability={freelancer.availability} />
    </View>
  );
}
