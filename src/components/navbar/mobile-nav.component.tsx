import { Settings2 } from 'lucide-react';
import { type FC } from 'react';
import { useBoolean } from 'usehooks-ts';

import {
  Button,
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui';
import { useDeviceQueries, useIsRunning } from '@/hooks';
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
  const { toggle, value } = useBoolean(false);
  const { algoRunning, mazeRunning } = useIsRunning();

  const { isMobileLandscape } = useDeviceQueries();

  return (
    <div className='mobile-landscape:col-start-2 mobile-portrait:row-start-2'>
      <Sheet open={value} onOpenChange={toggle}>
        <SheetContent
          side='bottom'
          className='h-[80vh] gap-3 overflow-y-scroll py-3 mobile-landscape:h-full mobile-landscape:px-safe'
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
        <nav className='grad-border grid grid-flow-col items-center justify-between justify-items-stretch bg-background p-4 mobile-landscape:h-full mobile-landscape:grid-flow-row mobile-landscape:border-l-2 mobile-landscape:pr-safe mobile-portrait:border-t-2'>
          <h1 className='text-left mobile-landscape:self-start mobile-landscape:justify-self-center mobile-portrait:col-span-4'>
            AV
          </h1>
          {isMobileLandscape && <QuickSearchButton showKbd={false} />}
          <SheetTrigger asChild>
            <Button
              disabled={algoRunning || mazeRunning}
              id={HTML_IDS.buttons.sheetTrigger}
            >
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
