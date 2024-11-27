import { useEffect } from 'react';

import { useGrid, useRunStore, useSettings } from '@/hooks';

/**
 * @description side effects related to updating the current algorithm based on other variables
 */
export const useHandlleAlgoUpdates = () => {
  const { algoInstance, dispatch } = useRunStore();

  const { currentAlgo } = useSettings();

  const { endNode, refsMap, startNode } = useGrid();

  useEffect(() => {
    algoInstance?.reset();
  }, [algoInstance, refsMap]);

  useEffect(() => {
    dispatch(
      'algoInstance',
      startNode && endNode
        ? new currentAlgo.class(refsMap, startNode, endNode)
        : undefined
    );
    dispatch('runState', 'idle');
  }, [currentAlgo.class, dispatch, endNode, refsMap, startNode]);
};
