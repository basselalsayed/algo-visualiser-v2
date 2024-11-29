import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsRunning } from '@/hooks';
import { OPEN_COMMAND_KEY } from '@/lib/constants';

import { AlgoForm, Kbd, MazeButton, RunButton, SettingsForm } from '..';
import {
  Button,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui';

import { DarkModeSwitch, ResetButton, WallSwitch } from './components';

export const DesktopNav: FC = () => {
  const { algoRunning } = useIsRunning();
  const { t } = useTranslation();

  const algoSection = (
    <NavigationMenuItem>
      <NavigationMenuTrigger disabled={algoRunning}>
        {t('navbar.algorithms')}
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
        {t('navbar.settings')}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className='grid w-[450px] grid-cols-1 gap-6 p-6 px-14 backdrop-blur-lg'>
          <SettingsForm />
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  return (
    <NavigationMenu className='grad-border row-start-1 grid w-full max-w-full grid-flow-col items-center justify-between justify-items-stretch border-b-2 bg-background px-4 py-3'>
      <h1 className='pr-1 text-left'>{t('navbar.appName')}</h1>
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
        <RunButton />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
