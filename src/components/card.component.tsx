import { type FC, type PropsWithChildren, type ReactElement } from 'react';

import { typeIs } from '@/lib';

import * as C from './ui/card';

interface Props extends PropsWithChildren {
  className?: string;
  contentClassName?: string;
  description?: string;
  title: string | ReactElement;
}
export const Card: FC<Props> = ({
  children,
  className,
  contentClassName,
  description,
  title,
}) => (
  <C.Card className={className}>
    <C.CardHeader>
      {typeIs(title, 'string') ? <C.CardTitle>{title}</C.CardTitle> : title}
      {description && <C.CardDescription>{description}</C.CardDescription>}
    </C.CardHeader>
    <C.CardContent className={contentClassName}>{children}</C.CardContent>
  </C.Card>
);
