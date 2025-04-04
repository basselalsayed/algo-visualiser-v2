import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Button } from './button';

const Checkbox = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<typeof CheckboxPrimitive.Root>) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm p-2 shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    asChild
    {...props}
  >
    <Button>
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <CheckIcon className='h-4 w-4' />
      </CheckboxPrimitive.Indicator>
    </Button>
  </CheckboxPrimitive.Root>
);
Checkbox.displayName = CheckboxPrimitive.Root.displayName;

export { Checkbox };
