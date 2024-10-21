import { FC, PropsWithChildren } from 'react';
import * as C from './ui/card';

interface Props extends PropsWithChildren {
  className?: string;
  title: string;
  description?: string;
}
export const Card: FC<Props> = ({
  children,
  className,
  title,
  description,
}) => (
  <C.Card className={className}>
    <C.CardHeader>
      <C.CardTitle>{title}</C.CardTitle>
      {description && <C.CardDescription>{description}</C.CardDescription>}
    </C.CardHeader>
    <C.CardContent>{children}</C.CardContent>
  </C.Card>
);
