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
  startNode?: Node;
  endNode?: Node;
  wallMode: boolean;
  dispatch: DispatchFunction<GridStore, 'startNode' | 'endNode' | 'wallMode'>;
}

export const useGrid = create<GridStore>((set, get) => ({
  refsMap: new ArrayKeyMap<NodeCoordinates, Node>(),
  addRef: (x, y, el) =>
    set((state) => {
      const key: NodeCoordinates = [x, y];
      if (el) {
        state.refsMap.set(key, el);
      } else {
        state.refsMap.delete(key);
      }

      return { ...state };
    }),
  resetGrid() {
    for (const element of get().refsMap.values()) {
      element.reset();
    }
  },
  startNode: undefined,
  endNode: undefined,
  wallMode: false,
  dispatch: (key, value) =>
    set((state) => ({
      ...state,
      [key]: value,
    })),
}));
