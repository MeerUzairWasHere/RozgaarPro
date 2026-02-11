import { Modal, View, Pressable, useColorScheme, Text } from "react-native";
import BackButton from "./BackButton";
import { Star, MapPin, ShieldCheck } from "lucide-react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const FilterDrawer = ({ visible, onClose }: Props) => {
  const colorScheme = useColorScheme();
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      {/* Overlay */}
      <Pressable style={{ flex: 1 }} onPress={onClose} />

      {/* Bottom drawer */}
      <View
        style={{
          backgroundColor: colorScheme === "dark" ? "#121212" : "#F2F2F2",
          padding: 20,
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
          minHeight: 500,
          elevation: 5,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.3,
          shadowRadius: 4,
        }}
      >
        <View className="flex flex-row justify-between items-center">
          <Text className="text-2xl font-semibold dark:text-primary-50 text-primary-900">
            Filters
          </Text>
          <BackButton />
        </View>

        {/* SORT BY */}
        <View className="mt-6">
          <Text className="text-sm font-semibold mb-3 dark:text-primary-50 text-primary-900">
            Sort By
          </Text>

          <View className="flex-row flex-wrap gap-2">
            <Pressable className="flex-row items-center gap-2 px-4 py-2.5 rounded-xl bg-brand">
              <Star size={14} color="#fff" />
              <Text className="text-white text-sm font-medium">Top Rated</Text>
            </Pressable>

            <Pressable className="flex-row items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-200 dark:bg-primary-800">
              <MapPin size={14} color="#111" />
              <Text className="text-sm font-medium dark:text-primary-50 text-primary-900">
                Nearest
              </Text>
            </Pressable>

            <Pressable className="flex-row items-center gap-2 px-4 py-2.5 rounded-xl bg-primary-200 dark:bg-primary-800">
              <ShieldCheck size={14} color="#111" />
              <Text className="text-sm font-medium dark:text-primary-50 text-primary-900">
                Most Experienced
              </Text>
            </Pressable>
          </View>
        </View>

        {/* MINIMUM RATING */}
        <View className="mt-6">
          <Text className="text-sm font-semibold mb-3 dark:text-primary-50 text-primary-900">
            Minimum Rating
          </Text>

          <View className="flex-row gap-2">
            {["Any", "⭐ 4+", "⭐ 4.5+", "⭐ 4.8+"].map((label, i) => (
              <Pressable
                key={label}
                className={`px-4 py-2.5 rounded-xl ${
                  i === 0 ? "bg-brand" : "bg-primary-200 dark:bg-primary-800"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    i === 0
                      ? "text-white"
                      : "dark:text-primary-50 text-primary-900"
                  }`}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* MAX DISTANCE */}
        <View className="mt-6">
          <Text className="text-sm font-semibold mb-3 dark:text-primary-50 text-primary-900">
            Maximum Distance
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {["Any", "1 km", "2 km", "5 km"].map((label, i) => (
              <Pressable
                key={label}
                className={`px-4 py-2.5 rounded-xl ${
                  i === 0 ? "bg-brand" : "bg-primary-200 dark:bg-primary-800"
                }`}
              >
                <Text
                  className={`text-sm font-medium ${
                    i === 0
                      ? "text-white"
                      : "dark:text-primary-50 text-primary-900"
                  }`}
                >
                  {label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="mt-6">
          <Text className="text-sm font-semibold mb-3 dark:text-primary-50 text-primary-900">
            Experience upto
          </Text>

          <View className="flex-row flex-wrap gap-2">
            {["Any", "2 years", "4 years", "6 years", "10 years"].map(
              (label, i) => (
                <Pressable
                  key={label}
                  className={`px-4 py-2.5 rounded-xl ${
                    i === 0 ? "bg-brand" : "bg-primary-200 dark:bg-primary-800"
                  }`}
                >
                  <Text
                    className={`text-sm font-medium ${
                      i === 0
                        ? "text-white"
                        : "dark:text-primary-50 text-primary-900"
                    }`}
                  >
                    {label}
                  </Text>
                </Pressable>
              ),
            )}
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <View className="flex-row gap-3 mt-8">
          <Pressable className="flex-1 py-3 rounded-xl border border-primary-300 dark:border-primary-700">
            <Text className="text-center text-sm font-medium dark:text-primary-50 text-primary-900">
              Clear All
            </Text>
          </Pressable>

          <Pressable className="flex-1 py-3 rounded-xl bg-brand">
            <Text className="text-center text-sm font-semibold text-white">
              Apply Filters
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default FilterDrawer;
