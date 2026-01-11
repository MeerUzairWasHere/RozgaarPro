import { useState, useRef, useEffect } from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { useAuthStore } from "@/store";
import { SIGN_UP_STEP } from "@/types";
import { ROUTES } from "@/constants/routes";
import { router } from "expo-router";

export default function VerifyOTPScreen() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  const { verifyOtp, loading } = useAuthStore();

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

    await verifyOtp(otpValue);
    router.replace(ROUTES.HOME);
  };

  const handleResend = () => {
    setCountdown(30);
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 px-6 pt-12">
        {/* Title */}
        <Animated.View
          entering={FadeInDown.duration(400)}
          className="items-center"
        >
          <View className="w-20 h-20 bg-primary/10 rounded-full items-center justify-center mb-6">
            <Text className="text-4xl">📱</Text>
          </View>

          <Text className="text-3xl font-bold text-foreground mb-2">
            Verify your phone
          </Text>

          <Text className="text-muted-foreground mb-8 text-center">
            Enter the 6-digit code sent to your phone
          </Text>
        </Animated.View>

        {/* OTP */}
        <Animated.View
          entering={FadeInUp.delay(100).duration(400)}
          className="flex-row justify-center gap-3 mb-8"
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
              className="w-12 h-14 border-2 border-border rounded-xl text-center text-xl font-bold text-foreground bg-card"
            />
          ))}
        </Animated.View>

        {/* Resend */}
        <Animated.View
          entering={FadeIn.delay(200).duration(400)}
          className="items-center mb-8"
        >
          {countdown > 0 ? (
            <Text className="text-muted-foreground">
              Resend code in{" "}
              <Text className="text-primary font-semibold">{countdown}s</Text>
            </Text>
          ) : (
            <Pressable onPress={handleResend}>
              <Text className="text-primary font-semibold">Resend Code</Text>
            </Pressable>
          )}
        </Animated.View>

        {/* Verify */}
        <Animated.View entering={FadeInUp.delay(300).duration(400)}>
          <Pressable
            onPress={handleVerify}
            disabled={otp.join("").length !== 6 || loading}
            className="h-14 rounded-2xl bg-black items-center justify-center mt-8 overflow-hidden"
          >
            <Text className="text-white text-base font-semibold">
              {loading ? "Verifying..." : "Verify"}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
    </View>
  );
}
