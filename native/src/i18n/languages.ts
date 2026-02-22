/**
 * Supported languages and RTL configuration.
 */

export const RTL_LANGS = ["ur"] as const;
export type RtlLang = (typeof RTL_LANGS)[number];

export type LanguageCode = "en" | "ur";

export const LANGUAGES: Record<
  LanguageCode,
  { code: LanguageCode; label: string; nativeLabel: string }
> = {
  en: { code: "en", label: "English", nativeLabel: "English" },
  ur: { code: "ur", label: "Urdu", nativeLabel: "اردو" },
};

export function isRtl(lang: string): boolean {
  return RTL_LANGS.includes(lang as RtlLang);
}
