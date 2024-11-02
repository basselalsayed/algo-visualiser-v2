import { FC, PropsWithChildren } from 'react';
import * as C from './ui/card';
import { cn } from '@/lib/utils';

interface Props extends PropsWithChildren {
  className?: string;
  contentClassName?: string;
  title: string;
  description?: string;
}
export const Card: FC<Props> = ({
  children,
  className,
  contentClassName,
  title,
  description,
}) => (
  <C.Card className={cn('opacity-70', className)}>
    <C.CardHeader>
      <C.CardTitle>{title}</C.CardTitle>
      {description && <C.CardDescription>{description}</C.CardDescription>}
    </C.CardHeader>
    <C.CardContent className={contentClassName}>{children}</C.CardContent>
  </C.Card>
);
