import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { type Entries } from 'type-fest';

import { KbdKey } from '@/components/kbd-key.component';

const navigationActionSymbols: Record<
  Exclude<TKey<'translation', 'gridNav'>, 'header'>,
  string
> = {
  navigation: '↑ → ↓ ←',
  nodeCycle: '\u{2423}',
  setNodeEnd: 'Ｅ',
  setNodeNone: 'Ｄ',
  setNodeStart: 'Ｓ',
  setNodeWall: 'Ｗ',
};

export const KeyboardControls: FC = () => {
  const { t } = useTranslation('translation');

  return (
    <ul className='grid grid-flow-row gap-2'>
      <h2>{t('gridNav.header')}</h2>
      {(
        Object.entries(navigationActionSymbols) as Entries<
          typeof navigationActionSymbols
        >
      ).map(([info, key]) => (
        <li
          key={info}
          className='flex items-center gap-1 text-lg text-muted-foreground'
        >
          <KbdKey primaryKey={key} ctrlKey={false} /> - {t(`gridNav.${info}`)}
        </li>
      ))}
    </ul>
  );
};
