import {
  View,
  Text,
  Keyboard,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { ArrowLeft, Phone, Lock, Mail } from "lucide-react-native";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store";
import { Toast } from "toastify-react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { cn } from "@/utils/utils";
import { LOGIN_METHOD } from "@/types";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";

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
            {[LOGIN_METHOD.PHONE, LOGIN_METHOD.EMAIL].map((type) => (
              <Pressable
                key={type}
                onPress={() => {
                  Keyboard.dismiss();
                  setLoginMethod(type as any);
                }}
                android_ripple={{ color: "rgba(0,0,0,0.1)" }}
                className={cn(
                  "flex-1 py-2 rounded-lg overflow-hidden items-center",
                  loginMethod === type ? "bg-white" : ""
                )}
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
          <Animated.View entering={FadeInDown.delay(200)} className="gap-4">
            {/* Phone / Email */}
            <CustomInput
              icon={
                loginMethod === LOGIN_METHOD.EMAIL ? (
                  <Mail size={15} color="#64748b" />
                ) : (
                  <Phone size={15} color="#64748b" />
                )
              }
              placeholder={
                loginMethod === LOGIN_METHOD.EMAIL ? "Email" : "Phone Number"
              }
              value={loginMethod === LOGIN_METHOD.EMAIL ? email : phone}
              onChangeText={(text) =>
                setField(
                  loginMethod === LOGIN_METHOD.EMAIL ? "email" : "phone",
                  text
                )
              }
              keyboardType={
                loginMethod === LOGIN_METHOD.EMAIL
                  ? "email-address"
                  : "phone-pad"
              }
            />

            {/* Password */}
            <CustomInput
              icon={<Lock size={15} color="#64748b" />}
              placeholder="Password"
              value={password}
              onChangeText={(text) => setField("password", text)}
              secureTextEntry={true}
              keyboardType={"default"}
            />

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
            <CustomButton
              title="Sign In"
              onPress={handleLogin}
              isLoading={loading}
            />
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
