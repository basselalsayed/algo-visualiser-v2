import { type FC, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Shepherd, {
  type Step,
  type StepOptions,
  type TourOptions,
} from 'shepherd.js';
import { useDocumentTitle } from 'usehooks-ts';

import { CommandKComponent, Grid, Navbar, StatsSheet } from '@/components';
import { useTour } from '@/contexts';
import { useKeyboardShortcuts } from '@/hooks';

import { useHandlleAlgoUpdates } from './use-handle-algo-updates.hook';
import { useHandleDarkMode } from './use-handle-dark-mode.hook';

export const App: FC = () => {
  useHandleDarkMode();
  useHandlleAlgoUpdates();

  useKeyboardShortcuts();

  const { t } = useTranslation();

  useDocumentTitle(t('appName'));

  const tour = useTour();

  useEffect(() => {
    tour.start();
  }, [tour]);

  return (
    <>
      <CommandKComponent />
      <StatsSheet />
      <main className='grid h-[100svh] w-full grid-flow-row grid-cols-[100%] grid-rows-[1fr_auto] gap-4 sm:grid-rows-[auto_1fr]'>
        <Grid />
        <Navbar />
      </main>
    </>
  );
};
