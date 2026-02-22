import { Text, TextProps, StyleSheet } from "react-native";
import { useAppLanguage } from "@/src/i18n/useAppLanguage";

/** Default Urdu Nastaliq font when app language is Urdu. */
export const URDU_FONT = "NotoNastaliqUrdu_400Regular";

/** Slightly larger font size for Urdu (Nastaliq reads better a bit bigger). */
const URDU_FONT_SIZE_SCALE = 1.15;

/**
 * Text component: default system font for English; Noto Nastaliq Urdu + slightly
 * larger size when app language is Urdu. Use for all user-facing text.
 */
export function AppText({ style, ...props }: TextProps) {
  const { language } = useAppLanguage();
  const isUrdu = language === "ur";
  const flattened = style ? StyleSheet.flatten(style) : undefined;
  const baseFontSize =
    (flattened && "fontSize" in flattened && typeof flattened.fontSize === "number"
      ? flattened.fontSize
      : 16) as number;
  const urduStyle =
    isUrdu
      ? {
          fontFamily: URDU_FONT,
          fontSize: Math.round(baseFontSize * URDU_FONT_SIZE_SCALE),
        }
      : undefined;
  return <Text style={[style, urduStyle]} {...props} />;
}
