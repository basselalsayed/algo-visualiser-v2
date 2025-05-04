import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { useSvgGradient } from '@/hooks';
import { cn } from '@/lib';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 rounded-md text-base font-medium whitespace-nowrap transition-colors focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-9 px-4 py-2',
        icon: 'h-9 w-9',
        lg: 'h-10 rounded-md px-8 text-lg',
        sm: 'h-8 rounded-md px-3 text-xs',
      },
      variant: {
        default:
          'animate_grad bg_grad_accent--outline--text shadow-sm [--base-color:hsl(var(--background))]',
        destructive:
          'bg-destructive text-destructive-foreground shadow-xs hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline: 'animate_grad bg_grad_accent--outline--text shadow-xs',
        secondary: 'animate_grad bg_grad_accent border-0 shadow-xs',
      },
    },
  }
);

export interface ButtonProps
  extends React.ComponentPropsWithRef<'button'>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = ({
  asChild = false,
  className,
  ref,
  size,
  variant = 'default',
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  const refCb = useSvgGradient();

  return (
    <Comp
      className={cn(buttonVariants({ className, size, variant }))}
      ref={(el) => {
        if (variant === 'default') {
          refCb(el);
        }
        if (ref) {
          if (typeof ref == 'function') ref(el);
          else ref.current = el;
        }
      }}
      {...props}
    />
  );
};
Button.displayName = 'Button';

export { Button, buttonVariants };
