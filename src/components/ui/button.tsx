import { Slot } from '@radix-ui/react-slot';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { useSvgGradient } from '@/hooks/ui/use-svg-gradient.hook';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
    variants: {
      size: {
        default: 'h-9 px-4 py-2',
        icon: 'h-9 w-9',
        lg: 'h-10 rounded-md px-8',
        sm: 'h-8 rounded-md px-3 text-xs',
      },
      variant: {
        default:
          'bg_grad_accent--outline--text [--base-color:hsl(var(--background))] animate_grad shadow',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        outline: 'shadow-sm bg_grad_accent--outline--text animate_grad',
        secondary: 'bg_grad_accent animate_grad shadow-sm border-0',
      },
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { asChild = false, className, size, variant = 'default', ...props },
    ref
  ) => {
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
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
