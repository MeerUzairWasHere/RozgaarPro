import { View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store";

export default function HomeScreen() {
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout(); // clear auth state
    router.replace(ROUTES.SELECT_ROLE); // go back to role select
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is Home</Text>

      <Button onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </Button>
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
