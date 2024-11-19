import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocalStorage } from 'usehooks-ts';

import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type T_SUPORTED_LOCALES,
} from '@/lib/constants';

export const useLocale = () => {
  const [lang, setLang] = useLocalStorage<T_SUPORTED_LOCALES | undefined>(
    'lang',
    undefined
  );

  useEffect(() => {
    const { navigator } = window;
    if (navigator) {
      const { language, languages, userLanguage } = navigator as Navigator & {
        userLanguage?: string;
      };

      const navigatorLocale = language || userLanguage || languages?.[0];
      const detectedLocale = navigatorLocale?.split('-')[0];

      setLang(
        SUPPORTED_LOCALES.includes(detectedLocale as T_SUPORTED_LOCALES)
          ? (detectedLocale as T_SUPORTED_LOCALES)
          : DEFAULT_LOCALE
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { i18n } = useTranslation();

  useEffect(() => {
    if (lang) {
      document.documentElement.lang = lang;
      i18n.changeLanguage(lang);
    }
  }, [i18n, lang]);

  return setLang;
};
