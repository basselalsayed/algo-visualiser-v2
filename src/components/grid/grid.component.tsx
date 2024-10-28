import { memo, useCallback, useEffect, useMemo, useRef } from 'react';
import { useBoolean, useEventListener } from 'usehooks-ts';

import { SettingsAction, useSettings } from '@/hooks/state/useSettings';
import { Node } from './node.component';
import { NodeType } from './node-type.enum';

import { useShallow } from 'zustand/react/shallow';
import { useGrid } from '@/hooks/useGrid';
import { useResizeObserver } from '@/hooks/util/useResizeObserver';

export const Grid = memo(() => {
  const gridRef = useRef<HTMLDivElement>(null);

  const { nodeSize, gridHeight, gridWidth, dispatch } = useSettings(
    useShallow(({ nodeSize, gridHeight, gridWidth, dispatch }) => ({
      nodeSize,
      gridHeight,
      gridWidth,
      dispatch,
    }))
  );

  const {
    addRef,
    resetGrid,
    wallMode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } = useGrid(
    useShallow(({ addRef, resetGrid, wallMode }) => ({
      addRef,
      resetGrid,
      wallMode,
    }))
  );

  const { width = 0, height = 0 } = useResizeObserver({
    ref: gridRef,
    throttleDelay: 2000,
  });

  useEffect(() => {
    dispatch(SettingsAction.gridHeight, height);
    dispatch(SettingsAction.maxGridHeight, height);
    dispatch(SettingsAction.gridWidth, width);
    dispatch(SettingsAction.maxGridWidth, width);
    resetGrid();
  }, [dispatch, height, resetGrid, width]);

  const [columnCount, rowCount] = useMemo(
    () => [Math.floor(gridWidth / nodeSize), Math.floor(gridHeight / nodeSize)],
    [gridHeight, gridWidth, nodeSize]
  );

  const { value: mouseDown, setTrue, setFalse } = useBoolean(false);

  useEventListener('mousedown', setTrue, gridRef);
  useEventListener('mouseup', setFalse, gridRef);

  const handleNodeMouseOver = useCallback<(node: Node) => NodeType>(
    (node) => {
      if (wallMode && mouseDown && node.type === 'none') return NodeType.wall;
      return node.type;
    },
    [mouseDown, wallMode]
  );

  const handleNodeClick = useCallback<(type: Node) => NodeType>((node) => {
    const { startNode, endNode, wallMode, dispatch } = useGrid.getState();

    switch (node.type) {
      case 'none':
        if (wallMode) return NodeType.wall;

        if (!startNode) {
          dispatch('startNode', node);
          return NodeType.start;
        }
        if (!endNode) {
          dispatch('endNode', node);
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
  }, []);

  return (
    <div
      id='nodeGrid'
      className='h-full w-full flex flex-row p-4 px-2 sm:px-6 items-center justify-center '
      ref={gridRef}
    >
      {[...Array(columnCount)].map((_, xIndex) => (
        <div
          key={`col-${xIndex}-${nodeSize}`}
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
