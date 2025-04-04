import { memo, useCallback, useEffect, useRef } from 'react';
import { match } from 'ts-pattern';
import { useBoolean } from 'usehooks-ts';
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

  const { dispatch, nodeSize } = useSettings(
    useShallow(({ dispatch, nodeSize }) => ({
      dispatch,
      nodeSize,
    }))
  );

  const { addRef, refreshKey, resetGrid, wallMode } = useGrid(
    useShallow(({ addRef, refreshKey, resetGrid, wallMode }) => ({
      addRef,
      refreshKey,
      resetGrid,
      wallMode,
    }))
  );

  const { height = 0, width = 0 } = useResizeObserver({
    ref: gridRef,
    throttleDelay: 2000,
  });

  useEffect(() => {
    dispatch('gridHeight', height);
    dispatch('maxGridHeight', height);
    dispatch('gridWidth', width);
    dispatch('maxGridWidth', width);
    resetGrid();
  }, [dispatch, height, resetGrid, width]);

  const { columnCount, rowCount } = useDimensions();

  const { setFalse, setTrue, value: mouseDown } = useBoolean(false);

  useEventListener('mousedown', setTrue, gridRef);
  useEventListener('mouseup', setFalse, gridRef);

  const handleNodeMouseOver = useCallback<(node: INode) => NodeType>(
    (node) => {
      if (wallMode && mouseDown) {
        if (node.type === 'none') return NodeType.wall;
        if (node.type === 'wall') return NodeType.none;
      }
      return node.type;
    },
    [mouseDown, wallMode]
  );

  const handleNodeClick = useCallback<(node: INode) => NodeType>(
    ({ type, xIndex, yIndex }) => {
      const { dispatch, endNode, startNode, wallMode } = useGrid.getState();

      return match({ endNode, startNode, type, wallMode })
        .returnType<NodeType>()
        .with({ type: NodeType.none, wallMode: true }, () => NodeType.wall)
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
        .otherwise(() => NodeType.none);
    },
    []
  );

  return (
    <div
      id={HTML_IDS.components.grid}
      className='flex h-full w-full flex-row items-center justify-center p-4 pb-0 sm:pb-4 sm:pt-0'
      ref={gridRef}
    >
      {Array.from({ length: columnCount }).map((_, xIndex) => (
        <div
          key={`col-${xIndex}-${nodeSize}-${refreshKey}`}
          className='flex flex-shrink flex-col'
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
                xIndex={xIndex}
                yIndex={yIndex}
                isLastColumn={xIndex === columnCount - 1}
                ref={(node) => {
                  addRef(xIndex, yIndex, node);
                }}
                onClick={handleNodeClick}
                onMouseOver={handleNodeMouseOver}
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
