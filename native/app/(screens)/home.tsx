import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants";
import { useAuthStore, useOnboardingStore } from "@/store";
import CustomButton from "@/components/CustomButton";

export default function HomeScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const toggleOnboarding = useOnboardingStore((s) => s.completeOnboarding);
  const handleLogout = () => {
    logout(); // clear auth state
    toggleOnboarding(false); // reset onboarding state
    router.replace(ROUTES.ONBOARDING); // go back to role select
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is Home</Text>
      <CustomButton title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 24,
  },
  buttonText: {
    color: "#e70404",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    fontWeight: "600",
  },
});
