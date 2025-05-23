import {
  BrickWall,
  ChartNoAxesColumn,
  Dices,
  Fence,
  Github,
  Map,
  PauseIcon,
  PlayIcon,
  Repeat1,
  RotateCcw,
} from 'lucide-react';
import { type ComponentProps, type FC, type ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';

import { CommandItem, CommandShortcut } from '@/components/ui/command';
import { useTour } from '@/contexts';
import { useDarkMode } from '@/hooks';
import { LINKS, NodeType, RUN_ALGO_KEY, RUN_MAZE_KEY, RunState } from '@/lib';
import { useCommand, useGrid, useRun, useStats } from '@/store';

interface Props extends ComponentProps<typeof CommandItem> {
  closeOnSelect?: boolean;
  icon: ReactElement;
  shortcut?: string;
  tKey?: TKey;
}

export const CommandKItem: FC<Props> = ({
  children,
  closeOnSelect = false,
  icon,
  onSelect,
  ref,
  shortcut,
  tKey,
  ...props
}) => {
  const dispatch = useCommand.use.dispatch();

  const { t } = useTranslation();

  return (
    <CommandItem
      {...props}
      ref={ref}
      onSelect={(v) => {
        onSelect?.(v);
        if (closeOnSelect) {
          dispatch('open', false);
        }
      }}
    >
      {icon}
      {tKey && <span>{t(tKey)}</span>}
      {children && children}
      {shortcut && <CommandShortcut primaryKey={shortcut} />}
    </CommandItem>
  );
};

// Actions
export const RunCommandItem: FC = () => {
  const { algoRunning, readyToRun, run, runState } = useRun();

  /*  eslint-disable react/jsx-key */
  const [icon, tKey] = match(runState)
    .returnType<[ReactElement, TKey]>()
    .with(RunState.idle, RunState.paused, () => [<PlayIcon />, 'commandk.play'])
    .with(RunState.running, () => [<PauseIcon />, 'commandk.pause'])
    .with(RunState.done, () => [<Repeat1 />, 'commandk.replay'])
    .exhaustive();
  /*  eslint-enable react/jsx-key */

  return (
    <CommandKItem
      disabled={!readyToRun}
      onSelect={run}
      shortcut={RUN_ALGO_KEY}
      icon={icon}
      closeOnSelect={!algoRunning}
      tKey={tKey}
    />
  );
};

export const MazeRunCommandItem: FC = () => {
  const { readyToRunMaze, runMaze } = useRun();

  return (
    <CommandKItem
      disabled={!readyToRunMaze}
      onSelect={runMaze}
      shortcut={RUN_MAZE_KEY}
      icon={<BrickWall />}
      closeOnSelect
      tKey='commandk.buildMaze'
    />
  );
};

export const ShowStatsCommandItem: FC = () => {
  const { dispatch, statsOpen } = useStats();

  return (
    <CommandKItem
      onSelect={() => dispatch('statsOpen', !statsOpen)}
      icon={<ChartNoAxesColumn />}
      tKey='commandk.showStats'
    />
  );
};

export const ResetGridCommandItem: FC = () => {
  const { reset } = useRun();

  return (
    <CommandKItem
      onSelect={reset}
      icon={<RotateCcw />}
      tKey='commandk.resetGrid'
    />
  );
};

// Controls
export const DarkModeCommandItem: FC = () => {
  const { IconComponent, isDarkMode, toggle } = useDarkMode();

  return (
    <CommandKItem
      onSelect={toggle}
      icon={<IconComponent />}
      tKey={
        isDarkMode ? 'commandk.darkMode.disable' : 'commandk.darkMode.enable'
      }
    />
  );
};

export const WallModeCommandItem: FC = () => {
  const wallMode = useGrid.use.wallMode();
  const dispatch = useGrid.use.dispatch();
  return (
    <CommandKItem
      icon={<Fence />}
      onSelect={() => dispatch('wallMode', !wallMode)}
      tKey={wallMode ? 'commandk.wallMode.disable' : 'commandk.wallMode.enable'}
    />
  );
};

// Misc
function selectRandomQuarter<T>(arr: T[]): T[] {
  const quarterLength = Math.ceil(arr.length / 4);

  const shuffledArray = [...arr];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray.slice(0, quarterLength);
}

function randomiseWalls(refsMap: NodeMap) {
  const flatRefs = selectRandomQuarter([...refsMap.values()]);

  for (const [i, node] of flatRefs.entries()) {
    setTimeout(() => {
      node.setType(NodeType.wall);
    }, 25 * i);
  }
}

export const RandomiseWallsCommandItem: FC = () => {
  const refsMap = useGrid.use.refsMap();

  return (
    <CommandKItem
      onSelect={() => randomiseWalls(refsMap)}
      icon={<Dices />}
      closeOnSelect
      tKey='commandk.randomWalls'
    />
  );
};

export const StartTourCommandItem: FC = () => {
  const { startTour } = useTour();

  return (
    <CommandKItem
      onSelect={startTour}
      icon={<Map />}
      closeOnSelect
      tKey='commandk.tour'
    />
  );
};

export const GithubCommandItem: FC = () => (
  <CommandItem
    onSelect={() => {
      window.open(LINKS.github, '_blank');
    }}
  >
    <Github />
    <span>Github</span>
  </CommandItem>
);
