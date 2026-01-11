import {
  View,
  Text,
  TextInput,
  Keyboard,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowLeft, Phone, Lock, Eye, EyeOff, Mail } from "lucide-react-native";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store";
import { Toast } from "toastify-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { cn } from "@/utils/utils";

export default function LoginScreen() {
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
      Toast.success("Login Successful!");
      router.replace(ROUTES.HOME);
    } else {
      Toast.error("Login Failed. Please check your credentials.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Header */}
        <View className="p-4">
          <Pressable
            onPress={() => router.back()}
            android_ripple={{ color: "rgba(0,0,0,0.12)" }}
            className="p-2 rounded-full overflow-hidden self-start"
          >
            <ArrowLeft size={24} color="#0f172a" />
          </Pressable>
        </View>

        {/* Content */}
        <View className="flex-1 px-6">
          <Animated.View entering={FadeInDown}>
            <Text className="text-3xl font-bold text-slate-900 mb-1">
              Welcome back
            </Text>
            <Text className="text-sm text-slate-500 mb-8">
              Login to your account to continue
            </Text>
          </Animated.View>

          {/* Toggle */}
          <Animated.View
            entering={FadeInDown.delay(100)}
            className="flex-row bg-slate-100 rounded-xl p-1 mb-6"
          >
            {["phone", "email"].map((type) => (
              <Pressable
                key={type}
                onPress={() => {
                  Keyboard.dismiss();
                  setLoginMethod(type as any);
                }}
                android_ripple={{ color: "rgba(0,0,0,0.1)" }}
                className={`flex-1 py-2 rounded-lg overflow-hidden items-center ${
                  loginMethod === type ? "bg-white" : ""
                }`}
              >
                <Text
                  className={
                    (cn("text-sm"),
                    loginMethod === type
                      ? "text-slate-900 font-semibold"
                      : "text-slate-500 font-medium")
                  }
                >
                  {type === "phone" ? "Phone Number" : "Email"}
                </Text>
              </Pressable>
            ))}
          </Animated.View>

          {/* Form */}
          <Animated.View entering={FadeInDown.delay(200)} className="space-y-4">
            {/* Phone / Email */}
            <View className="flex-row items-center border-2 border-slate-200 rounded-2xl px-4 h-14 space-x-3">
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
                className="flex-1 text-base ml-2 mb-1"
              />
            </View>

            {/* Password */}
            <View
              className="flex-row items-center mt-4
             border-2 border-slate-200 rounded-2xl px-4 h-14 space-x-3"
            >
              <Lock size={20} color="#64748b" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="#94a3b8"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={(v) => setField("password", v)}
                className="flex-1 text-base  ml-2 mb-1"
              />
              <Pressable
                onPress={() => setShowPassword(!showPassword)}
                android_ripple={{ color: "rgba(0,0,0,0.12)" }}
                className="p-2 rounded-full overflow-hidden"
              >
                {showPassword ? (
                  <EyeOff size={20} color="#64748b" />
                ) : (
                  <Eye size={20} color="#64748b" />
                )}
              </Pressable>
            </View>

            {/* Forgot */}
            <TouchableOpacity
              className="self-end"
              onPress={() => router.replace(ROUTES.FORGOT_PASSWORD)}
            >
              <Text
                className="text-sm mt-4
               text-primary font-medium"
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Login Button */}
          <Animated.View entering={FadeInDown.delay(300)}>
            <Pressable
              onPress={handleLogin}
              disabled={loading}
              android_ripple={{ color: "rgba(255,255,255,0.25)" }}
              className={cn(
                "h-14 rounded-2xl bg-primary items-center justify-center mt-8 overflow-hidden",
                loading ? "opacity-60" : ""
              )}
            >
              <Text className="text-white text-base font-semibold">
                {loading ? "Signing in..." : "Sign In"}
              </Text>
            </Pressable>
          </Animated.View>
        </View>

        {/* Footer */}
        <View className="p-6 items-center">
          <Text className="text-sm text-slate-500">
            Don’t have an account?{" "}
            <Text
              onPress={() => router.replace(ROUTES.SIGNUP)}
              className="text-primary font-semibold"
            >
              Create account
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
