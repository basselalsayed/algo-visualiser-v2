import { renderFragmentSnapshot } from '@/test/utils';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

describe('Accordion.component', () => {
  it('looks the same', () => {
    expect(
      renderFragmentSnapshot(
        <Accordion value='1' type='single'>
          <AccordionItem value='1'>
            <AccordionTrigger>1</AccordionTrigger>
            <AccordionContent>1</AccordionContent>
          </AccordionItem>
          <AccordionItem value='2'>
            <AccordionTrigger>2</AccordionTrigger>
            <AccordionContent>2</AccordionContent>
          </AccordionItem>
        </Accordion>
      )
    ).toMatchSnapshot();
  });
});
