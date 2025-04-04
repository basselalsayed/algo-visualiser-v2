import { type ComponentPropsWithRef } from 'react';

import { usePlatform } from '@/hooks';
import { cn } from '@/lib';

interface Props extends ComponentPropsWithRef<'kbd'> {
  ctrlKey?: boolean;
  primaryKey: string;
}

export const Kbd = ({
  className,
  ctrlKey = true,
  primaryKey,
  ref,
  ...rest
}: Props) => {
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
};
