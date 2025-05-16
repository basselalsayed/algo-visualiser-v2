import { memo, useCallback, useEffect, useRef } from 'react';

import { useDimensions, useEventListener, useResizeObserver } from '@/hooks';
import { HTML_IDS, cn } from '@/lib';
import { isRunning, updateNodeSize, useGrid, useSettings } from '@/store';

import { Node } from './components/node.component';
import { PointerEventService } from './pointer-events-service';
import { handleNodeClick } from './util';

export const Grid = memo(() => {
  const gridRef = useRef<HTMLDivElement>(null);

  const nodeSize = useSettings.use.nodeSize();
  const settingsDispatch = useSettings.use.dispatch();

  const addRef = useGrid.use.addRef();
  const dispatch = useGrid.use.dispatch();
  const refreshKey = useGrid.use.refreshKey();
  const resetGrid = useGrid.use.resetGrid();

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

  useEffect(() => {
    resetGrid();
  }, [resetGrid, nodeSize]);

  const { columnCount, rowCount } = useDimensions();

  const pointerService = useRef(new PointerEventService());

  const onPointerDown = useCallback(
    (e: PointerEvent) => {
      if (isRunning().idle) {
        const { wallMode } = useGrid.getState();

        if (wallMode) {
          dispatch('pointerDown', true);
          pointerService.current.handleWallPointerDown(e);
        } else {
          pointerService.current.handleZoomPointerDown(e);
        }
      }
    },
    [dispatch]
  );

  useEventListener('pointerdown', onPointerDown, gridRef);

  const onPointerMove = useCallback((e: PointerEvent) => {
    if (isRunning().idle) {
      const { pointerDown, wallMode } = useGrid.getState();

      if (wallMode && pointerDown) {
        return pointerService.current.handleWallPointerMove(e);
      }

      const { nodeSize, performanceMode } = useSettings.getState();

      return pointerService.current.handleZoomPointerMove(
        e,
        nodeSize,
        performanceMode,
        updateNodeSize
      );
    }
  }, []);

  useEventListener('pointermove', onPointerMove, gridRef);

  const onPointerUpOrCancel = useCallback(
    (e: PointerEvent) => {
      dispatch('pointerDown', false);
      pointerService.current.handlePointerUpOrCancel(e);
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
