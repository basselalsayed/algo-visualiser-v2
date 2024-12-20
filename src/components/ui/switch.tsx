import * as SwitchPrimitives from '@radix-ui/react-switch';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const switchVariants = cva(
  'bg_grad_accent--outline animate_grad peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
  {
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'h-5 w-9',
        icon: 'h-7 w-14',
      },
    },
  }
);

const thumbVariants = cva(
  'pointer-events-none flex items-center justify-center rounded-full bg-background shadow-lg ring-0 transition-transform',
  {
    compoundVariants: [
      {
        className:
          'data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        variant: 'default',
      },
      {
        className:
          'data-[state=checked]:translate-x-7 data-[state=unchecked]:translate-x-0',
        variant: 'icon',
      },
    ],
    defaultVariants: {
      variant: 'default',
    },
    variants: {
      variant: {
        default: 'h-4 w-4',
        icon: 'h-6 w-6',
      },
    },
  }
);

interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>,
    VariantProps<typeof switchVariants> {
  thumbChildren?: React.ReactElement;
}
const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  SwitchProps
>(({ className, thumbChildren, variant, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      switchVariants({
        className,
        variant,
      })
    )}
    {...props}
    ref={ref}
    dir='ltr'
  >
    <SwitchPrimitives.Thumb className={cn(thumbVariants({ variant }))}>
      {thumbChildren}
    </SwitchPrimitives.Thumb>
  </SwitchPrimitives.Root>
));
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
