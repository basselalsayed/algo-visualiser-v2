import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import en from '@/locales/en/translation.json';
export const defaultNS = 'translations';
export const resources = {
  en,
} as const;

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    defaultNS,
    detection: { order: ['navigator', 'htmlTag'] },
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ns: ['translations'],
    resources,
    supportedLngs: ['en'],
  });
