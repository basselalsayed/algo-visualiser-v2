import { renderHook } from '@testing-library/react';

import { useSettings } from '@/store';

import { useDimensions } from './use-dimensions.hook';

describe('useDimensions', () => {
  beforeEach(() => {
    useSettings.setState({
      gridHeight: 500,
      gridWidth: 400,
      maxGridHeight: 1000,
      maxGridWidth: 800,
      nodeSize: 50,
    });
  });

  it('calculates dimensions correctly', () => {
    const { result } = renderHook(() => useDimensions());

    expect(result.current).toEqual({
      columnCount: 8, // 500 / 50
      maxColumnCount: 16, // 800 / 50
      maxRowCount: 20, // 1000 / 50
      maxSquareSize: 16, // 400 / 50
      rowCount: 10, // min(20, 16)
    });
  });
});
