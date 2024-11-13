import { type ComponentPropsWithoutRef, type FC } from 'react';

import { Label } from './ui/label';
import { Slider as S } from './ui/slider';

export const Slider: FC<
  ComponentPropsWithoutRef<typeof S> & { label?: string }
> = ({ label, ...rest }) => (
  <>
    {label && <Label htmlFor={rest.id}>{label}</Label>}
    <S {...rest} />
  </>
);
