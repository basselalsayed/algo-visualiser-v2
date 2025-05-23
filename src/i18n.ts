/* eslint-disable import/no-named-as-default-member */
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/constants';
import algoInfo from '@/locales/en/algoInfo.json';
import tour from '@/locales/en/tour.json';
import translation from '@/locales/en/translation.json';

export { default as i18n } from 'i18next';
export const defaultNS = 'translation';

void i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: import.meta.env.DEV,
    defaultNS,
    detection: { order: ['navigator', 'htmlTag'] },
    fallbackLng: DEFAULT_LOCALE,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    ns: [defaultNS, 'algoInfo'],
    supportedLngs: SUPPORTED_LOCALES,
  });

i18n.on('languageChanged', (lang) => {
  document.documentElement.lang = lang;
  for (const el of document.querySelectorAll<HTMLElement>('[data-t-key]')) {
    el.textContent = i18n.t(el.dataset.tKey as TKey);
  }
});

export const resources = {
  en: {
    algoInfo,
    tour,
    translation,
  },
} as const;
