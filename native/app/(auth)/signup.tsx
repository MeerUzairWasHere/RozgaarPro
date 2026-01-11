import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Input from "../../components/Input";

export default function Signup() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      <Input placeholder="Name" />
      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Create Account</Text>
      </Pressable>

      <Pressable onPress={() => router.back()}>
        <Text style={styles.link}>Already have an account?</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 8,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
  },
  link: {
    marginTop: 16,
    color: "#2563eb",
    textAlign: "center",
  },
});
