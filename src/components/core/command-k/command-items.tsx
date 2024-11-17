import {
  BrickWall,
  ChartNoAxesColumn,
  Dices,
  PauseIcon,
  PlayIcon,
  Repeat1,
} from 'lucide-react';
import { type FC, type ReactElement } from 'react';
import { match } from 'ts-pattern';

import { NodeType } from '@/components/grid';
import { CommandItem, CommandShortcut } from '@/components/ui';
import { type NodeMap, useGrid, useRun, useStats } from '@/hooks/state';
import { RUN_ALGO_KEY, RUN_MAZE_KEY, sleep } from '@/lib';

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

function randomiseWalls(refsMap: NodeMap) {
  function selectRandomQuarter<T>(arr: T[]): T[] {
    const thirdLength = Math.ceil(arr.length / 4);

    const shuffledArray = arr.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray.slice(0, thirdLength);
  }

  const _refs = selectRandomQuarter([...refsMap.values()]);

  _refs.forEach(async (node, i) => {
    await sleep(25 * i);
    node.setType(NodeType.wall);
  });
}

export const RandomiseWallsCommandItem: FC = () => {
  const { refsMap } = useGrid();

  return (
    <CommandItem onSelect={() => randomiseWalls(refsMap)}>
      <Dices />
      <span>Random walls</span>
    </CommandItem>
  );
};
