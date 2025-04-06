import { Settings2 } from 'lucide-react';
import { type FC, useState } from 'react';

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { useIsRunning } from '@/hooks';
import { HTML_IDS } from '@/lib';

import { Accordian, AccordianItem, AlgoForm, SettingsForm, SrOnly } from '..';

import {
  DarkModeSwitch,
  MazeButton,
  QuickSearchButton,
  ResetButton,
  RunButton,
  WallSwitch,
} from './components';

export const MobileNav: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { algoRunning } = useIsRunning();

  return (
    <div className='row-start-2'>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent
          side='bottom'
          className='h-[80vh] gap-3 overflow-y-scroll py-3'
        >
          <ul className='grid grid-cols-1 gap-3'>
            <SheetHeader>
              <SheetTitle>Settings</SheetTitle>
              <SheetDescription>
                Choose your algorithm and change settings here
              </SheetDescription>
            </SheetHeader>

            <QuickSearchButton />

            <DarkModeSwitch />

            <Accordian type={'multiple'}>
              <AccordianItem title='Algorithms'>
                <AlgoForm className='w-full' />
              </AccordianItem>

              <AccordianItem title='Settings'>
                <div className='grid grid-cols-1 gap-6 p-6'>
                  <SettingsForm />
                </div>
              </AccordianItem>
              <AccordianItem title='Controls'>
                <div className='grid grid-cols-1 gap-6 p-6'>
                  <WallSwitch />
                </div>
              </AccordianItem>
            </Accordian>
          </ul>
        </SheetContent>
        <nav className='grad-border bg-background grid grid-flow-col items-center justify-between justify-items-stretch border-t-2 p-4'>
          <h1 className='col-span-4 text-left'>AV</h1>
          <SheetTrigger asChild>
            <Button disabled={algoRunning} id={HTML_IDS.buttons.sheetTrigger}>
              <Settings2 absoluteStrokeWidth />
              <SrOnly tKey='sr.toggleMenu' />
            </Button>
          </SheetTrigger>
          <ResetButton />
          <MazeButton />
          <RunButton />
        </nav>
      </Sheet>
    </div>
  );
};
