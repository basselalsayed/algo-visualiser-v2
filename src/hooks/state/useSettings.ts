import { produce } from 'immer';
import { create } from 'zustand';
import { algoInfo, AlgoInfo } from '../../lib/constants/algoInfo';

const DEFAULT_NODE_SIZE = 32;

interface SettingsStore {
  currentAlgo: AlgoInfo;
  nodeSize: number;
  gridWidth: number;
  gridHeight: number;
  maxGridWidth: number;
  maxGridHeight: number;
  drawSquare: number;
  animationSpeed: number;
  performanceMode: boolean;
  dispatch: <T extends Exclude<keyof SettingsStore, 'dispatch' | 'reset'>>(
    type: T,
    payload: SettingsStore[T]
  ) => void;
  reset: VoidFunction;
}

export const useSettings = create<SettingsStore>((set) => ({
  currentAlgo: algoInfo[0],
  nodeSize: DEFAULT_NODE_SIZE,
  gridWidth: 0,
  gridHeight: 0,
  maxGridWidth: 0,
  maxGridHeight: 0,
  drawSquare: 0,
  animationSpeed: 0,
  performanceMode: false,
  dispatch: (type, payload) =>
    set(
      produce<SettingsStore>((state) => {
        if (type === 'drawSquare') {
          state.gridWidth = payload as number;
          state.gridHeight = payload as number;
        } else state[type] = payload;
      })
    ),
  reset: () =>
    set(
      produce((state) => ({
        nodeSize: DEFAULT_NODE_SIZE,
        gridHeight: state.maxGridHeight,
        gridWidth: state.maxGridWidth,
        drawSquare: 0,
        animationSpeed: 0,
      }))
    ),
}));
