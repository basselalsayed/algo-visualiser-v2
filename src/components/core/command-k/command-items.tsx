import {
  BrickWall,
  ChartNoAxesColumn,
  PauseIcon,
  PlayIcon,
  Repeat1,
} from 'lucide-react';
import { type FC, type ReactElement } from 'react';
import { match } from 'ts-pattern';

import { CommandItem, CommandShortcut } from '@/components/ui';
import { useRun, useStats } from '@/hooks/state';
import { RUN_ALGO_KEY, RUN_MAZE_KEY } from '@/lib';

export const RunCommandItem: FC = () => {
  const { readyToRun, run, runState } = useRun();

  const [icon, label] = match(runState)
    .returnType<[ReactElement, string]>()
    .with('idle', 'paused', () => [<PlayIcon />, 'Play'])
    .with('running', () => [<PauseIcon />, 'Pause'])
    .with('done', () => [<Repeat1 />, 'Replay'])
    .exhaustive();

  return (
    <CommandItem disabled={!readyToRun} onSelect={run}>
      {icon}
      <span>{label}</span>
      <CommandShortcut primaryKey={RUN_ALGO_KEY} />
    </CommandItem>
  );
};

export const MazeRunCommandItem: FC = () => {
  const { readyToRunMaze, runMaze } = useRun();

  return (
    <CommandItem disabled={!readyToRunMaze} onSelect={runMaze}>
      <BrickWall />
      <span>Build maze</span>
      <CommandShortcut primaryKey={RUN_MAZE_KEY} />
    </CommandItem>
  );
};

export const ShowStatsCommandItem: FC = () => {
  const { dispatch, statsOpen } = useStats();

  return (
    <CommandItem onSelect={() => dispatch('statsOpen', !statsOpen)}>
      <ChartNoAxesColumn />
      <span>Show previous runs</span>
      <CommandShortcut primaryKey='g' />
    </CommandItem>
  );
};
