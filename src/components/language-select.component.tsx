import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { type T_SUPORTED_LOCALES } from '@/lib/constants';

import { Select } from './select.component';

const langs: { flag: string; label: string; value: T_SUPORTED_LOCALES }[] = [
  { flag: '🇸🇦', label: 'العربية', value: 'ar' },
  { flag: '🇨🇿', label: 'Čeština', value: 'cs' },
  { flag: '🇩🇪', label: 'Deutsch', value: 'de' },
  { flag: '🇬🇷', label: 'Ελληνικά', value: 'el' },
  { flag: '🇬🇧', label: 'English', value: 'en' },
  { flag: '🇪🇸', label: 'Español', value: 'es' },
  { flag: '🇫🇷', label: 'Français', value: 'fr' },
  { flag: '🇮🇳', label: 'हिंदी', value: 'hi' },
  { flag: '🇮🇹', label: 'Italiano', value: 'it' },
  { flag: '🇯🇵', label: '日本語', value: 'ja' },
  { flag: '🇰🇷', label: '한국어', value: 'ko' },
  { flag: '🇳🇱', label: 'Nederlands', value: 'nl' },
  { flag: '🇵🇱', label: 'Polski', value: 'pl' },
  { flag: '🇵🇹', label: 'Português', value: 'pt' },
  { flag: '🇷🇺', label: 'Русский', value: 'ru' },
  { flag: '🇸🇪', label: 'Svenska', value: 'sv' },
  { flag: '🇹🇷', label: 'Türkçe', value: 'tr' },
  { flag: '🇨🇳', label: '中文 (简体)', value: 'zh' },
];

const langOptions = langs.map(({ flag, label, value }) => ({
  label: (
    <>
      <span className='[-webkit-text-fill-color:white]'>{flag}</span> {label}
    </>
  ),
  value,
}));

export const LanguageSelect: FC = () => {
  const { i18n } = useTranslation();

  return (
    <Select
      options={langOptions}
      value={langOptions.find(({ value }) => value === i18n.language)!}
      onValueChange={(v) => void i18n.changeLanguage(v)}
    />
  );
};
