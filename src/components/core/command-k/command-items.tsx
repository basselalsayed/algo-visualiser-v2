import { type ParseKeys } from 'i18next';
import {
  BrickWall,
  ChartNoAxesColumn,
  Dices,
  Fence,
  PauseIcon,
  PlayIcon,
  Repeat1,
  RotateCcw,
} from 'lucide-react';
import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  type FC,
  type ReactElement,
  forwardRef,
} from 'react';
import { useTranslation } from 'react-i18next';
import { match } from 'ts-pattern';
import { useShallow } from 'zustand/react/shallow';

import { NodeType } from '@/components/grid';
import { CommandItem, CommandShortcut } from '@/components/ui';
import { useDarkMode } from '@/hooks';
import {
  type NodeMap,
  useCommand,
  useGrid,
  useRun,
  useStats,
} from '@/hooks/state';
import { RUN_ALGO_KEY, RUN_MAZE_KEY, sleep } from '@/lib';

export const CommandKItem = forwardRef<
  ElementRef<typeof CommandItem>,
  ComponentPropsWithoutRef<typeof CommandItem> & {
    closeOnSelect?: boolean;
    icon: ReactElement;
    shortcut?: string;
  } & TProp
>(
  (
    {
      children,
      closeOnSelect = false,
      icon,
      onSelect,
      shortcut,
      tKey,
      ...props
    },
    ref
  ) => {
    const dispatch = useCommand((state) => state.dispatch);

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
  }
);

// Actions
export const RunCommandItem: FC = () => {
  const { algoRunning, readyToRun, run, runState } = useRun();

  const [icon, tKey] = match(runState)
    .returnType<[ReactElement, ParseKeys]>()
    .with('idle', 'paused', () => [<PlayIcon />, 'commandk.play'])
    .with('running', () => [<PauseIcon />, 'commandk.pause'])
    .with('done', () => [<Repeat1 />, 'commandk.replay'])
    .exhaustive();

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
  const { dispatch, wallMode } = useGrid(
    useShallow(({ dispatch, wallMode }) => ({ dispatch, wallMode }))
  );

  return (
    <CommandKItem
      icon={<Fence />}
      onSelect={() => dispatch('wallMode', !wallMode)}
      tKey={wallMode ? 'commandk.wallMode.disable' : 'commandk.wallMode.enable'}
    />
  );
};

// Misc
function randomiseWalls(refsMap: NodeMap) {
  function selectRandomQuarter<T>(arr: T[]): T[] {
    const quarterLength = Math.ceil(arr.length / 4);

    const shuffledArray = arr.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray.slice(0, quarterLength);
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
    <CommandKItem
      onSelect={() => randomiseWalls(refsMap)}
      icon={<Dices />}
      closeOnSelect
      tKey='commandk.randomWalls'
    />
  );
};
