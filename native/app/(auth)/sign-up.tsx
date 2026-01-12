import { View, Text, Pressable, TextInput } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowLeft, User, Phone, Lock, Eye, EyeOff } from "lucide-react-native";
import { Redirect, router } from "expo-router";
import { useAuthStore } from "@/store";
import { SIGN_UP_STEP, USER_ROLE } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "@/constants";
import UserRoleBadge from "@/components/UserRoleBadge";
import { Toast } from "toastify-react-native";
import VerifyOTPScreen from "./verifyOtp";
import { useEffect } from "react";

export default function SignupScreen() {
  const {
    name,
    phone,
    password,
    userRole,
    loading,
    showPassword,
    setShowPassword,
    setField,
    signup,
    signupStep,
  } = useAuthStore();

 

  const handleSignup = async () => {
    const success = await signup();
    if (!success) {
      Toast.error("Signup Failed. Please check your credentials.");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      {signupStep === SIGN_UP_STEP.FORM ? (
        <>
          <View className="flex-1">
            {/* Header */}
            <View className="p-4">
              <Pressable
                onPress={() => router.back()}
                className="p-2 -ml-2 rounded-full active:scale-95"
              >
                <ArrowLeft size={24} className="text-foreground" />
              </Pressable>
            </View>

            {/* Content */}
            <View className="flex-1 px-6 pt-4 ">
              {/* Title */}
              <Animated.View entering={FadeInDown.duration(400)}>
                <Text className="text-3xl font-bold text-foreground mb-2">
                  Create account
                </Text>
                <Text className="text-muted-foreground mb-8">
                  {userRole === USER_ROLE.FREELANCER
                    ? "Join as a skilled worker and get discovered"
                    : "Sign up to find trusted workers near you"}
                </Text>
              </Animated.View>

              {/* Role Badge */}
              <Animated.View entering={FadeInDown.delay(100)} className="mb-6">
                <UserRoleBadge />
              </Animated.View>

              {/* Form */}
              <Animated.View
                entering={FadeInDown.delay(200)}
                className="flex gap-4"
              >
                {/* Name */}
                <View className="flex-row items-center border-2 border-slate-200 rounded-2xl px-4 h-14 space-x-3">
                  <User size={20} color="#64748b" />
                  <TextInput
                    placeholder="Full Name"
                    placeholderTextColor="#94a3b8"
                    value={name}
                    onChangeText={(v) => setField("name", v)}
                    className="flex-1 text-base ml-2 mb-1"
                  />
                </View>

                {/* Phone */}
                <View className="flex-row items-center border-2 border-slate-200 rounded-2xl px-4 h-14 space-x-3">
                  <Phone size={20} color="#64748b" />
                  <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="#94a3b8"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={(v) => setField("phone", v)}
                    className="flex-1 text-base ml-2 mb-1"
                  />
                </View>

                {/* Password */}
                <View className="flex-row items-center border-2 border-slate-200 rounded-2xl px-4 h-14 space-x-3">
                  <Lock size={20} color="#64748b" />
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#94a3b8"
                    value={password}
                    secureTextEntry={!showPassword}
                    onChangeText={(v) => setField("password", v)}
                    className="flex-1 text-base ml-2 mb-1"
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
              </Animated.View>

              {/* Signup Button */}
              <Animated.View entering={FadeInDown.delay(300)} className="mt-8">
                <Pressable
                  onPress={handleSignup}
                  disabled={loading}
                  android_ripple={{ color: "rgba(255,255,255,0.25)" }}
                  className={`h-14 rounded-2xl bg-black items-center justify-center mt-8 overflow-hidden ${
                    loading ? "opacity-60" : ""
                  }`}
                >
                  <Text className="text-white text-base font-semibold">
                    {loading ? "Signing in..." : "Sign Up"}
                  </Text>
                </Pressable>
              </Animated.View>

              {/* Terms */}
              <Animated.Text
                entering={FadeInDown.delay(400)}
                className="text-center text-sm text-muted-foreground mt-6"
              >
                By signing up, you agree to our{" "}
                <Text className="text-primary font-medium">Terms</Text> and{" "}
                <Text className="text-primary font-medium">Privacy Policy</Text>
              </Animated.Text>
            </View>

            {/* Footer */}
            <View className="p-6 items-center">
              <Text className="text-muted-foreground">
                Already have an account?{" "}
                <Text
                  onPress={() => router.replace(ROUTES.LOGIN)}
                  className="text-primary font-semibold"
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </>
      ) : (
        <VerifyOTPScreen />
      )}
    </SafeAreaView>
  );
}
