import { type HTMLAttributes, forwardRef } from 'react';

import { usePlatform } from '@/hooks';
import { cn } from '@/lib';

interface Props extends HTMLAttributes<HTMLElement> {
  ctrlKey?: boolean;
  primaryKey: string;
}

export const Kbd = forwardRef<HTMLElement, Props>(
  ({ className, ctrlKey = true, primaryKey, ...rest }, ref) => {
    const { ctrlKeySymbol, ctrlKeyTitle } = usePlatform();

    return (
      <kbd
        className={cn('font-sans tracking-widest', className)}
        ref={ref}
        {...rest}
      >
        {ctrlKey && (
          <abbr title={ctrlKeyTitle} className='no-underline'>
            {ctrlKeySymbol}
          </abbr>
        )}
        {primaryKey.toUpperCase()}
      </kbd>
    );
  }
);
