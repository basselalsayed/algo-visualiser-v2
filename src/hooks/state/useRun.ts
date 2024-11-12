import { useCallback, useEffect, useMemo } from 'react';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import { useMutation } from '@/data/hooks/useMutation';
import { type IPathFindingAlgorithm, type RuntimeInfo } from '@/lib/algorithms';
import { RecursiveDivisionMaze } from '@/lib/algorithms/recursive-division-maze';

import { type DispatchFunction } from './types';
import { useGrid } from './useGrid';
import { useSettings } from './useSettings';
import { useStats } from './useStats';

type RunState = 'idle' | 'running' | 'paused' | 'done';
type MazeRunState = Exclude<RunState, 'paused'>;

interface RunStore {
  algoInstance?: IPathFindingAlgorithm;
  dispatch: DispatchFunction<RunStore, 'dispatch'>;
  mazeRunState: MazeRunState;
  runState: RunState;
}

const useRunStore = create<RunStore>((set) => ({
  algoInstance: undefined,
  dispatch: (key, value) => set((state) => ({ ...state, [key]: value })),
  mazeRunState: 'idle',
  runState: 'idle',
}));

interface useRunReturn {
  maze: RecursiveDivisionMaze;
  readyToRun: boolean;
  readyToRunMaze: boolean;
  reset: VoidFunction;
  run: VoidFunction;
  runMaze: VoidFunction;
  runState: RunState;
}

export const useRun = (): useRunReturn => {
  const { algoInstance, dispatch, mazeRunState, runState } = useRunStore();

  const { currentAlgo } = useSettings();

  const { endNode, refsMap, resetGrid, resetWalls, startNode } = useGrid();

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

  const trigger = useMutation({ tableName: 'algo_result' });

  const onRunComplete = useCallback(
    (result: RuntimeInfo) => {
      const { addResult } = useStats.getState();
      const { dispatch } = useRunStore.getState();
      dispatch('runState', 'done');

      trigger([result]);
      addResult(result);
    },
    [trigger]
  );

  const onRunCompleteReplay = useCallback(() => {
    const { dispatch } = useRunStore.getState();
    dispatch('runState', 'done');
  }, []);

  const run = useCallback(async () => {
    switch (runState) {
      case 'idle':
      case 'paused': {
        dispatch('runState', 'running');
        algoInstance?.run(onRunComplete);
        break;
      }
      case 'running': {
        dispatch('runState', 'paused');
        algoInstance?.pause();
        break;
      }
      case 'done': {
        dispatch('runState', 'running');
        await algoInstance?.reset();
        algoInstance?.run(onRunCompleteReplay);
        break;
      }
    }
  }, [algoInstance, dispatch, onRunComplete, onRunCompleteReplay, runState]);

  const readyToRun = useMemo(() => !!algoInstance, [algoInstance]);
  const readyToRunMaze = useMemo(
    () => runState === 'idle' && mazeRunState !== 'running',
    [mazeRunState, runState]
  );

  const maze = useMemo(
    () =>
      new RecursiveDivisionMaze(refsMap, () =>
        dispatch('mazeRunState', 'done')
      ),
    [dispatch, refsMap]
  );

  const reset = useCallback(() => {
    algoInstance?.pause();
    resetGrid();
    dispatch('runState', 'idle');
    dispatch('mazeRunState', 'idle');
  }, [algoInstance, dispatch, resetGrid]);

  const runMaze = useCallback(() => {
    switch (mazeRunState) {
      case 'idle':
        maze.run();
        dispatch('mazeRunState', 'running');
        break;
      case 'running':
        break;
      case 'done':
        resetWalls();
        dispatch('mazeRunState', 'running');
        maze.run();
        break;
    }
  }, [dispatch, maze, mazeRunState, resetWalls]);

  return {
    maze,
    readyToRun,
    readyToRunMaze,
    reset,
    run,
    runMaze,
    runState,
  };
};

export const useIsRunning = (): {
  algoRunning: boolean;
  mazeRunning: boolean;
} => {
  const { mazeRunState, runState } = useRunStore(
    useShallow(({ mazeRunState, runState }) => ({
      mazeRunState,
      runState,
    }))
  );

  return {
    algoRunning: runState === 'running',
    mazeRunning: mazeRunState === 'running',
  };
};
