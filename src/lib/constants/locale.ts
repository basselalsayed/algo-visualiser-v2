export const DEFAULT_LOCALE = 'en' as const;
export const SUPPORTED_LOCALES = [
  'ar',
  'cs',
  'de',
  'el',
  'en',
  'es',
  'fr',
  'hi',
  'it',
  'ja',
  'ko',
  'nl',
  'pl',
  'pt',
  'ru',
  'sv',
  'tr',
  'zh',
] as const;

export type T_SUPORTED_LOCALES = (typeof SUPPORTED_LOCALES)[number];
