import ProfileHeader from "./ProfileHeader";
import QuickStats from "./QuickStats";
import VerificationBadges from "./VerificationBadges";
import AboutSection from "./AboutSection";
import LocationSection from "./LocationSection";
import ReviewsSection from "./ReviewsSection";
import ActionButtons from "./ActionButtons";
import ErrorState from "../common/ErrorState";
import {
  RefreshControl,
  ScrollView,
  View,
  Text,
  Pressable,
} from "react-native";
import { router, useLocalSearchParams, useRouter } from "expo-router";
import { useGetSingleVisibleFreelancerDetail } from "@/mutations";
import { useLocationStore } from "@/store";
import { FreelancerDetailSkeleton } from "@/components/Skeletons";
import { FilterOperator } from "@/types";
import { usePullToRefresh } from "@/hooks";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useState } from "react";
import { cn } from "@/utils";
import ImageGallery from "./ImageGallery";

type Tab = "about" | "gallery";

export default function FreelancerDetails() {
  const { freelancerId } = useLocalSearchParams<{
    freelancerId: string;
  }>();
  const { coordinates } = useLocationStore();
  const { refreshing, onRefresh } = usePullToRefresh();
  const [activeTab, setActiveTab] = useState<Tab>("about");

  const {
    data: freelancer,
    isLoading,
    error,
  } = useGetSingleVisibleFreelancerDetail({
    location: coordinates,
    filters: [
      {
        field: "freelancerId",
        operator: FilterOperator.EQUAL_TO,
        value: freelancerId,
      },
    ],
  });

  if (isLoading) {
    return <FreelancerDetailSkeleton />;
  }

  if (error || !freelancer) {
    return (
      <ErrorState
        title="Something went wrong"
        message="We couldn't load this freelancer's profile"
        buttonText="Go Back"
        onPress={() => router.back()}
      />
    );
  }

  return (
    <>
      <ScrollView
        className="flex-1 bg-primary-50 dark:bg-primary-950 px-4 pb-8"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileHeader
          name={freelancer.name}
          profession={freelancer.primary_profession_name}
          imageUrl={freelancer.profile_image_url}
          availability={freelancer.availability}
        />
        <QuickStats
          rating={freelancer.rating}
          experience={freelancer.experience}
          distance={freelancer.distance_km}
        />

        {/* Tab Bar */}
        <Animated.View
          entering={FadeInDown.delay(100)}
          className="flex-row bg-brand/10 dark:bg-brand-500/20 rounded-xl p-1 my-4 border border-brand/20 dark:border-brand-500/30"
        >
          {(["about", "gallery"] as Tab[]).map((tab) => (
            <Pressable
              key={tab}
              onPress={() => setActiveTab(tab)}
              android_ripple={{ color: "rgba(107,78,234,0.15)" }}
              className={cn(
                "flex-1 py-2 rounded-lg overflow-hidden items-center",
                activeTab === tab ? "bg-brand dark:bg-brand-500" : "",
              )}
            >
              <Text
                className={cn(
                  "text-sm capitalize",
                  activeTab === tab
                    ? "text-white font-semibold"
                    : "text-primary-600 dark:text-primary-400 font-medium",
                )}
              >
                {tab}
              </Text>
            </Pressable>
          ))}
        </Animated.View>

        {/* Tab Content */}
        {activeTab === "about" ? (
          <View>
            <VerificationBadges
              status={freelancer.status}
              rating={freelancer.rating}
            />
            <AboutSection
              description={freelancer.description}
              profession={freelancer.primary_profession_name}
              experience={freelancer.experience}
            />
            <LocationSection
              location={freelancer.location}
              distance={freelancer.distance_km}
            />
            <ReviewsSection />
          </View>
        ) : (
          <ImageGallery freelancer={freelancer} />
        )}
      </ScrollView>

      <Animated.View
        entering={FadeInDown.delay(100)}
        className="p-4 pb-6 bg-white dark:bg-primary-950 border-t border-primary-200 dark:border-primary-800"
      >
        <ActionButtons
          freelancerId={freelancer.freelancer_id}
          phone={freelancer.phone}
        />
      </Animated.View>
    </>
  );
}
