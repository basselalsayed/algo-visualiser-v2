import * as React from 'react';

import { cn } from '@/lib/utils';

const Card = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) => (
  <div
    ref={ref}
    className={cn(
      'bg_grad_accent/10 border_default rounded-xl bg_grad_accent--outline bg-card text-card-foreground shadow-sm',
      className
    )}
    {...props}
  />
);
Card.displayName = 'Card';

const CardHeader = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
);
CardHeader.displayName = 'CardHeader';

const CardTitle = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'h2'>) => (
  <h2
    ref={ref}
    className={cn('leading-none font-semibold', className)}
    {...props}
  />
);
CardTitle.displayName = 'CardTitle';

const CardDescription = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'p'>) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
);
CardDescription.displayName = 'CardDescription';

const CardContent = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) => (
  <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
);
CardContent.displayName = 'CardContent';

const CardFooter = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'div'>) => (
  <div
    ref={ref}
    className={cn('flex items-center p-6 pt-0', className)}
    {...props}
  />
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
