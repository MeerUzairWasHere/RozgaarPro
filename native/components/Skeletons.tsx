import { ScrollView, useColorScheme, View } from "react-native";
import AppHeader from "./common/AppHeader";

export const ProfessionsFilterFilterSkeleton = () => {
  return (
    <View>
      {/* Title skeleton */}
      <View className="flex-row flex-wrap -mx-1.5">
        {/* Render 6 skeleton cards (2 rows of 3) */}
        {Array.from({ length: 6 }).map((_, index) => (
          <View key={index} className="w-1/3 px-1.5 mb-3">
            <View className="rounded-xl py-4 px-2 border border-primary-100 dark:border-primary-800 bg-white dark:bg-primary-900">
              {/* Profession name skeleton */}
              <View className="h-4 w-20 bg-primary-200 dark:bg-primary-700 rounded mx-auto mb-2" />
              {/* Count skeleton */}
              <View className="h-3 w-16 bg-primary-100 dark:bg-primary-800 rounded mx-auto" />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export const NearbyWorkerSkeleton = () => {
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

export const FreelancerDetailSkeleton = () => {
  return (
    <View className="flex-1 bg-primary-50 dark:bg-primary-950">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}

        <View className="px-4">
          <View className="items-center pt-12 pb-6">
            {/* Avatar */}
            <View className="w-28 h-28 rounded-full bg-primary-200 dark:bg-primary-800 animate-pulse mb-4" />

            {/* Name */}
            <View className="w-44 h-7 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-3" />

            {/* Profession badge */}
            <View className="w-32 h-9 rounded-full bg-primary-200 dark:bg-primary-800 animate-pulse" />
          </View>
          {/* Stats Card */}
          <View className="bg-white dark:bg-primary-900 rounded-3xl p-5 mb-6">
            <View className="flex-row justify-around">
              {[1, 2, 3].map((i) => (
                <View key={i} className="items-center">
                  <View className="w-12 h-6 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-2" />
                  <View className="w-16 h-3 rounded bg-primary-200 dark:bg-primary-800 animate-pulse" />
                </View>
              ))}
            </View>
          </View>

          {/* Verification badges */}
          <View className="flex-row flex-wrap gap-2 mb-6">
            <View className="w-24 h-8 rounded-full bg-primary-200 dark:bg-primary-800 animate-pulse" />
            <View className="w-28 h-8 rounded-full bg-primary-200 dark:bg-primary-800 animate-pulse" />
            <View className="w-32 h-8 rounded-full bg-primary-200 dark:bg-primary-800 animate-pulse" />
          </View>

          {/* About Section */}
          <View className="mb-6">
            <View className="w-24 h-5 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-3" />

            <View className="bg-white dark:bg-primary-900 rounded-2xl p-5">
              <View className="h-4 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-2" />
              <View className="h-4 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-2" />
              <View className="h-4 w-3/4 rounded bg-primary-200 dark:bg-primary-800 animate-pulse" />
            </View>
          </View>

          {/* Location Section */}
          <View className="mb-6">
            <View className="w-24 h-5 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-3" />

            <View className="bg-white dark:bg-primary-900 rounded-2xl p-5">
              <View className="flex-row gap-4">
                <View className="w-12 h-12 rounded-2xl bg-primary-200 dark:bg-primary-800 animate-pulse" />

                <View className="flex-1">
                  <View className="h-4 w-2/3 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-2" />
                  <View className="h-3 w-1/2 rounded bg-primary-200 dark:bg-primary-800 animate-pulse" />
                </View>
              </View>
            </View>
          </View>

          {/* Reviews Section */}
          <View className="mb-6">
            <View className="w-32 h-5 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-3" />

            <View className="bg-white dark:bg-primary-900 rounded-2xl p-5">
              <View className="h-4 w-1/3 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-3" />
              <View className="h-4 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-2" />
              <View className="h-4 w-5/6 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-4" />

              <View className="flex-row items-center gap-3">
                <View className="w-10 h-10 rounded-full bg-primary-200 dark:bg-primary-800 animate-pulse" />
                <View>
                  <View className="w-24 h-4 rounded bg-primary-200 dark:bg-primary-800 animate-pulse mb-2" />
                  <View className="w-20 h-3 rounded bg-primary-200 dark:bg-primary-800 animate-pulse" />
                </View>
              </View>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 mb-32">
            <View className="flex-1 h-14 rounded-2xl bg-primary-200 dark:bg-primary-800 animate-pulse" />
            <View className="flex-1 h-14 rounded-2xl bg-primary-200 dark:bg-primary-800 animate-pulse" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export const FreelancerFilterHeaderSkeleton = () => {
  return (
    <View className="px-6 h-16 flex-row items-center justify-between border-b border-primary-800 bg-primary-950">
      {/* Count skeleton */}
      <View className="h-5 w-32 rounded bg-primary-800" />

      {/* Filter button skeleton */}
      <View className="h-9 w-24 rounded-full bg-primary-800" />
    </View>
  );
};

export const FreelancerListSkeleton = ({
  professionName = "Profession",
}: {
  professionName?: string;
}) => {
  return (
    <>
      <AppHeader showBack={true} title={`${professionName}s Nearby`} />
      <FreelancerFilterHeaderSkeleton />
      <View className="px-4 pt-4">
        {[...Array(5)].map((_, i) => (
          <View
            key={i}
            className="mb-4 p-4 rounded-2xl bg-primary-100 dark:bg-primary-900"
          >
            {/* Avatar + text row */}
            <View className="flex-row items-center">
              <View className="w-14 h-14 rounded-full bg-primary-200 dark:bg-primary-800" />

              <View className="ml-4 flex-1">
                <View className="h-4 w-1/2 rounded bg-primary-200 dark:bg-primary-800 mb-2" />
                <View className="h-3 w-1/3 rounded bg-primary-200 dark:bg-primary-800" />
              </View>
            </View>

            {/* Bottom stats */}
            <View className="flex-row mt-4 justify-between">
              <View className="h-3 w-16 rounded bg-primary-200 dark:bg-primary-800" />
              <View className="h-3 w-16 rounded bg-primary-200 dark:bg-primary-800" />
            </View>
          </View>
        ))}
      </View>
    </>
  );
};
