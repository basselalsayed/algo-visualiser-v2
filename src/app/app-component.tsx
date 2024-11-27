import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';

import { CommandKComponent, Grid, Navbar, StatsSheet } from '@/components';
import { useKeyboardShortcuts } from '@/hooks';

import { useHandlleAlgoUpdates } from './use-handle-algo-updates.hook';
import { useHandleDarkMode } from './use-handle-dark-mode.hook';

export const App: FC = () => {
  useHandleDarkMode();
  useHandlleAlgoUpdates();

  useKeyboardShortcuts();

  const { t } = useTranslation();

  useDocumentTitle(t('appName'));

  return (
    <>
      <CommandKComponent />
      <StatsSheet />
      <main className='grid w-full grid-flow-row grid-cols-[100%] grid-rows-[91svh_1fr] gap-4 p-4 sm:grid-rows-[1fr_91svh]'>
        <Grid />
        <Navbar />
      </main>
    </>
  );
};
