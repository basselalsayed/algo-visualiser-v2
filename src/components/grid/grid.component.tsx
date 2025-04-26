import { memo, useCallback, useEffect, useRef } from 'react';
import { match } from 'ts-pattern';
import { useEventCallback } from 'usehooks-ts';
import { useShallow } from 'zustand/react/shallow';

import {
  useDimensions,
  useEventListener,
  useGrid,
  useResizeObserver,
  useSettings,
} from '@/hooks';
import { HTML_IDS, eventEmitter } from '@/lib';
import { cn } from '@/lib/utils';

import { NodeType } from './node-type.enum';
import { Node } from './node.component';

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

  const onPointerDown = useEventCallback((e: PointerEvent) => {
    dispatch('pointerDown', true);
    const node = e.target as HTMLDivElement | undefined;

    if (node && node.hasPointerCapture(e.pointerId)) {
      node.releasePointerCapture(e.pointerId);
    }
  });

  useEventListener('pointerdown', onPointerDown, gridRef);

  const toggledRecentlyRef = useRef(new Set<string>());

  const onPointerMove = useEventCallback((e: PointerEvent) => {
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
  });

  useEventListener('pointermove', onPointerMove, gridRef);

  const onPointerUp = useEventCallback(() => {
    toggledRecentlyRef.current.clear();
    dispatch('pointerDown', false);
  });

  useEventListener('pointerup', onPointerUp, gridRef);

  const handleNodeClick = useCallback<(node: INode) => NodeType>(
    ({ type, xIndex, yIndex }) => {
      const { dispatch, endNode, startNode, wallMode } = useGrid.getState();

      return match({ endNode, startNode, type, wallMode })
        .returnType<NodeType>()
        .with({ type: NodeType.none, wallMode: true }, () => NodeType.wall)
        .with({ type: NodeType.wall, wallMode: true }, () => NodeType.none)
        .with({ startNode: undefined, type: NodeType.none }, () => {
          dispatch('startNode', [xIndex, yIndex]);
          eventEmitter.emit('startSelected');

          return NodeType.start;
        })
        .with({ endNode: undefined, type: NodeType.none }, () => {
          dispatch('endNode', [xIndex, yIndex]);
          eventEmitter.emit('endSelected');

          return NodeType.end;
        })
        .with({ type: NodeType.start }, () => {
          dispatch('startNode', undefined);

          return NodeType.none;
        })
        .with({ type: NodeType.end }, () => {
          dispatch('endNode', undefined);

          return NodeType.none;
        })
        .otherwise(() => type);
    },
    []
  );

  return (
    <div
      id={HTML_IDS.components.grid}
      className='mobile-landscape:pb-[env(safe-area-inset-bottom)] mobile-landscape:pr-0 mobile-landscape:pt-2 mobile-landscape:pl-[env(safe-area-inset-left)] flex h-full w-full touch-none flex-row items-center justify-center p-4 pb-0 sm:pt-0 sm:pb-4'
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
