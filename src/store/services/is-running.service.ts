import { MazeRunState, RunState } from '@/lib';

import { type isRunningReturn, useRunStore } from '../use-run.hook';

export function isRunning(): isRunningReturn {
  const { mazeRunState, runState } = useRunStore.getState();

  return {
    algoRunning: runState === RunState.running,
    anyRunning:
      runState === RunState.running || mazeRunState === MazeRunState.running,
    idle:
      runState !== RunState.running && mazeRunState !== MazeRunState.running,
    mazeRunning: mazeRunState === MazeRunState.running,
  };
}
