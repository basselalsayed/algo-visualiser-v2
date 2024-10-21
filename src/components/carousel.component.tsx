import { ComponentPropsWithoutRef, FC } from 'react';
import * as C from './ui/carousel';
import { useDeviceQueries } from '@/hooks/ui/useDeviceQueries';

export const Carousel: FC<ComponentPropsWithoutRef<typeof C.Carousel>> = ({
  children,
  ...rest
}) => {
  const { isMobile } = useDeviceQueries();
  return (
    <C.Carousel {...rest}>
      <C.CarouselContent>{children}</C.CarouselContent>
      {!isMobile && <C.CarouselPrevious />}
      {!isMobile && <C.CarouselNext />}
    </C.Carousel>
  );
};

const { CarouselItem } = C;

export { CarouselItem };
