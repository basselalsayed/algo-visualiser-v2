import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib';

const Slider = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof SliderPrimitive.Root>) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      'relative flex w-full touch-none items-center select-none',
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className='bg_grad_accent/20 relative h-1.5 w-full grow overflow-hidden rounded-full'>
      <SliderPrimitive.Range className='absolute h-full grad-accent' />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className='block h-4 w-4 rounded-full border border-grad-accent-mix bg-background shadow-sm transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50' />
  </SliderPrimitive.Root>
);
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
