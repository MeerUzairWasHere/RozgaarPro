/**
 * Type-safe translation keys.
 * Keys must match locales/en.json (and other locale files).
 */
export type TranslationKeys = keyof typeof import("./locales/en.json");

export type TranslationParams = {
  jobs_found: { count: number };
  jobs_found_plural: { count: number };
  freelancers_found: { count: number };
  freelancers_found_plural: { count: number };
  step_of: { current: number };
  selected_count: { count: number };
  [key: string]: Record<string, unknown> | undefined;
};
