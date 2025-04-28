import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDocumentTitle } from 'usehooks-ts';

import {
  CommandKComponent,
  Grid,
  Navbar,
  PerformanceAlertDialog,
  ShortestPathContainer,
  StatsSheet,
} from '@/components';
import { useKeyboardShortcuts } from '@/hooks';

import { useHandlleAlgoUpdates } from './use-handle-algo-updates.hook';
import { useHandleDarkMode } from './use-handle-dark-mode.hook';
import { useHandleTour } from './use-handle-tour.hook';

export const App: FC = () => {
  useHandleDarkMode();
  useHandlleAlgoUpdates();
  useHandleTour();
  useKeyboardShortcuts();

  const { t } = useTranslation();

  useDocumentTitle(t('appName'));

  return (
    <>
      <CommandKComponent />
      <StatsSheet />
      <main className='grid h-[100svh] w-full grid-flow-row grid-cols-[100%] grid-rows-[1fr_auto] gap-4 sm:grid-rows-[auto_1fr] mobile-landscape:grid-cols-[1fr_auto] mobile-landscape:grid-rows-[100%]'>
        <Grid />
        <Navbar />
      </main>
      <ShortestPathContainer />
      <PerformanceAlertDialog />
    </>
  );
};
