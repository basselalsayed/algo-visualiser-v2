import { capitaliseFirstLetter } from '@/data/transformers/strings/capitaliseFirstLetter';
import { cn } from '@/lib/utils';

import * as T from './ui/tabs';

interface Props<T extends string> {
  className?: string;
  defaultValue: T;
  onValueChange: (v: T) => void;
  value: T;
  values: T[];
}

export const Tabs = <T extends string>({
  className,
  defaultValue,
  onValueChange,
  value,
  values,
}: Props<T>): JSX.Element => (
  <T.Tabs
    defaultValue={defaultValue}
    value={value}
    onValueChange={(v) => onValueChange(v as T)}
  >
    <T.TabsList className={cn('grid w-full grid-cols-2', className)}>
      {values.map((value) => (
        <T.TabsTrigger key={value} value={value}>
          {capitaliseFirstLetter(value)}
        </T.TabsTrigger>
      ))}
    </T.TabsList>
  </T.Tabs>
);
