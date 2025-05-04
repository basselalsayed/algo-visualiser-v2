import { type JSX } from 'react/jsx-runtime';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib';

import * as T from './ui/tabs';

interface Props<T extends TKey> {
  className?: string;
  defaultValue: T;
  onValueChange: (v: T) => void;
  value: T;
  values: T[];
}

export const Tabs = <T extends TKey>({
  className,
  defaultValue,
  onValueChange,
  value,
  values,
}: Props<T>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <T.Tabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={(v) => onValueChange(v as T)}
    >
      <T.TabsList
        className={cn(
          'grid w-full grid-cols-2 bg_grad_accent--outline',
          className
        )}
      >
        {values.map((value) => (
          <T.TabsTrigger key={value} value={value}>
            {t(value)}
          </T.TabsTrigger>
        ))}
      </T.TabsList>
    </T.Tabs>
  );
};
