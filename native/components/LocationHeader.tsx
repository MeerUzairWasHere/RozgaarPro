import { useLocationStore } from "@/store/useLocationStore";
import { MapPin } from "lucide-react-native";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
const LocationHeader = () => {
  const { location, getCurrentLocation } = useLocationStore();

  useEffect(() => {
    getCurrentLocation();
  }, [location]);

  return (
    <TouchableOpacity
      className="flex-row items-center gap-2"
      activeOpacity={0.7}
      onPress={getCurrentLocation}
    >
      <View className="p-2 bg-primary-100 dark:bg-primary-100 rounded-full">
        <MapPin size={18} />
      </View>
      <View className="text-left">
        <Text className="text-sm text-primary-500 dark:text-primary-200">
          Your Location
        </Text>
        <Text className="text-md font-semibold text-primary-900 dark:text-primary-100   ">
          {location || "Enable location"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
export default LocationHeader;
