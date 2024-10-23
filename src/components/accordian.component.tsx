import { FC, PropsWithChildren, ReactElement } from 'react';

import * as A from './ui/accordion';

interface Props extends PropsWithChildren {
  type: 'single' | 'multiple';
}

export const Accordian: FC<Props> = ({ children, type }) => (
  <A.Accordion type={type}>{children}</A.Accordion>
);

export const AccordianItem: FC<{ title: string; children: ReactElement }> = ({
  title,
  children,
}) => (
  <A.AccordionItem value={title}>
    <A.AccordionTrigger>{title}</A.AccordionTrigger>
    <A.AccordionContent>{children}</A.AccordionContent>
  </A.AccordionItem>
);
