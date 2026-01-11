import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Keyboard,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowLeft, Phone, Lock, Eye, EyeOff, Mail } from "lucide-react-native";
import { useRouter } from "expo-router";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store";
import { Button } from "@/components/Button";
import { Toast } from "toastify-react-native";

export default function LoginScreen() {
  const router = useRouter();
  const {
    loginMethod,
    setLoginMethod,
    setField,
    phone,
    email,
    password,
    login,
    loading,
    showPassword,
    setShowPassword,
  } = useAuthStore();

  const handleLogin = async () => {
    const success = await login();
    if (success) {
      router.replace(ROUTES.HOME);
      Toast.success("Login Successful!");
    }
    Toast.error("Login Failed. Please check your credentials.");
    console.log(success);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.replace(ROUTES.SELECT_ROLE)}>
          <ArrowLeft size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Animated.View entering={FadeInDown}>
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Login to your account to continue</Text>
        </Animated.View>

        {/* Toggle */}
        <Animated.View entering={FadeInDown.delay(100)} style={styles.toggle}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              loginMethod === "phone" && styles.toggleActive,
            ]}
            onPress={() => {
              Keyboard.dismiss();
              setLoginMethod("phone");
            }}
          >
            <Text
              style={
                loginMethod === "phone"
                  ? styles.toggleTextActive
                  : styles.toggleText
              }
            >
              Phone Number
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              loginMethod === "email" && styles.toggleActive,
            ]}
            onPress={() => {
              Keyboard.dismiss();
              setLoginMethod("email");
            }}
          >
            <Text
              style={
                loginMethod === "email"
                  ? styles.toggleTextActive
                  : styles.toggleText
              }
            >
              Email
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Form */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.form}>
          {/* Phone / Email */}
          <View style={styles.inputWrapper}>
            {loginMethod === "email" ? (
              <Mail size={20} color="#64748b" />
            ) : (
              <Phone size={20} color="#64748b" />
            )}
            <TextInput
              placeholder={
                loginMethod === "email" ? "Email address" : "Phone number"
              }
              placeholderTextColor="#94a3b8"
              keyboardType={
                loginMethod === "email" ? "email-address" : "phone-pad"
              }
              value={loginMethod === "email" ? email : phone}
              onChangeText={(v) =>
                setField(loginMethod === "email" ? "email" : "phone", v)
              }
              style={styles.input}
            />
          </View>
          {/* Password */}
          <View style={styles.inputWrapper}>
            <Lock size={20} color="#64748b" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#94a3b8"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(v) => setField("password", v)}
              style={styles.input}
            />

            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              {showPassword ? (
                <EyeOff size={20} color="#64748b" />
              ) : (
                <Eye size={20} color="#64748b" />
              )}
            </TouchableOpacity>
          </View>

          <Button
            style={styles.forgot}
            onPress={() => router.replace(ROUTES.FORGOT_PASSWORD)}
            variant="ghost"
            size="sm"
          >
            <Text style={styles.forgotText}>Forgot password?</Text>
          </Button>
        </Animated.View>

        {/* Login Button */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <TouchableOpacity
            style={[styles.loginBtn, loading && { opacity: 0.6 }]}
            onPress={() => handleLogin()}
            disabled={loading}
          >
            <Text style={styles.loginText}>
              {loading ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Don’t have an account?{" "}
          <Text style={styles.link} onPress={() => router.push(ROUTES.SIGNUP)}>
            Create account
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    padding: 16,
    marginTop: 50,
  },

  content: {
    flex: 1,
    paddingHorizontal: 24,
    marginTop: 120,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: "#64748b",
    marginBottom: 32,
  },

  toggle: {
    flexDirection: "row",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
  },

  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 8,
  },

  toggleActive: {
    backgroundColor: "#ffffff",
  },

  toggleText: {
    color: "#64748b",
    fontSize: 14,
    fontWeight: "500",
  },

  toggleTextActive: {
    color: "#0f172a",
    fontSize: 14,
    fontWeight: "600",
  },

  form: {
    gap: 16,
  },

  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 16,
    height: 56,
  },

  input: {
    flex: 1,
    fontSize: 16,
  },

  forgot: {
    alignItems: "flex-end",
  },

  forgotText: {
    fontSize: 14,
    color: "#2563eb",
    fontWeight: "500",
  },

  loginBtn: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#2563eb",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 32,
  },

  loginText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },

  footer: {
    padding: 24,
    alignItems: "center",
  },

  footerText: {
    fontSize: 14,
    color: "#64748b",
  },

  link: {
    color: "#2563eb",
    fontWeight: "600",
  },
});
