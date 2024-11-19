import { produce } from 'immer';
import { create } from 'zustand';

import { type AlgoInfo, algoInfo } from '@/lib/constants';

import { type DispatchFunction } from './types';

const DEFAULT_NODE_SIZE = 32;

interface SettingsStore {
  animationSpeed: number;
  currentAlgo: AlgoInfo;
  dispatch: DispatchFunction<SettingsStore, 'dispatch' | 'reset'>;
  drawSquare: number;
  gridHeight: number;
  gridWidth: number;
  maxGridHeight: number;
  maxGridWidth: number;
  nodeSize: number;
  performanceMode: boolean;
  reset: VoidFunction;
}

export const useSettings = create<SettingsStore>((set) => ({
  animationSpeed: 0,
  currentAlgo: algoInfo[0],
  dispatch: (type, payload) =>
    set(
      produce<SettingsStore>((state) => {
        if (type === 'drawSquare') {
          state.gridWidth = payload as number;
          state.gridHeight = payload as number;
        } else state[type] = payload;
      })
    ),
  drawSquare: 0,
  gridHeight: 0,
  gridWidth: 0,
  maxGridHeight: 0,
  maxGridWidth: 0,
  nodeSize: DEFAULT_NODE_SIZE,
  performanceMode: false,
  reset: () =>
    set(
      produce((state) => ({
        animationSpeed: 0,
        drawSquare: 0,
        gridHeight: state.maxGridHeight,
        gridWidth: state.maxGridWidth,
        nodeSize: DEFAULT_NODE_SIZE,
      }))
    ),
}));
