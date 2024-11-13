import { motion } from 'framer-motion';
import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useBoolean, useEventListener } from 'usehooks-ts';
import { useShallow } from 'zustand/react/shallow';

import { useGrid } from '@/hooks/state/useGrid';
import { useSettings } from '@/hooks/state/useSettings';
import { useResizeObserver } from '@/hooks/util/useResizeObserver';
import { cn } from '@/lib/utils';

import { NodeType } from './node-type.enum';
import { Node } from './node.component';
import { type INode } from './node.interface';

export const Grid = memo(() => {
  const gridRef = useRef<HTMLDivElement>(null);

  const { dispatch, gridHeight, gridWidth, nodeSize } = useSettings(
    useShallow(({ dispatch, gridHeight, gridWidth, nodeSize }) => ({
      dispatch,
      gridHeight,
      gridWidth,
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

  const [columnCount, rowCount] = useMemo(
    () => [Math.floor(gridWidth / nodeSize), Math.floor(gridHeight / nodeSize)],
    [gridHeight, gridWidth, nodeSize]
  );

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

      switch (type) {
        case 'none':
          if (wallMode) return NodeType.wall;

          if (!startNode) {
            dispatch('startNode', [xIndex, yIndex]);
            return NodeType.start;
          }
          if (!endNode) {
            dispatch('endNode', [xIndex, yIndex]);
            return NodeType.end;
          }
          return NodeType.none;
        case 'start':
          dispatch('startNode', undefined);
          return NodeType.none;
        case 'end':
          dispatch('endNode', undefined);
          return NodeType.none;
        default:
          return NodeType.none;
      }
    },
    []
  );

  return (
    <div
      id='nodeGrid'
      className='h-full w-full flex flex-row p-4 px-2 sm:px-6 items-center justify-center '
      ref={gridRef}
    >
      {[...Array(columnCount)].map((_, xIndex) => (
        <div
          key={`col-${xIndex}-${nodeSize}-${refreshKey}`}
          className='flex flex-col flex-shrink'
        >
          {[...Array(rowCount)].map((_, yIndex) => (
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
