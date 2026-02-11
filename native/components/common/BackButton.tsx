import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { Pressable, useColorScheme } from "react-native";

interface BackButtonProps {
  /** Use on purple header for white icon; omit for brand icon on light screens */
  light?: boolean;
}

const BackButton = ({ light = false }: BackButtonProps) => {
  const colourScheme = useColorScheme();
  const iconColor = light
    ? "#FFFFFF"
    : colourScheme === "dark"
      ? "#B3A5F5"
      : "#6B4EEA";
  const bgClass = light ? "bg-white/20" : "bg-brand/10 dark:bg-brand-500/20";

  return (
    <Pressable
      onPress={() => router.back()}
      android_ripple={{
        color: light ? "rgba(255,255,255,0.2)" : "rgba(107,78,234,0.15)",
      }}
      className={["p-2 rounded-full overflow-hidden self-start", bgClass].join(
        " ",
      )}
    >
      <ArrowLeft size={24} color={iconColor} />
    </Pressable>
  );
};
export default BackButton;
