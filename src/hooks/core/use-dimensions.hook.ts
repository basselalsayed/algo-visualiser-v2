import { useMemo } from 'react';

import { useSettings } from '../state';

interface useDimensionsReturn {
  columnCount: number;
  maxColumnCount: number;
  maxRowCount: number;
  maxSquareSize: number;
  rowCount: number;
}
export const useDimensions = (): useDimensionsReturn => {
  const { gridHeight, gridWidth, maxGridHeight, maxGridWidth, nodeSize } =
    useSettings();

  const columnCount = useMemo(
    () => Math.floor(gridWidth / nodeSize),
    [gridWidth, nodeSize]
  );

  const rowCount = useMemo(
    () => Math.floor(gridHeight / nodeSize),
    [gridHeight, nodeSize]
  );

  const maxColumnCount = useMemo(
    () => Math.floor(maxGridWidth / nodeSize),
    [maxGridWidth, nodeSize]
  );
  const maxRowCount = useMemo(
    () => Math.floor(maxGridHeight / nodeSize),
    [maxGridHeight, nodeSize]
  );

  const maxSquareSize = Math.min(maxRowCount, maxColumnCount);

  return {
    columnCount,
    maxColumnCount,
    maxRowCount,
    maxSquareSize,
    rowCount,
  };
};
