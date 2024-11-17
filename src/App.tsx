import './App.css';

import { MotionConfig } from 'framer-motion';
import { useEffect } from 'react';
import { MathJaxProvider } from 'react-hook-mathjax';
import { useDarkMode } from 'usehooks-ts';

import { CommandKComponent, Grid, Navbar, StatsSheet } from '@/components';
import {
  useGrid,
  useKeyboardShortcuts,
  useRunStore,
  useSettings,
} from '@/hooks';

function App() {
  useKeyboardShortcuts();

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
    <MotionConfig reducedMotion='always'>
      <MathJaxProvider
        options={{
          options: { enableMenu: false },
        }}
      />
      <CommandKComponent />
      <StatsSheet />
      <main className='grid w-full grid-flow-row grid-cols-[100%] grid-rows-[91svh_1fr] gap-4 p-4 sm:grid-rows-[1fr_91svh]'>
      <Grid />
      <Navbar />
    </main>
    </MotionConfig>
  );
}

export default App;
