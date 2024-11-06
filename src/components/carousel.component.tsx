import { ComponentPropsWithoutRef, FC } from 'react';
import * as C from './ui/carousel';

export const Carousel: FC<ComponentPropsWithoutRef<typeof C.Carousel>> = ({
  children,
  ...rest
}) => (
  <C.Carousel {...rest}>
    <C.CarouselContent>{children}</C.CarouselContent>
  </C.Carousel>
);

const { CarouselItem, CarouselControls } = C;

export { CarouselItem, CarouselControls };
