import { Text, TextProps } from "react-native";
import { useAppLanguage } from "@/src/i18n/useAppLanguage";

/** Default Urdu Nastaliq font when app language is Urdu. */
export const URDU_FONT = "NotoNastaliqUrdu_400Regular";

/**
 * Text component that uses Noto Nastaliq Urdu when app language is Urdu (RTL).
 * Use this for all user-facing text so Urdu displays in Nastaliq script.
 */
export function AppText({ style, ...props }: TextProps) {
  const { language } = useAppLanguage();
  const fontStyle = language === "ur" ? { fontFamily: URDU_FONT } : undefined;
  return <Text style={[fontStyle, style]} {...props} />;
}
