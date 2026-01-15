import { View, Text, Keyboard, Pressable, useColorScheme } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Phone, Lock, Mail } from "lucide-react-native";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";
import { cn } from "@/utils/utils";
import { LOGIN_METHOD } from "@/types";
import CustomInput from "@/components/CustomInput";
import CustomButton from "@/components/CustomButton";
import BackButton from "@/components/BackButton";
import { useLogin } from "@/hooks/useAuth";

export default function LoginScreen() {
  const colourScheme = useColorScheme();
  const { loginMethod, setLoginMethod, setField, phone, email, password } =
    useAuthStore();

  const loginMutation = useLogin();

  const handleLogin = () => {
    if (loginMethod === LOGIN_METHOD.EMAIL) {
      loginMutation.mutate({
        email,
        password,
      });
    } else {
      loginMutation.mutate({
        phone,
        password,
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-primary dark:bg-primary-950">
      <View className="flex-1">
        {/* Header */}
        <View className="p-4">
          <BackButton />
        </View>

        {/* Content */}
        <View className="flex-1 px-6">
          <Animated.View entering={FadeInDown}>
            <Text className="text-3xl font-bold dark:text-primary-50 text-primary-950 mb-1">
              Welcome back
            </Text>
            <Text className="text-sm dark:text-primary-50 text-primary-950 mb-8">
              Login to your account to continue
            </Text>
          </Animated.View>

          {/* Toggle */}
          <Animated.View
            entering={FadeInDown.delay(100)}
            className="flex-row bg-primary-100 rounded-xl p-1 mb-6"
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
                      ? "text-primary-900 font-semibold"
                      : "text-primary-500 font-medium")
                  }
                >
                  {type === LOGIN_METHOD.PHONE
                    ? LOGIN_METHOD.PHONE
                    : LOGIN_METHOD.EMAIL}
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
                  <Mail
                    size={15}
                    color={colourScheme === "dark" ? "#fff" : "#000"}
                  />
                ) : (
                  <Phone
                    size={15}
                    color={colourScheme === "dark" ? "#fff" : "#000"}
                  />
                )
              }
              placeholder={
                loginMethod === LOGIN_METHOD.EMAIL
                  ? LOGIN_METHOD.EMAIL
                  : LOGIN_METHOD.PHONE
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
              icon={
                <Lock
                  size={15}
                  color={colourScheme === "dark" ? "#fff" : "#000"}
                />
              }
              placeholder="Password"
              value={password}
              onChangeText={(text) => setField("password", text)}
              secureTextEntry={true}
              keyboardType={"default"}
            />

            {/* Forgot */}
            <Link href={ROUTES.FORGOT_PASSWORD} className="mb-4 self-end">
              <Text
                className="text-sm 
              primary-text font-medium"
              >
                Forgot password?
              </Text>
            </Link>
          </Animated.View>

          {/* Login Button */}
          <Animated.View entering={FadeInDown.delay(300)} className={"mt-2"}>
            <CustomButton
              title="Sign In"
              onPress={handleLogin}
              isLoading={loginMutation.isPending}
            />
          </Animated.View>
        </View>

        {/* Footer */}
        <View className="p-6 items-center">
          <Text className="text-sm primary-text">
            Don’t have an account?{" "}
            <Text
              onPress={() => router.replace(ROUTES.SIGN_UP)}
              className=" font-semibold"
            >
              Create account
            </Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
