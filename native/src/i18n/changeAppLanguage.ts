import { I18nManager } from "react-native";
import i18n from "./index";
import { persistLanguage } from "./index";
import { isRtl, type LanguageCode } from "./languages";

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
 * Change app language globally. Updates i18n, AsyncStorage, and RTL.
 * Safe for repeated calls with same language.
 * Returns true if RTL layout changed (app may need reload on Android).
 */
export async function changeAppLanguage(lang: LanguageCode): Promise<boolean> {
  const currentLng = i18n.language?.split("-")[0];
  if (currentLng === lang) {
    return false;
  }
  const layoutChanged = applyRtl(lang);
  await i18n.changeLanguage(lang);
  await persistLanguage(lang);
  return layoutChanged;
}
