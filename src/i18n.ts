import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/constants';
import algoInfo from '@/locales/en/algoInfo.json';
import translation from '@/locales/en/translation.json';

export const defaultNS = 'translation';
export const resources = {
  en: {
    algoInfo,
    translation,
  },
} as const;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    defaultNS,
    detection: { order: ['navigator', 'htmlTag'] },
    fallbackLng: DEFAULT_LOCALE,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ns: [defaultNS, 'algoInfo'],
    supportedLngs: SUPPORTED_LOCALES,
  });
