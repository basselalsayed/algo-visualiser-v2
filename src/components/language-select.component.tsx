import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { type T_SUPORTED_LOCALES } from '@/lib/constants';

import { Select } from './select.component';

const langs: { label: string; value: T_SUPORTED_LOCALES }[] = [
  { label: '🇸🇦 العربية', value: 'ar' },
  { label: '🇨🇿 Čeština', value: 'cs' },
  { label: '🇩🇪 Deutsch', value: 'de' },
  { label: '🇬🇷 Ελληνικά', value: 'el' },
  { label: '🇬🇧 English', value: 'en' },
  { label: '🇪🇸 Español', value: 'es' },
  { label: '🇫🇷 Français', value: 'fr' },
  { label: '🇮🇳 हिंदी', value: 'hi' },
  { label: '🇮🇹 Italiano', value: 'it' },
  { label: '🇯🇵 日本語', value: 'ja' },
  { label: '🇰🇷 한국어', value: 'ko' },
  { label: '🇳🇱 Nederlands', value: 'nl' },
  { label: '🇵🇱 Polski', value: 'pl' },
  { label: '🇵🇹 Português', value: 'pt' },
  { label: '🇷🇺 Русский', value: 'ru' },
  { label: '🇸🇪 Svenska', value: 'sv' },
  { label: '🇹🇷 Türkçe', value: 'tr' },
  { label: '🇨🇳 中文 (简体)', value: 'zh' },
];

export const LanguageSelect: FC = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      options={langs}
      value={langs.find(({ value }) => value === i18n.language)!}
      onValueChange={i18n.changeLanguage}
    />
  );
};
