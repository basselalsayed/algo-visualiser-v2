import { produce } from 'immer';
import { create } from 'zustand';

import { type AlgoInfo, algoInfo } from '@/algorithms';
import {
  DEFAULT_ANIMATION_SPEED,
  DEFAULT_NODE_SIZE,
  Duration,
  emitCustomEvent,
  setCSSVariable,
} from '@/lib';

import { type DispatchFunction } from './types';

interface SettingsStore {
  animationSpeed: Duration;
  currentAlgo: AlgoInfo;
  dispatch: DispatchFunction<SettingsStore, 'dispatch' | 'reset'>;
  drawSquare: number;
  gridHeight: number;
  gridWidth: number;
  maxGridHeight: number;
  maxGridWidth: number;
  nodeSize: number;
  performanceMode: boolean;
  performanceModeDialogOpen: boolean;
  reset: VoidFunction;
}

export const useSettings = create<SettingsStore>((set) => ({
  animationSpeed: Duration.fromMillis(DEFAULT_ANIMATION_SPEED),
  currentAlgo: algoInfo[0],
  dispatch: (key, payload) =>
    set(
      produce<SettingsStore>((state) => {
        if (key === 'drawSquare') {
          state.gridWidth = payload as number;
          state.gridHeight = payload as number;
        } else state[key] = payload;

        if (key === 'nodeSize') {
          setCSSVariable('--node-size', payload as number);
        }

        if (key === 'currentAlgo') {
          emitCustomEvent('algoChanged');
        }
      })
    ),
  drawSquare: 0,
  gridHeight: 0,
  gridWidth: 0,
  maxGridHeight: 0,
  maxGridWidth: 0,
  nodeSize: DEFAULT_NODE_SIZE,
  performanceMode: false,
  performanceModeDialogOpen: false,
  reset: () => {
    setCSSVariable('--node-size', DEFAULT_NODE_SIZE);

    return set((state) => ({
      animationSpeed: Duration.fromMillis(DEFAULT_ANIMATION_SPEED),
      drawSquare: 0,
      gridHeight: state.maxGridHeight,
      gridWidth: state.maxGridWidth,
      nodeSize: DEFAULT_NODE_SIZE,
    }));
  },
}));
