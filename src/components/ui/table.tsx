import * as React from 'react';

import { cn } from '@/lib/utils';

const Table = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'table'>) => (
  <table
    ref={ref}
    className={cn('w-full caption-bottom text-sm', className)}
    {...props}
  />
);
Table.displayName = 'Table';

const TableHeader = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'thead'>) => (
  <thead ref={ref} className={cn('[&_tr]:border-b', className)} {...props} />
);
TableHeader.displayName = 'TableHeader';

const TableBody = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'tbody'>) => (
  <tbody
    ref={ref}
    className={cn('[&_tr:last-child]:border-0', className)}
    {...props}
  />
);
TableBody.displayName = 'TableBody';

const TableFooter = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'tfoot'>) => (
  <tfoot
    ref={ref}
    className={cn(
      'bg-muted/50 border-t font-medium last:[&>tr]:border-b-0',
      className
    )}
    {...props}
  />
);
TableFooter.displayName = 'TableFooter';

const TableRow = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'tr'>) => (
  <tr
    ref={ref}
    className={cn(
      'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
      className
    )}
    {...props}
  />
);
TableRow.displayName = 'TableRow';

const TableHead = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'th'>) => (
  <th
    ref={ref}
    className={cn(
      'text-grad-accent-mix h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
);
TableHead.displayName = 'TableHead';

const TableCell = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'td'>) => (
  <td
    ref={ref}
    className={cn(
      'p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]',
      className
    )}
    {...props}
  />
);
TableCell.displayName = 'TableCell';

const TableCaption = ({
  className,
  ref,
  ...props
}: React.ComponentPropsWithRef<'caption'>) => (
  <caption
    ref={ref}
    className={cn('text-muted-foreground mt-4 text-sm', className)}
    {...props}
  />
);
TableCaption.displayName = 'TableCaption';

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
