import { motion } from 'framer-motion';
import { memo, useCallback, useEffect, useRef } from 'react';
import { match } from 'ts-pattern';
import { useBoolean, useEventListener } from 'usehooks-ts';
import { useShallow } from 'zustand/react/shallow';

import {
  useDimensions,
  useGrid,
  useResizeObserver,
  useSettings,
} from '@/hooks';
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
            return NodeType.start;
        })
        .with({ endNode: undefined, type: NodeType.none }, () => {
            dispatch('endNode', [xIndex, yIndex]);
            return NodeType.end;
        })
        .with({ type: NodeType.none }, () => NodeType.none)
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
      id='nodeGrid'
      className='h-full w-full flex flex-row p-4 px-2 sm:px-6 items-center justify-center '
      ref={gridRef}
    >
      {Array.from({ length: columnCount }).map((_, xIndex) => (
        <div
          key={`col-${xIndex}-${nodeSize}-${refreshKey}`}
          className='flex flex-col flex-shrink'
        >
          {Array.from({ length: rowCount }).map((_, yIndex) => (
            <Node
              key={`node-${xIndex}-${yIndex}`}
              size={nodeSize}
              xIndex={xIndex}
              yIndex={yIndex}
              isLastColumn={xIndex === columnCount - 1}
              ref={(node) => addRef(xIndex, yIndex, node)}
              onClick={handleNodeClick}
              onMouseOver={handleNodeMouseOver}
            />
          ))}
        </div>
      ))}
    </div>
  );
});

Grid.displayName = 'Grid';
