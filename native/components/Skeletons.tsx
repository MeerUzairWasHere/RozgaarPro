import { useColorScheme, View } from "react-native";

export const ProfessionsFilterFilterSkeleton = () => {
  return (
    <View>
      {/* Title skeleton */}
      <View className="flex-row flex-wrap -mx-1.5">
        {/* Render 6 skeleton cards (2 rows of 3) */}
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} className="w-1/3 px-1.5 mb-3">
            <View className="rounded-xl py-4 px-2 border border-gray-100 dark:border-gray-800 bg-white dark:bg-primary-900">
              {/* Profession name skeleton */}
              <View className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded mx-auto mb-2" />
              {/* Count skeleton */}
              <View className="h-3 w-16 bg-gray-100 dark:bg-gray-800 rounded mx-auto" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const NearbyWorkerSkeleton = () => {
  const scheme = useColorScheme();
  const base = scheme === "dark" ? "bg-primary-800" : "bg-primary-100";

  return (
    <View className="w-full rounded-xl p-3 border border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900">
      <View className="flex-row items-start gap-3">
        {/* Avatar */}
        <View className={`w-14 h-14 rounded-xl ${base}`} />

        {/* Content */}
        <View className="flex-1 gap-2">
          {/* Name */}
          <View className={`h-4 w-1/2 rounded ${base}`} />

          {/* Profession + Experience */}
          <View className="flex-row items-center gap-2">
            <View className={`h-4 w-24 rounded ${base}`} />
            <View className={`h-3 w-20 rounded ${base}`} />
          </View>

          {/* Rating + Distance */}
          <View className="flex-row items-center gap-6 mt-1">
            <View className={`h-3 w-20 rounded ${base}`} />
            <View className={`h-3 w-16 rounded ${base}`} />
          </View>
        </View>
      </View>
    </View>
  );
};

export const NearbyWorkersSkeletonList = () => {
  return (
    <View className="flex flex-col gap-3 pb-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <NearbyWorkerSkeleton key={i} />
      ))}
    </View>
  );
};
