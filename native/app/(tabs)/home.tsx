import { View, Text, StyleSheet } from "react-native";
import { useAuthStore } from "@/store";
import CustomButton from "@/components/CustomButton";
import { useLogout } from "@/hooks/useAuth";

export default function HomeScreen() {
  const logoutMutation = useLogout();
  const { user } = useAuthStore();

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>This is Home</Text>
      <Text style={styles.title}>User: {user?.name}</Text>
      <Text style={styles.title}>Phone: {user?.phone}</Text>
      <Text style={styles.title}>Role: {user?.role}</Text>
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
