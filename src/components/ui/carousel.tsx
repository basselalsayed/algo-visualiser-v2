import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from 'embla-carousel-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type CarouselApi = UseEmblaCarouselType[1];
type UseCarouselParameters = Parameters<typeof useEmblaCarousel>;
export type CarouselOptions = UseCarouselParameters[0];
type CarouselPlugin = UseCarouselParameters[1];

type CarouselProps = {
  onItemSelect?: (api: CarouselApi) => void;
  opts?: CarouselOptions;
  orientation?: 'horizontal' | 'vertical';
  plugins?: CarouselPlugin;
  setApi?: (api: CarouselApi) => void;
};

type CarouselContextProps = {
  api: ReturnType<typeof useEmblaCarousel>[1];
  canScrollNext: boolean;
  canScrollPrev: boolean;
  carouselRef: ReturnType<typeof useEmblaCarousel>[0];
  scrollNext: () => void;
  scrollPrev: () => void;
} & CarouselProps;

const CarouselContext = React.createContext<CarouselContextProps | null>(null);

function useCarousel() {
  const context = React.useContext(CarouselContext);

  if (!context) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return context;
}

const Carousel = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & CarouselProps
>(
  (
    {
      children,
      className,
      onItemSelect,
      opts,
      orientation = 'horizontal',
      plugins,
      setApi,
      ...props
    },
    ref
  ) => {
    const [carouselRef, api] = useEmblaCarousel(
      {
        ...opts,
        axis: orientation === 'horizontal' ? 'x' : 'y',
      },
      plugins
    );
    const [canScrollPrev, setCanScrollPrev] = React.useState(false);
    const [canScrollNext, setCanScrollNext] = React.useState(false);

    const onSelect = React.useCallback((api: CarouselApi) => {
      if (!api) {
        return;
      }
      onItemSelect?.(api);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    }, []);

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
      <CarouselContext.Provider
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
      </CarouselContext.Provider>
    );
  }
);
Carousel.displayName = 'Carousel';

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
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
});
CarouselContent.displayName = 'CarouselContent';

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
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
});
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

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, size = 'icon', variant = 'outline', ...props }, ref) => {
  const { canScrollPrev, orientation, scrollPrev } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
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
      <span className='sr-only'>Previous slide</span>
    </Button>
  );
});
CarouselPrevious.displayName = 'CarouselPrevious';

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<typeof Button>
>(({ className, size = 'icon', variant = 'outline', ...props }, ref) => {
  const { canScrollNext, orientation, scrollNext } = useCarousel();

  return (
    <Button
      ref={ref}
      variant={variant}
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
      <span className='sr-only'>Next slide</span>
    </Button>
  );
});
CarouselNext.displayName = 'CarouselNext';

const CarouselDotButtons = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { buttonClassName?: string }
>(({ buttonClassName, className, ...rest }, ref) => {
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
          className={(index === selectedIndex ? 'bg-transparent' : '').concat(
            buttonClassName ?? ''
          )}
        />
      ))}
    </div>
  );
});
CarouselDotButtons.displayName = 'CarouselDotButtons';

export const DotButton = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...rest }, ref) => (
  <Button
    ref={ref}
    type='button'
    variant='outline'
    className={cn(
      'h-6 w-6 rounded-full border border-primary-foreground p-0',
      className
    )}
    {...rest}
  />
));
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
