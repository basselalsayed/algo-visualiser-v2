import * as S from '@/components/ui/select';
import { cn } from '@/lib';

type Option<T extends string> = { label: string; value: T };

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
    <S.SelectTrigger className={cn('w-[180px]', className)}>
      <S.SelectValue placeholder={value.label} />
    </S.SelectTrigger>
    <S.SelectContent>
      {options.map((o) => (
        <S.SelectItem key={o.value} value={o.value}>
          {o.label}
        </S.SelectItem>
      ))}
    </S.SelectContent>
  </S.Select>
);
