import { useCallback } from "react";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import {
  Pressable,
  useColorScheme,
  I18nManager,
  Platform,
  type GestureResponderEvent,
} from "react-native";

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
  const bgClass = light ? "bg-white/20" : "bg-brand/10 dark:bg-brand-500/20";
  const isRTL = I18nManager.isRTL;

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
      className={["p-2 rounded-full overflow-hidden self-start", bgClass].join(
        " ",
      )}
      style={[
        isRTL ? { transform: [{ scaleX: -1 }] } : undefined,
        ...(Platform.OS === "android" ? [{ minWidth: 48, minHeight: 48 }] : []),
      ]}
    >
      <ArrowLeft size={24} color={iconColor} />
    </Pressable>
  );
};
export default BackButton;
