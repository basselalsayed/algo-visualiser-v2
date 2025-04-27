import { memo, useCallback, useEffect, useRef } from 'react';
import { match } from 'ts-pattern';
import { useShallow } from 'zustand/react/shallow';

import {
  useDimensions,
  useEventListener,
  useGrid,
  useResizeObserver,
  useSettings,
} from '@/hooks';
import { HTML_IDS } from '@/lib';
import { cn } from '@/lib/utils';

import {
  NODE_SIZE_STEP,
  PERFORMANCE_NODE_SIZE_THRESHOLD,
  updateNodeSize,
} from '../core';

import { NodeType } from './node-type.enum';
import { Node } from './node.component';
import { getDistance, handleNodeClick } from './util';

export const Grid = memo(() => {
  const gridRef = useRef<HTMLDivElement>(null);

  const { nodeSize, settingsDispatch } = useSettings(
    useShallow(({ dispatch, nodeSize }) => ({
      nodeSize,
      settingsDispatch: dispatch,
    }))
  );

  const { addRef, dispatch, refreshKey, resetGrid } = useGrid(
    useShallow(({ addRef, dispatch, refreshKey, resetGrid }) => ({
      addRef,
      dispatch,
      refreshKey,
      resetGrid,
    }))
  );

  const { height = 0, width = 0 } = useResizeObserver({
    ref: gridRef,
    throttleDelay: 2000,
  });

  useEffect(() => {
    settingsDispatch('gridHeight', height);
    settingsDispatch('maxGridHeight', height);
    settingsDispatch('gridWidth', width);
    settingsDispatch('maxGridWidth', width);
    resetGrid();
  }, [settingsDispatch, height, resetGrid, width]);

  const { columnCount, rowCount } = useDimensions();

  const pointersRef = useRef<PointerEvent[]>([]);
  const initialPinchDistanceRef = useRef<number>(0);

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      const { wallMode } = useGrid.getState();
      if (wallMode) {
        dispatch('pointerDown', true);
        const node = e.target as HTMLDivElement | undefined;

        if (node && node.hasPointerCapture(e.pointerId)) {
          node.releasePointerCapture(e.pointerId);
        }
      } else {
        const pointers = pointersRef.current;

        pointers.push(e);
        if (pointers.length === 2) {
          initialPinchDistanceRef.current = getDistance(
            pointers[0],
            pointers[1]
          );
        }
      }
    },
    [dispatch]
  );

  useEventListener('pointerdown', onPointerDown, gridRef);

  const toggledRecentlyRef = useRef(new Set<string>());

  const onPointerMove = useCallback((e: PointerEvent) => {
    const { wallMode } = useGrid.getState();

    if (wallMode) {
      const node = e.target as HTMLDivElement;
      const { pointerDown, wallMode } = useGrid.getState();

      if (!pointerDown || !wallMode || !node) return;

      const { type, xIndex, yIndex } = node.dataset;
      const key = String([xIndex, yIndex]);
      const toggledRecently = toggledRecentlyRef.current;

      if (toggledRecently.has(key)) return;

      toggledRecently.add(key);
      setTimeout(() => toggledRecently.delete(key), 300);

      node.dataset.type = match(type as NodeType)
        .with(NodeType.wall, () => NodeType.none)
        .with(NodeType.none, () => NodeType.wall)
        .otherwise(() => type);
    } else {
      const { nodeSize, performanceMode } = useSettings.getState();

      const pointers = pointersRef.current;
      const initialDistance = initialPinchDistanceRef.current;

      const index = pointers.findIndex((p) => p.pointerId === e.pointerId);
      if (index !== -1) pointers[index] = e;

      if (pointers.length === 2) {
        const currentDistance = getDistance(pointers[0], pointers[1]);
        const delta = currentDistance - initialDistance;

        if (Math.abs(delta) > 10) {
          const sizeChange = delta > 0 ? NODE_SIZE_STEP : -NODE_SIZE_STEP;
          const newSize = nodeSize + sizeChange;

          if (
            sizeChange < 0 &&
            newSize <= PERFORMANCE_NODE_SIZE_THRESHOLD &&
            !performanceMode
          ) {
            pointersRef.current = [];
          }

          updateNodeSize(newSize);
          initialPinchDistanceRef.current = currentDistance;
        }
      }
    }
  }, []);

  useEventListener('pointermove', onPointerMove, gridRef);

  const onPointerUpOrCancel = useCallback(
    (e: PointerEvent) => {
      toggledRecentlyRef.current.clear();
      dispatch('pointerDown', false);
      pointersRef.current = pointersRef.current.filter(
        (p) => p.pointerId !== e.pointerId
      );
    },
    [dispatch]
  );

  useEventListener('pointerup', onPointerUpOrCancel, gridRef);
  useEventListener('pointercancel', onPointerUpOrCancel, gridRef);

  return (
    <div
      id={HTML_IDS.components.grid}
      className='flex h-full w-full touch-none flex-row items-center justify-center p-4 pb-0 sm:pt-0 sm:pb-4 mobile-landscape:pt-2 mobile-landscape:pr-0 mobile-landscape:pb-safe mobile-landscape:pl-safe'
      ref={gridRef}
    >
      {Array.from({ length: columnCount }).map((_, xIndex) => (
        <div
          key={`col-${xIndex}-${nodeSize}-${refreshKey}`}
          className='flex shrink flex-col'
        >
          {Array.from({ length: rowCount }).map((_, yIndex) => {
            const firstColumn = xIndex === 0;
            const lastColumn = xIndex === columnCount - 1;

            const id =
              xIndex === 0 && yIndex === 0 ? HTML_IDS.tutorial.node : undefined;

            return (
              <Node
                key={`node-${xIndex}-${yIndex}`}
                className={cn(
                  firstColumn &&
                    'first-of-type:rounded-tl-sm last-of-type:rounded-bl-sm',
                  lastColumn &&
                    'first-of-type:rounded-tr-sm last-of-type:rounded-br-sm'
                )}
                size={nodeSize}
                columnCount={columnCount}
                rowCount={rowCount}
                xIndex={xIndex}
                yIndex={yIndex}
                isLastColumn={lastColumn}
                ref={(node) => {
                  addRef(xIndex, yIndex, node);
                }}
                onClick={handleNodeClick}
                id={id}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
});

Grid.displayName = 'Grid';
