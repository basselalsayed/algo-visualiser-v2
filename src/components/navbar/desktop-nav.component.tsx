import { FC, forwardRef } from 'react';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';
import { AlgoForm } from '@/components/core/algo-form.component';
import { SettingsForm } from '../core/settings-form.component';

export const DesktopNav: FC = () => {
  const { refs } = useGrid();

  const algoSection = (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Algorithms</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className='py-6 w-[450px] flex justify-center content-center'>
          <AlgoForm />
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  const settingsSection = (
    <NavigationMenuItem>
      <NavigationMenuTrigger>Settings</NavigationMenuTrigger>
      <NavigationMenuContent>
        <div className='grid gap-6 p-6 px-14 grid-cols-1 w-[450px]'>
          <SettingsForm />
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );

  return (
    <>
      <NavigationMenu className='w-full max-w-full row-start-1 grid grid-flow-col items-center justify-items-stretch justify-between p-4'>
        <h3 className='text-left'>Algorithm Visualiser</h3>
        <NavigationMenuList className='gap-3'>
          {algoSection}
          {settingsSection}
          <Button
            className='px-5'
          >
            RUN
          </Button>
        </NavigationMenuList>
      </NavigationMenu>
    </>
  );
};

