import { ScrollView } from "react-native";
import ProfileHeader from "./ProfileHeader";
import QuickStats from "./QuickStats";
import VerificationBadges from "./VerificationBadges";
import AboutSection from "./AboutSection";
import LocationSection from "./LocationSection";
import ReviewsSection from "./ReviewsSection";
import ActionButtons from "./ActionButtons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useGetSingleVisibleFreelancerDetail } from "@/mutations";
import { useLocationStore } from "@/store";
import { FreelancerDetailSkeleton } from "@/components/Skeletons";
import ErrorState from "../common/ErrorState";
import { FilterOperator } from "@/types";

export default function FreelancerDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { coordinates } = useLocationStore();
  const router = useRouter();

  const {
    data: freelancer,
    isLoading,
    error,
  } = useGetSingleVisibleFreelancerDetail({
    location: coordinates,
    filters: [
      { field: "freelancerId", operator: FilterOperator.EQUAL_TO, value: id },
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
        className="flex-1 bg-primary-50 dark:bg-primary-950 px-4 pb-8 "
        showsVerticalScrollIndicator={false}
      >
        <ProfileHeader
          name={freelancer.name}
          profession={freelancer.primary_profession_name}
        />
        <QuickStats
          rating={freelancer.rating}
          experience={freelancer.experience}
          distance={freelancer.distance_km}
        />

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

        <ActionButtons />
      </ScrollView>
    </>
  );
}
