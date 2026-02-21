import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { changeAppLanguage } from "./changeAppLanguage";
import { LANGUAGES } from "./languages";
import type { LanguageCode } from "./languages";

/**
 * Hook for app language and switching.
 * changeLanguage updates i18n, AsyncStorage, and RTL.
 * When RTL changes (e.g. en <-> ur), returns true; on Android the app may need
 * to be restarted for layout to apply (caller can handle).
 */
export function useAppLanguage() {
  const { i18n } = useTranslation();
  const language = (i18n.language?.split("-")[0] ?? "en") as LanguageCode;

  const setLanguage = useCallback(async (lang: LanguageCode) => {
    return changeAppLanguage(lang);
  }, []);

  return {
    language,
    setLanguage,
    LANGUAGES,
    isRTL: i18n.dir() === "rtl",
  };
}
