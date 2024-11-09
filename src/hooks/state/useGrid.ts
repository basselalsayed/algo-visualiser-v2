import { nanoid } from 'nanoid';
import { create } from 'zustand';

import { NodeType } from '@/components/grid/node-type.enum';
import type { Node } from '@/components/grid/node.component';
import { type INode } from '@/components/grid/node.interface';
import { ArrayKeyMap } from '@/lib/array-key-map';

import { type DispatchFunction } from './types';

export type NodeCoordinates = [x: number, y: number];
export type NodeMap = ArrayKeyMap<NodeCoordinates, INode>;

interface GridStore {
  refsMap: NodeMap;
  addRef: (x: number, y: number, el: Node | null) => void;
  resetGrid: VoidFunction;
  resetWalls: VoidFunction;
  refreshKey: string;
  startNode?: NodeCoordinates;
  endNode?: NodeCoordinates;
  wallMode: boolean;
  dispatch: DispatchFunction<GridStore, 'refsMap' | 'addRef' | 'resetGrid'>;
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
