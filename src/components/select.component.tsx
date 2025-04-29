import { type ReactElement } from 'react';

import * as S from '@/components/ui/select';
import { cn } from '@/lib';

interface Option<T extends string> {
  label: string | ReactElement;
  value: T;
}

interface Props<T extends string> {
  className?: string;
  onValueChange: (value: T) => void;
  options: Option<T>[];
  value: Option<T>;
}

export const Select = <T extends string>({
  className,
  onValueChange,
  options,
  value,
}: Props<T>) => (
  <S.Select onValueChange={onValueChange} value={value.value}>
    <S.SelectTrigger className={cn('w-6/12 [&_span]:pe-1', className)}>
      <S.SelectValue placeholder={value.label} />
    </S.SelectTrigger>
    <S.SelectContent className='z-[99999] bg_grad_accent--outline'>
      {options.map((o) => (
        <S.SelectItem key={o.value} value={o.value}>
          {o.label}
        </S.SelectItem>
      ))}
    </S.SelectContent>
  </S.Select>
);
