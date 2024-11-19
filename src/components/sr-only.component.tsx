import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

export const SrOnly: FC<TProp> = ({ tKey }) => {
  const { t } = useTranslation();

  return <span className='sr-only'>{t(tKey)}</span>;
};
