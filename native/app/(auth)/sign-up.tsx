import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { User, Phone, Lock } from "lucide-react-native";
import { Redirect, router } from "expo-router";
import { useAuthStore } from "@/store";
import { SIGN_UP_STEP, USER_ROLE } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "@/constants";
import { useRegister } from "@/hooks/useAuthMutation";
import CustomInput from "@/components/CustomInput";
import BackButton from "@/components/BackButton";
import CustomTouchableOpacityButton from "@/components/CustomTouchableOpacityButton";
import CustomPressableButton from "@/components/CustomPressableButton";
import { useRef } from "react";
import { cn } from "@/utils/utils";

export default function SignupScreen() {
  const { name, phone, password, userRole, setField, signupStep, setUserRole } =
    useAuthStore();

  const registerMutation = useRegister();
  const phoneInputRef = useRef<any>(null);
  const passwordInputRef = useRef<any>(null);

  const handleSignup = async () => {
    Keyboard.dismiss();
    registerMutation.mutate({
      name,
      password,
      phone,
      role: userRole,
    });
  };

  if (signupStep === SIGN_UP_STEP.OTP) {
    return <Redirect href={ROUTES.OTP_VERIFICATION} />;
  }

  return (
    <SafeAreaView
      className="flex-1 dark:bg-black
    "
    >
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
              <View className="flex-1 px-6 pt-4 justify-between">
                <View>
                  {/* Title */}
                  <Animated.View entering={FadeInDown.duration(400)}>
                    <Text className="text-3xl font-bold dark:text-primary-50 text-primary-950 mb-2">
                      Create{" "}
                      {userRole === USER_ROLE.FREELANCER
                        ? "freelancer"
                        : "user"}{" "}
                      account
                    </Text>
                    <Text className="dark:text-primary-300 text-primary-700 mb-8">
                      {userRole === USER_ROLE.FREELANCER
                        ? "Join as a skilled worker and get discovered"
                        : "Sign up to find trusted workers near you"}
                    </Text>
                    <Animated.View
                      entering={FadeInDown.delay(100)}
                      className="flex-row bg-primary-100 dark:bg-primary-800 rounded-xl p-1 mb-6"
                    >
                      {[USER_ROLE.USER, USER_ROLE.FREELANCER].map((type) => (
                        <Pressable
                          key={type}
                          onPress={() => {
                            Keyboard.dismiss();
                            setUserRole(type);
                          }}
                          android_ripple={{ color: "rgba(0,0,0,0.1)" }}
                          className={cn(
                            "flex-1 py-2 rounded-lg overflow-hidden items-center",
                            userRole === type
                              ? "bg-white dark:bg-primary-700"
                              : "",
                          )}
                        >
                          <Text
                            className={cn(
                              "text-sm",
                              userRole === type
                                ? "text-primary-900 dark:text-primary-50 font-semibold"
                                : "text-primary-500 dark:text-primary-400 font-medium",
                            )}
                          >
                            {type === USER_ROLE.USER
                              ? "User Account"
                              : "Freelancer Account"}
                          </Text>
                        </Pressable>
                      ))}
                    </Animated.View>
                  </Animated.View>

                  {/* Form */}
                  <Animated.View
                    entering={FadeInDown.delay(200)}
                    className="gap-4"
                  >
                    {/* Name */}
                    <CustomInput
                      icon={<User size={15} color="#64748b" />}
                      placeholder="Full Name"
                      value={name}
                      onChangeText={(text) => setField("name", text)}
                      autoCapitalize="words"
                      returnKeyType="next"
                      onSubmitEditing={() => phoneInputRef.current?.focus()}
                    />

                    {/* Phone */}
                    <CustomInput
                      ref={phoneInputRef}
                      icon={<Phone size={15} color="#64748b" />}
                      placeholder="Phone Number"
                      value={phone}
                      onChangeText={(text) => setField("phone", text)}
                      keyboardType="phone-pad"
                      returnKeyType="next"
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                    />

                    {/* Password */}
                    <CustomInput
                      ref={passwordInputRef}
                      icon={<Lock size={15} color="#64748b" />}
                      placeholder="Password"
                      value={password}
                      onChangeText={(text) => setField("password", text)}
                      secureTextEntry={true}
                      autoCapitalize="none"
                      autoCorrect={false}
                      returnKeyType="done"
                      onSubmitEditing={handleSignup}
                    />
                  </Animated.View>

                  {/* Signup Button */}
                  <Animated.View
                    entering={FadeInDown.delay(300)}
                    className="mt-8"
                  >
                    <CustomTouchableOpacityButton
                      title={
                        registerMutation.isPending ? "Signing up..." : "Sign Up"
                      }
                      onPress={handleSignup}
                      isLoading={registerMutation.isPending}
                      disabled={registerMutation.isPending}
                    />
                  </Animated.View>

                  {/* Terms */}
                  <Animated.Text
                    entering={FadeInDown.delay(400)}
                    className="text-center text-sm dark:text-primary-300 text-primary-700 mt-6 px-4"
                  >
                    By signing up, you agree to our{" "}
                    <Text
                      className="text-primary-600 dark:text-primary-400 font-medium"
                      // onPress={() => router.push(ROUTES.TERMS)}
                    >
                      Terms
                    </Text>{" "}
                    and{" "}
                    <Text
                      className="text-primary-600 dark:text-primary-400 font-medium"
                      // onPress={() => router.push(ROUTES.PRIVACY_POLICY)}
                    >
                      Privacy Policy
                    </Text>
                  </Animated.Text>
                </View>

                {/* Footer */}
                <View className="flex flex-row items-baseline justify-center pb-6 pt-8">
                  <Text className="text-sm dark:text-primary-300 text-primary-700">
                    Already have an account?{" "}
                  </Text>
                  <CustomPressableButton
                    title="Login"
                    onPress={() => router.replace(ROUTES.SIGN_IN)}
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
