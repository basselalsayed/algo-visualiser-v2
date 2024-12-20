import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { NodeType } from '@/components';
import { ArrayKeyMap } from '@/lib';

import { type DispatchFunction } from './types';

interface GridStore {
  addRef: (x: number, y: number, el: INode | null) => void;
  dispatch: DispatchFunction<GridStore, 'refsMap' | 'addRef' | 'resetGrid'>;
  endNode?: NodeCoordinates;
  refreshKey: string;
  refsMap: NodeMap;
  resetGrid: VoidFunction;
  resetWalls: VoidFunction;
  startNode?: NodeCoordinates;
  wallMode: boolean;
}

export const useGrid = create<GridStore>((set, get) => ({
  addRef: (x, y, el) =>
    set((state) => {
      const key: NodeCoordinates = [x, y];
      if (el) {
        state.refsMap.set(key, el);
      } else {
        state.refsMap.delete(key);
      }

      return { ...state, refsMap: state.refsMap.clone() };
    }),
  dispatch: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
  endNode: undefined,
  refreshKey: nanoid(),
  refsMap: new ArrayKeyMap<NodeCoordinates, INode>(),
  resetGrid: () =>
    set((state) => ({
      ...state,
      endNode: undefined,
      refreshKey: nanoid(),
      startNode: undefined,
    })),
  resetWalls: () => {
    for (const node of get().refsMap.values()) {
      if (node.isWall) node.setType(NodeType.none);
    }
  },
  startNode: undefined,
  wallMode: false,
}));
