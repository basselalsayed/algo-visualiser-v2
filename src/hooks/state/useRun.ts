import { useCallback, useMemo } from 'react';
import { match } from 'ts-pattern';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import { useMutation } from '@/data/hooks/useMutation';
import { type IPathFindingAlgorithm, type RuntimeInfo } from '@/lib/algorithms';
import { RecursiveDivisionMaze } from '@/lib/algorithms/recursive-division-maze';

import { type DispatchFunction } from './types';
import { useGrid } from './useGrid';
import { useStats } from './useStats';

type RunState = 'idle' | 'running' | 'paused' | 'done';
type MazeRunState = Exclude<RunState, 'paused'>;

interface RunStore {
  algoInstance?: IPathFindingAlgorithm;
  dispatch: DispatchFunction<RunStore, 'dispatch'>;
  mazeRunState: MazeRunState;
  runState: RunState;
}

export const useRunStore = create<RunStore>((set) => ({
  algoInstance: undefined,
  dispatch: (key, value) => set((state) => ({ ...state, [key]: value })),
  mazeRunState: 'idle',
  runState: 'idle',
}));

interface useRunReturn {
  algoRunning: boolean;
  maze: RecursiveDivisionMaze;
  mazeRunning: boolean;
  readyToRun: boolean;
  readyToRunMaze: boolean;
  reset: VoidFunction;
  run: VoidFunction;
  runMaze: VoidFunction;
  runState: RunState;
}

export const useRun = (): useRunReturn => {
  const { algoInstance, dispatch, mazeRunState, runState } = useRunStore();

  const { refsMap, resetGrid, resetWalls } = useGrid();

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

  const run = useCallback(() => {
    match(runState)
      .with('idle', 'paused', () => {
        dispatch('runState', 'running');
        algoInstance?.run(onRunComplete);
      })
      .with('running', () => {
        dispatch('runState', 'paused');
        algoInstance?.pause();
      })
      .with('done', async () => {
        dispatch('runState', 'running');
        await algoInstance?.reset();
        algoInstance?.run(onRunCompleteReplay);
      });
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
      match(mazeRunState)
        .with('idle', () => {
        maze.run();
        dispatch('mazeRunState', 'running');
        })
        .with('done', () => {
        resetWalls();
        dispatch('mazeRunState', 'running');
        maze.run();
      });
  }, [dispatch, maze, mazeRunState, resetWalls]);

  return {
    algoRunning: runState === 'running',
    maze,
    mazeRunning: mazeRunState === 'running',
    readyToRun,
    readyToRunMaze,
    reset,
    run,
    runMaze,
    runState,
  };
};

export const useIsRunning = (): Pick<
  useRunReturn,
  'algoRunning' | 'mazeRunning'
> => {
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
