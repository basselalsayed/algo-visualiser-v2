import { useEffect } from 'react';

import { ShortestPath } from '@/algorithms';
import { RunState } from '@/lib';
import { useGrid, useRunStore, useSettings } from '@/store';

/**
 * @description side effects related to updating the current algorithm based on other variables
 */
export const useHandleAlgoUpdates = () => {
  const { algoInstance, dispatch } = useRunStore();

  const {
    animationSpeed,
    currentAlgo,
    drawSquare,
    gridHeight,
    gridWidth,
    maxGridHeight,
    maxGridWidth,
    nodeSize,
  } = useSettings();

  const { endNode, refsMap, startNode } = useGrid();

  useEffect(() => {
    ShortestPath.reset();
  }, [
    drawSquare,
    gridHeight,
    gridWidth,
    maxGridHeight,
    maxGridWidth,
    nodeSize,
    startNode,
    endNode,
  ]);

  useEffect(() => {
    void algoInstance?.reset();
  }, [algoInstance, refsMap]);

  useEffect(() => {
    dispatch(
      'algoInstance',
      startNode && endNode
        ? new currentAlgo.class(refsMap, startNode, endNode, animationSpeed)
        : undefined
    );
    dispatch('runState', RunState.idle);
  }, [
    animationSpeed,
    currentAlgo.class,
    dispatch,
    endNode,
    refsMap,
    startNode,
  ]);
};
