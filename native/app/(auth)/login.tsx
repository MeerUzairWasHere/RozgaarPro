import { View, Text, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import Input from "../../components/Input";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Input placeholder="Email" />
      <Input placeholder="Password" secureTextEntry />

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable onPress={() => router.push("/(auth)/signup")}>
        <Text style={styles.link}>Create an account</Text>
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
    backgroundColor: "#2563eb",
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
