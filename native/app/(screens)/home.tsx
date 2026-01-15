import { View, Text, StyleSheet } from "react-native";
import { ROUTES } from "@/constants";
import { useAuthStore, useOnboardingStore } from "@/store";
import CustomButton from "@/components/CustomButton";
import { useLogout } from "@/hooks/useAuth";
import { router } from "expo-router";

export default function HomeScreen() {
  const logoutMutation = useLogout();

  const handleLogout = () => {
    logoutMutation.mutate();
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
