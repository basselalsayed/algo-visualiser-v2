import { produce } from 'immer';
import { create } from 'zustand';
import { algoInfo, AlgoInfo } from '../../lib/constants/algoInfo';

export enum SettingsAction {
  currentAlgo = 'currentAlgo',
  nodeSize = 'nodeSize',
  gridWidth = 'gridWidth',
  gridHeight = 'gridHeight',
  maxGridWidth = 'maxGridWidth',
  maxGridHeight = 'maxGridHeight',
  drawSquare = 'drawSquare',
  animationSpeed = 'animationSpeed',
}

interface SettingsStore {
  [SettingsAction.currentAlgo]: AlgoInfo;
  [SettingsAction.nodeSize]: number;
  [SettingsAction.gridWidth]: number;
  [SettingsAction.gridHeight]: number;
  [SettingsAction.maxGridWidth]: number;
  [SettingsAction.maxGridHeight]: number;
  [SettingsAction.drawSquare]: number;
  [SettingsAction.animationSpeed]: number;
  dispatch: (type: SettingsAction, value: SettingsStore[typeof type]) => void;
  reset: VoidFunction;
}

export const useSettings = create<SettingsStore>((set) => ({
  currentAlgo: algoInfo[0],
  nodeSize: 24,
  gridWidth: 0,
  gridHeight: 0,
  maxGridWidth: 0,
  maxGridHeight: 0,
  drawSquare: 0,
  animationSpeed: 0,
  dispatch: (type, value) =>
    set(
      produce((state) => {
        if (type === SettingsAction.drawSquare) {
          state.gridWidth = value;
          state.gridHeight = value;
        } else state[type] = value;
      })
    ),
  reset: () =>
    set(
      produce((state) => ({
        nodeSize: 24,
        gridHeight: state.maxGridHeight,
        gridWidth: state.maxGridWidth,
        drawSquare: 0,
        animationSpeed: 0,
      }))
    ),
}));
