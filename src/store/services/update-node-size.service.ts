import { clamp } from 'lodash-es';

import {
  MAX_NODE_SIZE,
  MIN_NODE_SIZE,
  PERFORMANCE_NODE_SIZE_THRESHOLD,
} from '@/lib';

import { useSettings } from '../use-settings.hook';

export function updateNodeSize(value: number) {
  const { dispatch, nodeSize, performanceMode, performanceModeDialogOpen } =
    useSettings.getState();

  if (performanceModeDialogOpen) return;

  let newNodeSize = nodeSize;

  if (value <= PERFORMANCE_NODE_SIZE_THRESHOLD) {
    if (performanceMode) {
      newNodeSize = value;
    } else {
      dispatch('performanceModeDialogOpen', true);
    }
  } else {
    newNodeSize = value;
  }

  newNodeSize = clamp(newNodeSize, MIN_NODE_SIZE, MAX_NODE_SIZE);

  dispatch('nodeSize', newNodeSize);
}
