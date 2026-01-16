import { View, Text } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { User, Phone, Lock } from "lucide-react-native";
import { Redirect, router } from "expo-router";
import { useAuthStore } from "@/store";
import { SIGN_UP_STEP, USER_ROLE } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { ROUTES } from "@/constants";
import { useRegister } from "@/hooks/useAuth";
import UserRoleBadge from "@/components/UserRoleBadge";
import CustomInput from "@/components/CustomInput";
import BackButton from "@/components/BackButton";
import CustomTouchableOpacityButton from "@/components/CustomTouchableOpacityButton";
import CustomPressableButton from "@/components/CustomPressableButton";

export default function SignupScreen() {
  const { name, phone, password, userRole, setField, signupStep } =
    useAuthStore();

  const registerMutation = useRegister();

  const handleSignup = async () => {
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
    <SafeAreaView className="flex-1 bg-primary dark:bg-primary-950">
      <>
        <View className="flex-1">
          {/* Header */}
          <View className="p-4">
            <BackButton />
          </View>

          {/* Content */}
          <View className="flex-1 px-6 pt-4 ">
            {/* Title */}
            <Animated.View entering={FadeInDown.duration(400)}>
              <Text className="text-3xl font-bold primary-text  mb-2">
                Create account
              </Text>
              <Text className="primary-text mb-8">
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
              <CustomInput
                icon={<User size={15} color="#64748b" />}
                placeholder="Full Name"
                value={name}
                onChangeText={(text) => setField("name", text)}
              />

              {/* Email */}
              <CustomInput
                icon={<Phone size={15} color="#64748b" />}
                placeholder="Phone Number"
                value={phone}
                onChangeText={(text) => setField("phone", text)}
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
            </Animated.View>

            {/* Signup Button */}
            <Animated.View entering={FadeInDown.delay(300)} className="mt-8">
              <CustomTouchableOpacityButton
                title={registerMutation.isPending ? "Signing up..." : "Sign Up"}
                onPress={handleSignup}
                isLoading={registerMutation.isPending}
              />
            </Animated.View>

            {/* Terms */}
            <Animated.Text
              entering={FadeInDown.delay(400)}
              className="text-center text-sm text-primary-950 dark:text-primary mt-6"
            >
              By signing up, you agree to our{" "}
              <Text className="primary-text font-medium">Terms</Text> and{" "}
              <Text className="primary-text font-medium">Privacy Policy</Text>
            </Animated.Text>
          </View>

          {/* Footer */}
          <View className="flex flex-row items-baseline justify-center mb-4">
            <Text className="text-sm primary-text">
              Already have an account?{" "}
            </Text>
            <CustomPressableButton
              title="Login"
              onPress={() => router.replace(ROUTES.SIGN_IN)}
            />
          </View>
        </View>
      </>
    </SafeAreaView>
  );
}
