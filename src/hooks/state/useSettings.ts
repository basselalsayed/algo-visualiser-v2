import { produce } from 'immer';
import { create } from 'zustand';
import { algoInfo, AlgoInfo } from './algoInfo';

export enum SettingsAction {
  currentAlgo = 'currentAlgo',
  nodeSize = 'nodeSize',
  gridWidth = 'gridWidth',
  gridHeight = 'gridHeight',
  drawSquare = 'drawSquare',
  animationSpeed = 'animationSpeed',
}

interface SettingsStore {
  [SettingsAction.currentAlgo]: AlgoInfo;
  [SettingsAction.nodeSize]: number;
  [SettingsAction.gridWidth]: number;
  [SettingsAction.gridHeight]: number;
  [SettingsAction.drawSquare]: number;
  [SettingsAction.animationSpeed]: number;
  dispatch: (type: SettingsAction, value: SettingsStore[typeof type]) => void;
}

export const useSettings = create<SettingsStore>((set) => ({
  currentAlgo: algoInfo[0],
  nodeSize: 24,
  gridWidth: 0,
  gridHeight: 0,
  drawSquare: 0,
  animationSpeed: 0,
  dispatch: (type, value) =>
    set(
      produce((state) => {
        switch (type) {
          case 'currentAlgo':
            state.currentAlgo = value;
            break;
          case 'nodeSize':
            state.nodeSize = value;
            break;
          case 'gridWidth':
            state.gridWidth = value;
            break;
          case 'gridHeight':
            state.gridHeight = value;
            break;
          case 'drawSquare':
            state.drawSquare = value;
            break;
          case 'animationSpeed':
            state.animationSpeed = value;
            break;
        }
      })
    ),
}));
