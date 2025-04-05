import { type VariantProps, cva } from 'class-variance-authority';
import { type ComponentPropsWithRef } from 'react';

import { usePlatform } from '@/hooks';
import { cn } from '@/lib';

const kbdKeyVariants = cva(
  'bg_grad_accent--outline--text rounded-lg p-2 px-3 text-3xl shadow-xs shadow-primary',
  {
    defaultVariants: {
      size: 'lg',
    },
    variants: {
      size: {
        lg: '3xl',
        md: 'text-base',
        sm: 'text-sm',
      },
    },
  }
);

interface Props
  extends ComponentPropsWithRef<'kbd'>,
    VariantProps<typeof kbdKeyVariants> {
  ctrlKey?: boolean;
  primaryKey: string;
}

export const KbdKey = ({
  className,
  ctrlKey = true,
  primaryKey,
  ref,
  size,
  ...rest
}: Props) => {
  const { ctrlKeySymbol, ctrlKeyTitle } = usePlatform();

  return (
    <kbd
      className={cn(kbdKeyVariants({ className, size }), className)}
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
