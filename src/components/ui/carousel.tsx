import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import * as React from 'react';

import { SrOnly } from '@/components/sr-only.component';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

interface CarouselProps extends React.ComponentPropsWithRef<'div'> {
  onItemSelect?: (api: CarouselApi) => void;
  opts?: CarouselOptions;
  orientation?: 'horizontal' | 'vertical';
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
}

type CarouselContextProps = {
  api: ReturnType<typeof useEmblaCarousel>[1];
  canScrollNext: boolean;
  canScrollPrev: boolean;
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | undefined>(
  undefined
);

function useCarousel() {
  const context = React.use(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel: React.FC<CarouselProps> = ({
  children,
  className,
  onItemSelect,
  opts,
  orientation = 'horizontal',
  plugins,
  ref,
  setApi,
  ...props
}) => {
  const [carouselRef, api] = useEmblaCarousel(
    {
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    },
    plugins
  );
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  const onSelect = React.useCallback(
    (api: CarouselApi) => {
      if (!api) {
        return;
      }
      onItemSelect?.(api);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    },
    [onItemSelect]
  );

  const scrollPrev = React.useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const scrollNext = React.useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        scrollNext();
      }
    },
    [scrollPrev, scrollNext]
  );

  React.useEffect(() => {
    if (!api || !setApi) {
      return;
    }

    setApi(api);
  }, [api, setApi]);

  React.useEffect(() => {
    if (!api) {
      return;
    }

    onSelect(api);
    api.on('reInit', onSelect);
    api.on('select', onSelect);

    return () => {
      api?.off('select', onSelect);
    };
  }, [api, onSelect]);

  return (
    <CarouselContext
      value={{
        api: api,
        canScrollNext,
        canScrollPrev,
        carouselRef,
        opts,
        orientation:
          orientation || (opts?.axis === 'y' ? 'vertical' : 'horizontal'),
        scrollNext,
        scrollPrev,
      }}
    >
      <div
        ref={ref}
        onKeyDownCapture={handleKeyDown}
        className={cn('relative', className)}
        role='region'
        aria-roledescription='carousel'
        {...props}
      >
        {children}
      </div>
    </CarouselContext>
  );
};
Carousel.displayName = 'Carousel';

const CarouselContent = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) => {
  const { carouselRef, orientation } = useCarousel();

  return (
    <div ref={carouselRef} className='space-y-4 overflow-hidden'>
      <div
        ref={ref}
        className={cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          className
        )}
        {...props}
      />
      <CarouselControls />
    </div>
  );
};
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) => {
  const { orientation } = useCarousel();

  return (
    <div
      ref={ref}
      role='group'
      aria-roledescription='slide'
      className={cn(
        'min-w-0 shrink-0 grow-0 basis-full',
        orientation === 'horizontal' ? 'pl-4' : 'pt-4',
        className
      )}
      {...props}
    />
  );
};
CarouselItem.displayName = 'CarouselItem';

const CarouselControls: React.FC = () => (
  <div className='flex items-center justify-between'>
    <div className='space-x-2'>
      <CarouselPrevious />
      <CarouselNext />
    </div>
    <CarouselDotButtons />
  </div>
);

const CarouselPrevious = ({
  className,
  ref,
  size = 'icon',
  ...props
}: React.ComponentPropsWithRef<typeof Button>) => {
  const { canScrollPrev, orientation, scrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      size={size}
      className={cn(
        'h-8 w-8 rounded-full',
        orientation === 'vertical' && 'rotate-90',
        className
      )}
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon className='h-4 w-4' />
      <SrOnly tKey='sr.prevSlide' />
    </Button>
  );
};
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = ({
  className,
  ref,
  size = 'icon',
  ...props
}: React.ComponentPropsWithRef<typeof Button>) => {
  const { canScrollNext, orientation, scrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      size={size}
      className={cn(
        'h-8 w-8 rounded-full',
        orientation === 'vertical' && 'rotate-90',
        className
      )}
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon className='h-4 w-4' />
      <SrOnly tKey='sr.nextSlide' />
    </Button>
  );
};
CarouselNext.displayName = 'CarouselNext';

const CarouselDotButtons = ({
  buttonClassName,
  className,
  ref,
  ...rest
}: React.ComponentPropsWithRef<'div'> & { buttonClassName?: string }) => {
  const { api } = useCarousel();
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [scrollSnaps, setScrollSnaps] = React.useState<number[]>([]);

  const onDotButtonClick = React.useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  const onInit = React.useCallback((api: CarouselApi) => {
    if (api) setScrollSnaps(api.scrollSnapList());
  }, []);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (api) setSelectedIndex(api.selectedScrollSnap());
  }, []);

  React.useEffect(() => {
    if (!api) return;

    onInit(api);
    onSelect(api);
    api.on('reInit', onInit).on('reInit', onSelect).on('select', onSelect);
  }, [api, onInit, onSelect]);

  return (
    <div
      ref={ref}
      className={cn('flex justify-center gap-x-2', className)}
      {...rest}
    >
      {scrollSnaps.map((_, index) => (
        <DotButton
          key={index}
          onClick={() => onDotButtonClick(index)}
          className={cn(
            'transition-[border-width]',
            index === selectedIndex && 'border-4!',
            buttonClassName
          )}
        />
      ))}
    </div>
  );
};
CarouselDotButtons.displayName = 'CarouselDotButtons';

export const DotButton = ({
  className,
  ref,
  ...rest
}: React.ComponentPropsWithRef<typeof Button>) => (
  <Button
    ref={ref}
    type='button'
    className={cn('h-6 w-6 rounded-full p-0', className)}
    {...rest}
  />
);
DotButton.displayName = 'DotButton';

export {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselControls,
  CarouselDotButtons,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
};
