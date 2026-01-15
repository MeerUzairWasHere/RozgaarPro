import { Redirect } from "expo-router";
import { useAuthStore, useOnboardingStore } from "@/store";
import { ROUTES } from "@/constants";

export default function Index() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const onboardingCompleted = useOnboardingStore((s) => s.completed);

  if (!onboardingCompleted) {
    return <Redirect href={ROUTES.ONBOARDING} />;
  }

  if (!isAuthenticated) {
    return <Redirect href={ROUTES.SIGN_IN} />;
  }

  return <Redirect href={ROUTES.HOME} />;
}
