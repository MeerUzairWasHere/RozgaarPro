import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store";
import { USER_ROLE } from "@/types";
import { Redirect } from "expo-router";

export default function index() {
  const { user, isAuthenticated } = useAuthStore();

  if (
    isAuthenticated &&
    !user?.profileCompleted &&
    user?.role === USER_ROLE.FREELANCER
  ) {
    return <Redirect href={ROUTES.FREELANCER_ONBOARDING} />;
  }

  if (user?.role === USER_ROLE.FREELANCER) {
    return <Redirect href={ROUTES.FREELANCER_HOME} />;
  }

  return <Redirect href={ROUTES.USER_HOME} />;
}
