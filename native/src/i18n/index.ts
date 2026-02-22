import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LANGUAGES, RTL_LANGS, isRtl, type LanguageCode } from "./languages";
import en from "./locales/en.json";
import ur from "./locales/ur.json";

const STORAGE_KEY = "@RozgaarPro/language";

const resources = {
  en: { translation: en },
  ur: { translation: ur },
} as const;

/**
 * Apply RTL layout. Call after changing language when switching to/from RTL.
 * Returns true if layout direction changed (app may need reload on Android).
 */
function applyRtl(lang: string): boolean {
  const shouldBeRtl = isRtl(lang);
  const currentRtl = I18nManager.isRTL;

  if (currentRtl !== shouldBeRtl) {
    I18nManager.allowRTL(shouldBeRtl);
    I18nManager.forceRTL(shouldBeRtl);
    return true;
  }
  return false;
}

/**
 * Get stored language from AsyncStorage. Safe; never throws.
 */
async function getStoredLanguage(): Promise<string | null> {
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    return stored;
  } catch {
    return null;
  }
}

/**
 * Persist selected language. Safe; never throws.
 */
export async function persistLanguage(lang: string): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, lang);
  } catch {
    // ignore storage errors
  }
}

/**
 * Get device locale tag (e.g. "en", "ur"). Uses expo-localization first (Expo Go safe);
 * only falls back to react-native-localize in dev/build environments where it is linked.
 */
function getDeviceLocaleTag(): string | null {
  // Try expo-localization first — works in Expo Go and avoids loading react-native-localize
  try {
    const expo = require("expo-localization");
    const locales = expo.getLocales?.();
    const tag = locales?.[0]?.languageCode?.toLowerCase();
    if (tag) return tag;
  } catch {
    // ignore
  }
  // Fallback for dev/build with react-native-localize linked (not available in Expo Go)
  try {
    const RNLocalize = require("react-native-localize");
    const locales = RNLocalize.getLocales?.();
    const tag = locales?.[0]?.languageTag?.split(/-/)[0]?.toLowerCase();
    return tag ?? null;
  } catch {
    return null;
  }
}

/**
 * Detect initial language: stored > device locale > "en".
 * Only returns en | ur.
 */
async function detectInitialLanguage(): Promise<LanguageCode> {
  const stored = await getStoredLanguage();
  if (stored && (stored === "en" || stored === "ur")) {
    return stored as LanguageCode;
  }

  const preferred = getDeviceLocaleTag();
  if (preferred === "ur") {
    return "ur";
  }

  return "en";
}

/**
 * Initialize i18n: resources, detection, persistence, RTL.
 * Call once before rendering app. Does not throw; safe on first launch.
 */
export async function initI18n(): Promise<void> {
  const lang = await detectInitialLanguage();
  applyRtl(lang);

  await i18n.use(initReactI18next).init({
    resources,
    lng: lang,
    fallbackLng: "en",
    compatibilityJSON: "v4",
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

  await persistLanguage(lang);
}

export { LANGUAGES, RTL_LANGS, isRtl };
export type { LanguageCode } from "./languages";
export type { TranslationKeys, TranslationParams } from "./types";
export default i18n;
