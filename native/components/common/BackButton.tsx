import { useCallback } from "react";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import clsx from "clsx";
import {
  Pressable,
  useColorScheme,
  type GestureResponderEvent,
} from "react-native";

const TOUCH_SIZE = 44;

interface BackButtonProps {
  /** Use on purple header for white icon; omit for brand icon on light screens */
  light?: boolean;
  /** When there is no history to go back to (e.g. first screen), navigate here instead. */
  fallbackHref?: string;
}

const BackButton = ({ light = false, fallbackHref }: BackButtonProps) => {
  const colourScheme = useColorScheme();
  const iconColor = light
    ? "#FFFFFF"
    : colourScheme === "dark"
      ? "#B3A5F5"
      : "#6B4EEA";

  const onPress = useCallback(
    (_e: GestureResponderEvent) => {
      if (router.canGoBack()) {
        router.back();
      } else if (fallbackHref) {
        router.replace(fallbackHref as never);
      }
    },
    [fallbackHref],
  );

  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
      android_ripple={{
        color: light ? "rgba(255,255,255,0.2)" : "rgba(107,78,234,0.15)",
        borderless: true,
      }}
      className={clsx(
        "rounded-full overflow-hidden self-start items-center justify-center",
        light ? "bg-white/20" : "bg-brand/10 dark:bg-brand-500/20",
      )}
      style={{
        width: TOUCH_SIZE,
        height: TOUCH_SIZE,
      }}
    >
      <ArrowLeft size={22} color={iconColor} strokeWidth={2.25} />
    </Pressable>
  );
};
export default BackButton;
