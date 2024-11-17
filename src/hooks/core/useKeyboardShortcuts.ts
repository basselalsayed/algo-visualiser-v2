import { useMemo, useRef } from 'react';
import { match } from 'ts-pattern';
import { useEventCallback, useEventListener } from 'usehooks-ts';

import { type NodeCoordinates, useCommand, useGrid, useRun } from '../state';
import { NodeType } from '@/components/grid';
import {
  EDIT_ALGORITHM,
  EDIT_ANIMATION_SPEED,
  EDIT_DRAW_SQUARE,
  EDIT_GRID_HEIGHT,
  EDIT_GRID_WIDTH,
  EDIT_NODE_SIZE,
  FOCUS_GRID,
  NAVIGATE_GRID_DOWN,
  NAVIGATE_GRID_LEFT,
  NAVIGATE_GRID_RIGHT,
  NAVIGATE_GRID_UP,
  NODE_TYPE_CYCLE,
  NODE_TYPE_END,
  NODE_TYPE_NONE,
  NODE_TYPE_START,
  NODE_TYPE_WALL,
  OPEN_COMMAND_KEY,
  RUN_ALGO_KEY,
  RUN_MAZE_KEY,
  type T_ACTION_KEYS,
  type T_COMMAND_SEARCH_KEYS,
} from '@/lib/constants';

import { useDimensions } from './useDimensions';

type KeyboardMap<K extends string, V> = {
  [key in K]: V;
};

const searchMap: KeyboardMap<T_COMMAND_SEARCH_KEYS, string> = {
  [EDIT_ALGORITHM]: 'algorithm',
  [EDIT_ANIMATION_SPEED]: 'animation speed',
  [EDIT_DRAW_SQUARE]: 'draw square',
  [EDIT_GRID_HEIGHT]: 'grid height',
  [EDIT_GRID_WIDTH]: 'grid width',
  [EDIT_NODE_SIZE]: 'node size',
};

export const useKeyboardShortcuts = (): ((e: KeyboardEvent) => void) => {
  const { algoRunning, run, runMaze } = useRun();

  const { dispatch, open } = useCommand();

  const actions = useMemo<KeyboardMap<T_ACTION_KEYS, VoidFunction>>(
    () => ({
      [OPEN_COMMAND_KEY]: () => dispatch('open', !open),
      [RUN_ALGO_KEY]: run,
      [RUN_MAZE_KEY]: runMaze,
    }),
    [dispatch, open, run, runMaze]
  );

  const onActionKeyPress = useEventCallback((e: KeyboardEvent) => {
    e.preventDefault();
    if (e.key === OPEN_COMMAND_KEY && algoRunning) {
      run(); // pause
    }
    actions[e.key as T_ACTION_KEYS]();
  });

  const onCommandSearchKeyPress = useEventCallback((e: KeyboardEvent) => {
    e.preventDefault();
    dispatch('search', searchMap[e.key as T_COMMAND_SEARCH_KEYS]);
    if (!open) dispatch('open', true);
  });

  const gridNavigationOn = useRef<boolean>(false);
  const focusedNode = useRef<NodeCoordinates>([0, 0]);

  const onGridNavigationToggle = useEventCallback((e: KeyboardEvent) => {
    e.preventDefault();
    const currentNode = useGrid
      .getState()
      .refsMap.get(focusedNode.current)?.domNode;

    if (gridNavigationOn.current) {
      currentNode?.blur();
    } else {
      currentNode?.focus();
    }

    gridNavigationOn.current = !gridNavigationOn.current;
  });

  const { columnCount, rowCount } = useDimensions();

  const handleGridNavigation = useEventCallback((key: string) => {
    const [x, y] = focusedNode.current;

    const { dispatch, refsMap } = useGrid.getState();

    const currentNode = refsMap.get(focusedNode.current);

    const cycleType = () => {
      const nodeTypes = Object.values(NodeType);
      const currentIndex = nodeTypes.indexOf(currentNode!.type);
      const nextIndex = (currentIndex + 1) % nodeTypes.length;
      const nextType = nodeTypes[nextIndex];
      currentNode!.setType(nextType);
      if (nextType === 'start') dispatch('startNode', [x, y]);
      if (nextType === 'end') dispatch('endNode', [x, y]);
    };

    const focusUpdateNode = () =>
      refsMap.get(focusedNode.current)?.domNode.focus();

    match(key)
      .with(NODE_TYPE_CYCLE, cycleType)
      .with(NODE_TYPE_WALL, () => {
        currentNode?.setType(NodeType.wall);
      })
      .with(NODE_TYPE_START, () => {
        currentNode?.setType(NodeType.start);
        dispatch('startNode', [x, y]);
      })
      .with(NODE_TYPE_END, () => {
        currentNode?.setType(NodeType.end);
        dispatch('endNode', [x, y]);
      })
      .with(NODE_TYPE_NONE, () => {
        currentNode?.setType(NodeType.none);
      })
      .with(NAVIGATE_GRID_UP, () => {
        focusedNode.current = [x, (y - 1 + rowCount) % rowCount];
        focusUpdateNode();
      })
      .with(NAVIGATE_GRID_DOWN, () => {
        focusedNode.current = [x, (y + 1) % rowCount];
        focusUpdateNode();
      })
      .with(NAVIGATE_GRID_LEFT, () => {
        focusedNode.current = [(x - 1 + columnCount) % columnCount, y];
        focusUpdateNode();
      })
      .with(NAVIGATE_GRID_RIGHT, () => {
        focusedNode.current = [(x + 1) % columnCount, y];
        focusUpdateNode();
      })
      .with('Escape', () => {
        currentNode?.domNode.blur();
      });
  });

  const onKeyPress = useEventCallback((e: KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey) {
      if (e.key in actions) {
        onActionKeyPress(e);
      } else if (e.key in searchMap) {
        onCommandSearchKeyPress(e);
      } else if (e.key === FOCUS_GRID) {
        onGridNavigationToggle(e);
      }
    } else {
      if (gridNavigationOn.current) {
        handleGridNavigation(e.key);
      }
    }
  });

  useEventListener('keydown', onKeyPress);

  return onKeyPress;
};
