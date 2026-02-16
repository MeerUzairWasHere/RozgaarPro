import { Redirect } from "expo-router";
import { useAuthStore, useLocationStore, useOnboardingStore } from "@/store";
import { ROUTES } from "@/constants";
import { useEffect } from "react";

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const onboardingCompleted = useOnboardingStore((s) => s.completed);
  const { getCurrentLocation } = useLocationStore();

  useEffect(() => {
    getCurrentLocation();
  }, []);

  if (!onboardingCompleted) {
    return <Redirect href={ROUTES.ONBOARDING} />;
  }

  if (!isAuthenticated) {
    return <Redirect href={ROUTES.SELECT_ROLE} />;
  }

  return <Redirect href={ROUTES.HOME} />;
}
