import { Redirect } from "expo-router";
import { ROUTES } from "@/constants";
import { useOnboardingStore, useAuthStore } from "@/store";

export default function Index() {
  const onboardingCompleted = useOnboardingStore((state) => state.completed);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  console.log({ isAuthenticated });
  // 1️⃣ User already logged in
  if (isAuthenticated) {
    return <Redirect href={ROUTES.HOME} />;
  }

  // 2️⃣ First-time user → onboarding
  if (!onboardingCompleted) {
    return <Redirect href={ROUTES.ONBOARDING} />;
  }

  // 3️⃣ Onboarding done but not logged in
  return <Redirect href={ROUTES.SELECT_ROLE} />;
}
