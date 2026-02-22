import { useEffect, useRef, useState } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { useAuthStore } from "@/store";
import { ROUTES } from "@/constants";
import { useRequestOTP, useVerityOTP } from "@/mutations";
import { CustomTouchableOpacityButton } from "@/components";
import { cn } from "@/utils";
export default function VerifyOTPScreen() {
  const { phone } = useAuthStore();

  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(30);

  const inputRef = useRef<TextInput>(null);

  const mutationRequestOTP = useRequestOTP();
  const mutationVerifyOTP = useVerityOTP();

  useEffect(() => {
    inputRef.current?.focus();

    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOTPChange = (value: string) => {
    const sanitized = value.replace(/[^0-9]/g, "").slice(0, 6);
    setOtp(sanitized);
  };

  const handleVerify = async () => {
    if (otp.length !== 6) return;

    await mutationVerifyOTP.mutateAsync({
      phone,
      code: otp,
    });

    router.replace(ROUTES.SELECT_ROLE);
  };

  const handleResend = async () => {
    setCountdown(30);
    setOtp("");
    inputRef.current?.focus();

    await mutationRequestOTP.mutateAsync({ phone });
  };

  const maskedPhone = phone ? `${phone.slice(0, 3)}***${phone.slice(-2)}` : "";

  const isOtpComplete = otp.length === 6;

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

        {/* OTP Visual Boxes */}
        <Animated.View
          entering={FadeInUp.delay(100).duration(400)}
          className="flex-row justify-center gap-2 mb-8"
        >
          {Array.from({ length: 6 }).map((_, index) => {
            const digit = otp[index];

            return (
              <Pressable
                key={index}
                onPress={() => inputRef.current?.focus()}
                className={cn(
                  "w-14 h-16 border-2 rounded-2xl items-center justify-center",
                  digit
                    ? "border-brand bg-brand/5 dark:bg-brand-500/10"
                    : "border-primary-300 dark:border-primary-700 bg-white dark:bg-primary-800",
                )}
              >
                <Text className="text-2xl font-bold text-gray-900 dark:text-white">
                  {digit || ""}
                </Text>
              </Pressable>
            );
          })}
        </Animated.View>

        {/* Hidden Real Input (OTP AutoFill works here) */}
        <TextInput
          ref={inputRef}
          autoFocus
          value={otp}
          onChangeText={handleOTPChange}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          maxLength={6}
          className="absolute opacity-0"
        />

        {/* Resend */}
        <Animated.View
          entering={FadeIn.delay(200).duration(400)}
          className="items-center mb-10"
        >
          {countdown > 0 ? (
            <View className="flex-row">
              <Text className="text-sm primary-text">Resend code in </Text>
              <Text className="text-sm font-bold primary-text">
                {countdown}s
              </Text>
            </View>
          ) : (
            <Pressable
              onPress={handleResend}
              disabled={mutationRequestOTP.isPending}
            >
              <Text className="text-sm font-semibold text-gray-500">
                {mutationRequestOTP.isPending
                  ? "Sending..."
                  : "Resend Code"}
              </Text>
            </Pressable>
          )}
        </Animated.View>

        {/* Info */}
        <Animated.View
          entering={FadeIn.delay(250).duration(400)}
          className="mb-8"
        >
          <View className="bg-primary-100 dark:bg-primary-900 rounded-2xl p-4">
            <Text className="text-sm primary-text text-center">
              Please check your SMS for the verification code.
            </Text>
          </View>
        </Animated.View>

        {/* Verify Button */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)}>
          <CustomTouchableOpacityButton
            onPress={handleVerify}
            disabled={!isOtpComplete}
            title={
              mutationVerifyOTP.isPending ? "Verifying..." : "Verify"
            }
          />
        </Animated.View>

        {/* Error */}
        {mutationVerifyOTP.isError && (
          <Animated.View entering={FadeIn.duration(300)} className="mt-4">
            <View className="bg-red-50 border border-red-200 rounded-xl p-4">
              <Text className="text-sm text-red-600 text-center">
                {mutationVerifyOTP.error?.message || "Invalid OTP. Please try again."}
              </Text>
            </View>
          </Animated.View>
        )}
      </View>
    </SafeAreaView>
  );
}
