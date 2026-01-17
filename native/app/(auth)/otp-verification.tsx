import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { useAuthStore } from "@/store";
import { ROUTES } from "@/constants/file-routes";
import { router } from "expo-router";
import { useRequestOTP, useVerityOTP } from "@/hooks/useAuthMutation";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTouchableOpacityButton from "@/components/CustomTouchableOpacityButton";

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(TextInput | null)[]>([]);
  const mutationRequestOTP = useRequestOTP();
  const mutationVerifyOTP = useVerityOTP();
  const { phone } = useAuthStore();

  useEffect(() => {
    inputRefs.current[0]?.focus();

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newOtp = [...otp];
    newOtp[index] = value.replace(/[^0-9]/g, "");
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (index: number, key: string) => {
    if (key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const otpValue = otp.join("");
    if (otpValue.length !== 6) return;

    await mutationVerifyOTP.mutateAsync({
      phone,
      code: otpValue,
    });

    router.replace(ROUTES.SELECT_ROLE);
  };

  const handleResend = () => {
    setCountdown(30);
    setOtp(["", "", "", "", "", ""]);
    inputRefs.current[0]?.focus();
    mutationRequestOTP.mutateAsync({ phone });
  };

  const maskedPhone = phone ? `${phone.slice(0, 3)}***${phone.slice(-2)}` : "";

  const isOtpComplete = otp.join("").length === 6;

  return (
    <SafeAreaView className="flex-1 bg-white dark:bg-primary-950">
      <View className="flex-1 px-6 pt-8">
        {/* Header */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="items-center mb-12"
        >
          <Text className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
            Verify your phone
          </Text>

          <Text className="text-base text-gray-600 dark:text-gray-400 text-center mb-1">
            Enter the 6-digit code sent to
          </Text>

          <Text className="text-base font-semibold text-gray-900 dark:text-white">
            {maskedPhone}
          </Text>
        </Animated.View>

        {/* OTP Input */}
        <Animated.View
          entering={FadeInUp.delay(100).duration(400)}
          className="flex-row justify-center gap-2 mb-8"
        >
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              //@ts-ignore
              ref={(el) => (inputRefs.current[index] = el)}
              value={digit}
              onChangeText={(value) => handleChange(index, value)}
              onKeyPress={({ nativeEvent }) =>
                handleKeyPress(index, nativeEvent.key)
              }
              keyboardType="number-pad"
              maxLength={1}
              className={`w-14 h-16 border-2 rounded-2xl text-center text-2xl font-bold ${
                digit
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 text-gray-900 dark:text-white"
                  : "border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-200 text-gray-900 dark:text-white"
              }`}
              placeholderTextColor="#9CA3AF"
            />
          ))}
        </Animated.View>

        {/* Resend Section */}
        <Animated.View
          entering={FadeIn.delay(200).duration(400)}
          className="items-center mb-10"
        >
          {countdown > 0 ? (
            <View className="flex-row items-center">
              <Text className="text-sm text-gray-600 dark:text-gray-400">
                Resend code in{" "}
              </Text>
              <Text className="text-sm font-bold text-blue-500 dark:text-blue-400">
                {countdown}s
              </Text>
            </View>
          ) : (
            <Pressable
              onPress={handleResend}
              disabled={mutationRequestOTP.isPending}
              className="px-6 py-2"
            >
              <Text className="text-sm font-semibold text-blue-500 dark:text-blue-400">
                {mutationRequestOTP.isPending ? "Sending..." : "Resend Code"}
              </Text>
            </Pressable>
          )}
        </Animated.View>

        {/* Help Text */}
        <Animated.View
          entering={FadeIn.delay(250).duration(400)}
          className="mb-8"
        >
          <View className="bg-gray-100 dark:bg-gray-900 rounded-2xl p-4">
            <Text className="text-sm text-gray-600 dark:text-gray-400 text-center leading-5">
              Please check your text messages for the verification code. It may
              take a few moments to arrive.
            </Text>
          </View>
        </Animated.View>

        {/* Verify Button */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)}>
          <CustomTouchableOpacityButton
            onPress={handleVerify}
            disabled={!isOtpComplete}
            title={mutationVerifyOTP.isPending ? "Verifying..." : "Verify"}
          />
        </Animated.View>

        {/* Error Message */}
        {mutationVerifyOTP.isError && (
          <Animated.View entering={FadeIn.duration(300)} className="mt-4">
            <View className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 rounded-xl p-4">
              <Text className="text-sm text-red-600 dark:text-red-400 text-center">
                {mutationVerifyOTP.error?.message ||
                  "Invalid OTP. Please try again."}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
