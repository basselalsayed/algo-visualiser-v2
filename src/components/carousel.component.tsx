import { type ComponentPropsWithoutRef, type FC } from 'react';

import * as C from './ui/carousel';

export const Carousel: FC<ComponentPropsWithoutRef<typeof C.Carousel>> = ({
  children,
  ...rest
}) => (
  <C.Carousel {...rest}>
    <C.CarouselContent>{children}</C.CarouselContent>
  </C.Carousel>
);

const { CarouselControls, CarouselItem } = C;

export { CarouselControls, CarouselItem };
