import { useCallback, useMemo } from 'react';
import { match } from 'ts-pattern';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import { useTour } from '@/contexts';
import { useMutation } from '@/data/hooks/use-mutation.hook';
import { eventEmitter } from '@/lib';
import { type IPathFindingAlgorithm, type RuntimeInfo } from '@/lib/algorithms';
import { Maze, ShortestPath } from '@/lib/algorithms';

import { type DispatchFunction } from './types';
import { useGrid } from './use-grid.hook';
import { useStats } from './use-stats.hook';

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
  maze: Maze;
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

  const { tour } = useTour();

  const onRunComplete = useCallback(
    (result: RuntimeInfo) => {
      const { addResult } = useStats.getState();
      const { dispatch } = useRunStore.getState();
      dispatch('runState', 'done');
      eventEmitter.emit('runComplete');
      trigger([result]);
      addResult(result, !tour.isActive());
    },
    [tour, trigger]
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
      new Maze(refsMap, () => {
        dispatch('mazeRunState', 'done');
        eventEmitter.emit('mazeComplete');
      }),
    [dispatch, refsMap]
  );

  const reset = useCallback(() => {
    algoInstance?.pause();
    resetGrid();
    dispatch('runState', 'idle');
    dispatch('mazeRunState', 'idle');
    ShortestPath.reset();
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
