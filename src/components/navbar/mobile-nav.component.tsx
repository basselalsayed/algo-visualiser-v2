import { Settings2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Accordian, AccordianItem } from '../accordian.component';
import { SettingsForm } from '../core/settings-form.component';

import { AlgoForm } from '../core/algo-form.component';
import { FC, useState } from 'react';

export const MobileNav: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='row-start-2'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side='bottom'
          className='h-[80vh] py-3 gap-3 overflow-y-scroll'
        >
          <ul className='grid gap-3 grid-cols-1'>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
                Choose your algorithm and change settings here
              </SheetDescription>
            </SheetHeader>

            <Accordian type={'multiple'}>
              <AccordianItem title='Algorithms'>
                <AlgoForm className='w-full' />
              </AccordianItem>

              <AccordianItem title='Settings'>
                <div className='grid gap-6 p-6 grid-cols-1'>
                  <SettingsForm />
                </div>
              </AccordianItem>
            </Accordian>
          </ul>
        </SheetContent>
        <nav className='bg-background border-t grid grid-flow-col items-center justify-items-stretch justify-between p-4'>
          <h3 className='text-left col-span-4'>Algorithm Visualiser</h3>
          <SheetTrigger asChild>
            <Button
              variant='outline'
              size='icon'
              className='shadow-lg bg-background border-1 border-primary'
            >
              <Settings2
                size='40rem'
                fill='white'
                absoluteStrokeWidth
                className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <Button className='px-5'>RUN</Button>
        </nav>
      </Sheet>
    </div>
  );
};
