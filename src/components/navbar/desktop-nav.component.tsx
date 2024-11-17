import { type FC } from 'react';

import { AlgoForm, Kbd, MazeButton, RunButton, SettingsForm } from '..';
import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui';
import { useIsRunning } from '@/hooks/state/useRun';
import { OPEN_COMMAND_KEY } from '@/lib/constants';

import { DarkModeSwitch, ResetButton, WallSwitch } from './components';

export const DesktopNav: FC = () => {
  const { algoRunning } = useIsRunning();

  const algoSection = (
    <NavigationMenuItem>
      <NavigationMenuTrigger disabled={algoRunning}>
        Algorithms
      </NavigationMenuTrigger>

      <NavigationMenuContent className='bg-transparent'>
        <div className='flex w-[500px] content-center justify-center py-6 backdrop-blur-lg'>
          <AlgoForm className='p-0' />
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  const settingsSection = (
    <NavigationMenuItem>
      <NavigationMenuTrigger disabled={algoRunning}>
        Settings
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className='grid w-[450px] grid-cols-1 gap-6 p-6 px-14 backdrop-blur-lg'>
          <SettingsForm />
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  return (
    <>
      <NavigationMenu className='row-start-1 grid w-full max-w-full grid-flow-col items-center justify-between justify-items-stretch'>
        <h1 className='bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 bg-clip-text pr-1 text-left text-transparent'>
          Algorithm Visualiser
        </h1>
        <NavigationMenuList className='gap-3'>
          <Button>
            <Kbd primaryKey={OPEN_COMMAND_KEY} />
          </Button>
          <DarkModeSwitch />
          <WallSwitch />
          {algoSection}
          {settingsSection}
          <ResetButton />
          <MazeButton />
          <RunButton
          />
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};
