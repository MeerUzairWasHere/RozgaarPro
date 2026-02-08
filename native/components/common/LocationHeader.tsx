import { useLocationStore } from "@/store/useLocationStore";
import { MapPin } from "lucide-react-native";
import { useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";

const LocationHeader = () => {
  const { location, loading, getCurrentLocation } = useLocationStore();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={getCurrentLocation}
      disabled={loading}
      className="flex-row items-center gap-2"
    >
      <View className="p-2 bg-primary-100 dark:bg-primary-100 rounded-full">
        <MapPin size={18} />
      </View>

      <View>
        <Text className="text-sm text-primary-500 dark:text-primary-200">
          Your Location
        </Text>

        <Text className="text-sm font-semibold text-primary-900 dark:text-primary-100">
          {loading
            ? "Updating location..."
            : location || "Tap to enable location"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default LocationHeader;
