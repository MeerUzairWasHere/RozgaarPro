import {
  View,
  Text,
  Keyboard,
  Pressable,
  useColorScheme,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  TextInput,
} from "react-native";
import { useRef } from "react";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Phone, Lock, Mail } from "lucide-react-native";
import { ROUTES } from "@/constants";
import { useAuthStore } from "@/store";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { cn } from "@/utils/utils";
import { LOGIN_METHOD } from "@/types";
import { useLogin } from "@/hooks/useAuthMutation";
import {
  CustomPressableButton,
  CustomTouchableOpacityButton,
  BackButton,
  CustomInput,
} from "@/components";

export default function LoginScreen() {
  const colourScheme = useColorScheme();
  const { loginMethod, setLoginMethod, setField, phone, email, password } =
    useAuthStore();

  const passwordRef = useRef<TextInput | null>(null);

  const loginMutation = useLogin();

  const handleLogin = () => {
    Keyboard.dismiss();

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
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1">
            {/* Header */}
            <View className="p-4">
              <BackButton />
            </View>

            <ScrollView
              contentContainerClassName="flex-grow"
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
              bounces={false}
            >
              {/* Content */}
              <View className="flex-1 px-6 justify-between">
                <View>
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
                    className="flex-row bg-primary-100 dark:bg-primary-800 rounded-xl p-1 mb-6"
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
                          loginMethod === type
                            ? "bg-white dark:bg-primary-700"
                            : "",
                        )}
                      >
                        <Text
                          className={cn(
                            "text-sm",
                            loginMethod === type
                              ? "text-primary-900 dark:text-primary-50 font-semibold"
                              : "text-primary-500 dark:text-primary-400 font-medium",
                          )}
                        >
                          {type === LOGIN_METHOD.PHONE
                            ? LOGIN_METHOD.PHONE
                            : LOGIN_METHOD.EMAIL}
                        </Text>
                      </Pressable>
                    ))}
                  </Animated.View>

                  {/* Form */}
                  <Animated.View
                    entering={FadeInDown.delay(200)}
                    className="gap-4"
                  >
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
                        loginMethod === LOGIN_METHOD.EMAIL ? "Email" : "Phone"
                      }
                      value={loginMethod === LOGIN_METHOD.EMAIL ? email : phone}
                      onChangeText={(text) =>
                        setField(
                          loginMethod === LOGIN_METHOD.EMAIL
                            ? "email"
                            : "phone",
                          text,
                        )
                      }
                      keyboardType={
                        loginMethod === LOGIN_METHOD.EMAIL
                          ? "email-address"
                          : "phone-pad"
                      }
                      returnKeyType="next"
                      onSubmitEditing={() => passwordRef.current?.focus()}
                      submitBehavior="blurAndSubmit"
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
                      returnKeyType="done"
                      ref={passwordRef}
                    />

                    {/* Forgot Password */}
                    <View className="flex flex-row self-end mb-6">
                      <CustomPressableButton
                        title="Forgot password?"
                        onPress={() => router.replace(ROUTES.FORGOT_PASSWORD)}
                      />
                    </View>
                  </Animated.View>

                  {/* Login Button */}
                  <Animated.View
                    entering={FadeInDown.delay(300)}
                    className="mt-2"
                  >
                    <CustomTouchableOpacityButton
                      title="Sign In"
                      onPress={handleLogin}
                      isLoading={loginMutation.isPending}
                      disabled={
                        loginMethod === LOGIN_METHOD.EMAIL
                          ? email.length === 0 || password.length === 0
                          : phone.length === 0 || password.length === 0
                      }
                    />
                  </Animated.View>
                </View>

                {/* Footer */}
                <View className="flex flex-row items-baseline justify-center pb-6 pt-8">
                  <Text className="text-sm dark:text-primary-300 text-primary-700">
                    Don't have an account?{" "}
                  </Text>
                  <CustomPressableButton
                    title="Create account"
                    onPress={() => router.replace(ROUTES.SIGN_UP)}
                  />
                </View>
              </View>
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
