import { useCallback, useMemo } from 'react';
import { match } from 'ts-pattern';
import { create } from 'zustand';
import { useShallow } from 'zustand/react/shallow';

import {
  type IPathFindingAlgorithm,
  Maze,
  type RuntimeInfo,
  ShortestPath,
} from '@/algorithms';
import { useTour } from '@/contexts';
import { useMutation } from '@/data';
import { MazeRunState, RunState, emitCustomEvent, noOp } from '@/lib';

import { createSelectors } from './create-selectors.functoin';
import { type DispatchFunction } from './types';
import { useGrid } from './use-grid.hook';
import { useSettings } from './use-settings.hook';
import { useStats } from './use-stats.hook';

interface RunStore {
  algoInstance?: IPathFindingAlgorithm;
  dispatch: DispatchFunction<RunStore, 'dispatch'>;
  mazeRunState: MazeRunState;
  runState: RunState;
}

export const useRunStore = createSelectors(
  create<RunStore>((set) => ({
    algoInstance: undefined,
    dispatch: (key, value) => set((state) => ({ ...state, [key]: value })),
    mazeRunState: MazeRunState.idle,
    runState: RunState.idle,
  }))
);

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

  const animationSpeed = useSettings((settings) => settings.animationSpeed);

  const trigger = useMutation({ tableName: 'algo_result' });

  const { tour } = useTour();

  const onRunComplete = useCallback(
    (result: RuntimeInfo) => {
      const { addResult } = useStats.getState();
      const { dispatch } = useRunStore.getState();
      dispatch('runState', RunState.done);
      emitCustomEvent('runComplete');
      trigger([result]).catch(noOp);
      void addResult(result, !tour.isActive());
    },
    [tour, trigger]
  );

  const onRunCompleteReplay = useCallback(() => {
    const { dispatch } = useRunStore.getState();
    dispatch('runState', RunState.done);
  }, []);

  const run = useCallback(() => {
    match(runState)
      .with(RunState.idle, RunState.paused, () => {
        dispatch('runState', RunState.running);
        void algoInstance?.run(onRunComplete);
      })
      .with(RunState.running, () => {
        dispatch('runState', RunState.paused);
        algoInstance?.pause();
      })
      .with(RunState.done, async () => {
        dispatch('runState', RunState.running);
        algoInstance?.reset();
        await ShortestPath.reverse(algoInstance!.name);
        void algoInstance?.run(onRunCompleteReplay);
      });
  }, [algoInstance, dispatch, onRunComplete, onRunCompleteReplay, runState]);

  const readyToRun = useMemo(() => !!algoInstance, [algoInstance]);
  const readyToRunMaze = useMemo(
    () => runState === RunState.idle && mazeRunState !== MazeRunState.running,
    [mazeRunState, runState]
  );

  const maze = useMemo(
    () =>
      new Maze(refsMap, animationSpeed, () => {
        dispatch('mazeRunState', MazeRunState.done);
        emitCustomEvent('mazeComplete');
      }),
    [animationSpeed, dispatch, refsMap]
  );

  const reset = useCallback(() => {
    algoInstance?.pause();
    resetGrid();
    dispatch('runState', RunState.idle);
    dispatch('mazeRunState', MazeRunState.idle);
    ShortestPath.reset();
  }, [algoInstance, dispatch, resetGrid]);

  const runMaze = useCallback(() => {
    match(mazeRunState)
      .with(MazeRunState.idle, () => {
        void maze.run();
        dispatch('mazeRunState', MazeRunState.running);
      })
      .with(MazeRunState.done, () => {
        resetWalls();
        dispatch('mazeRunState', MazeRunState.running);
        void maze.run();
      });
  }, [dispatch, maze, mazeRunState, resetWalls]);

  return {
    algoRunning: runState === RunState.running,
    maze,
    mazeRunning: mazeRunState === MazeRunState.running,
    readyToRun,
    readyToRunMaze,
    reset,
    run,
    runMaze,
    runState,
  };
};

export interface isRunningReturn
  extends Pick<useRunReturn, 'algoRunning' | 'mazeRunning'> {
  anyRunning: boolean;
  idle: boolean;
}

export const useIsRunning = (): isRunningReturn => {
  const { mazeRunState, runState } = useRunStore(
    useShallow(({ mazeRunState, runState }) => ({
      mazeRunState,
      runState,
    }))
  );

  return {
    algoRunning: runState === RunState.running,
    anyRunning:
      runState === RunState.running || mazeRunState === MazeRunState.running,
    idle:
      runState !== RunState.running && mazeRunState !== MazeRunState.running,
    mazeRunning: mazeRunState === MazeRunState.running,
  };
};
