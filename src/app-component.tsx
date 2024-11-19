import { type FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDarkMode, useDocumentTitle } from 'usehooks-ts';

import { CommandKComponent, Grid, Navbar, StatsSheet } from '@/components';
import {
  useGrid,
  useKeyboardShortcuts,
  useRunStore,
  useSettings,
} from '@/hooks';

export const App: FC = () => {

  useKeyboardShortcuts();

  const { t } = useTranslation();

  useDocumentTitle(t('appName'));

  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    const rootClasses = window.document.documentElement.classList;

    rootClasses.remove('dark', 'light');

    rootClasses.add(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  const { algoInstance, dispatch } = useRunStore();

  const { currentAlgo } = useSettings();

  const { endNode, refsMap, startNode } = useGrid();

  useEffect(() => {
    algoInstance?.reset();
  }, [algoInstance, refsMap]);

  useEffect(() => {
    dispatch(
      'algoInstance',
      startNode && endNode
        ? new currentAlgo.class(refsMap, startNode, endNode)
        : undefined
    );
    dispatch('runState', 'idle');
  }, [currentAlgo.class, dispatch, endNode, refsMap, startNode]);

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
