import { nanoid } from 'nanoid';
import { create } from 'zustand';

import type { Node } from '@/components/grid/node.component';
import { ArrayKeyMap } from '@/lib/array-key-map';
import { DispatchFunction } from './types';

export type NodeCoordinates = [x: number, y: number];
export type NodeMap = ArrayKeyMap<NodeCoordinates, Node>;

interface GridStore {
  refsMap: NodeMap;
  addRef: (x: number, y: number, el: Node | null) => void;
  resetGrid: VoidFunction;
  refreshKey: string;
  startNode?: Node;
  endNode?: Node;
  wallMode: boolean;
  dispatch: DispatchFunction<GridStore, 'refsMap' | 'addRef' | 'resetGrid'>;
}

export const useGrid = create<GridStore>((set) => ({
  refsMap: new ArrayKeyMap<NodeCoordinates, Node>(),
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
  refreshKey: nanoid(),
  resetGrid: () =>
    set((state) => ({
      ...state,
      refreshKey: nanoid(),
      startNode: undefined,
      endNode: undefined,
    })),
  startNode: undefined,
  endNode: undefined,
  wallMode: false,
  dispatch: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
}));
