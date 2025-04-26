import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { useIsRunning } from '@/hooks';
import { HTML_IDS } from '@/lib';

import { AlgoForm, MazeButton, RunButton, SettingsForm } from '..';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '../ui';

import {
  DarkModeSwitch,
  QuickSearchButton,
  ResetButton,
  WallSwitch,
} from './components';

export const DesktopNav: FC = () => {
  const { algoRunning, mazeRunning } = useIsRunning();
  const { t } = useTranslation();

  return (
    <NavigationMenu className='grad-border bg-background row-start-1 grid w-full max-w-full grid-flow-col items-center justify-between justify-items-stretch border-b-2 px-4 py-3'>
      <h1 className='pr-1 text-left'>{t('navbar.appName')}</h1>
      <NavigationMenuList className='gap-3'>
        <QuickSearchButton />
        <DarkModeSwitch />
        <WallSwitch />

        <NavigationMenuItem>
          <NavigationMenuTrigger
            disabled={algoRunning}
            id={HTML_IDS.buttons.algoFormTrigger}
          >
            {t('navbar.algorithms')}
          </NavigationMenuTrigger>

          <NavigationMenuContent className='bg-transparent'>
            <div className='flex w-[500px] content-center justify-center py-6'>
              <AlgoForm className='p-0' />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger
            disabled={algoRunning || mazeRunning}
            id={HTML_IDS.buttons.settingsTrigger}
          >
            {t('navbar.settings')}
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className='w-[450px] p-6 px-14'>
              <SettingsForm />
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <ResetButton />
        <MazeButton />
        <RunButton />
      </NavigationMenuList>
    </NavigationMenu>
  );
};
