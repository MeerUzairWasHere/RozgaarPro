import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowLeft, User, Phone, Lock, Eye, EyeOff } from "lucide-react-native";
import { useAuthStore } from "@/store";
import { router } from "expo-router";

export default function SignupScreen() {
  const {
    name,
    phone,
    password,
    showPassword,
    loading,
    setField,
    setShowPassword,
    signup,
  } = useAuthStore();

  const handleSignup = async () => {
    const success = await signup();
    if (success) {
      router.back();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Pressable onPress={() => router.back()} style={{ marginTop: 50 }}>
        <ArrowLeft size={26} />
      </Pressable>

      <Animated.View entering={FadeInDown.duration(300)} style={styles.content}>
        <Text style={styles.title}>Create Account</Text>

        {/* Name */}
        <View style={styles.inputWrapper}>
          <User size={20} color="#777" />
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={(v) => setField("name", v)}
            style={styles.input}
          />
        </View>

        {/* Phone */}
        <View style={styles.inputWrapper}>
          <Phone size={20} color="#777" />
          <TextInput
            placeholder="Phone Number"
            keyboardType="number-pad"
            maxLength={10}
            value={phone}
            onChangeText={(v) => setField("phone", v.replace(/\D/g, ""))}
            style={styles.input}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <Lock size={20} color="#777" />
          <TextInput
            placeholder="Create Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={(v) => setField("password", v)}
            style={styles.input}
          />
          <Pressable onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </Pressable>
        </View>

        {/* Button */}
        <Pressable
          disabled={loading}
          onPress={handleSignup}
          style={[styles.button, loading && styles.disabled]}
        >
          <Text style={styles.buttonText}>
            {loading ? "Creating..." : "Create Account"}
          </Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#fff",
  },
  content: {
    marginTop: 140,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 24,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 56,
    marginBottom: 14,
    borderColor: "#ddd",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  button: {
    height: 56,
    borderRadius: 18,
    backgroundColor: "#4f46e5",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  disabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
