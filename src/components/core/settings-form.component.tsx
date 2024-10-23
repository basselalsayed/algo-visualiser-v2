import { useMemo } from 'react';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { SettingsAction, useSettings } from '@/hooks/state/useSettings';
import { Button } from '../ui/button';

export const SettingsForm = () => {
  const {
    nodeSize,
    gridWidth,
    gridHeight,
    maxGridWidth,
    maxGridHeight,
    animationSpeed,
    reset,
    dispatch,
  } = useSettings();

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

  const maxSquareSize =
    maxRowCount < maxColumnCount ? maxRowCount : maxColumnCount;

  return (
    <>
      <Label>Node size</Label>
      <Slider
        value={[nodeSize]}
        min={10}
        max={200}
        onValueChange={(v) => dispatch(SettingsAction.nodeSize, v[0])}
      />
      <Label>Grid width</Label>
      <Slider
        value={[columnCount]}
        min={4}
        max={maxColumnCount}
        step={1}
        onValueChange={(v) =>
          dispatch(SettingsAction.gridWidth, v[0] * nodeSize)
        }
      />

      <Label>Grid height</Label>
      <Slider
        value={[rowCount]}
        min={4}
        max={maxRowCount}
        onValueChange={(v) =>
          dispatch(SettingsAction.gridHeight, v[0] * nodeSize)
        }
      />

      <Label>Draw square</Label>
      <Slider
        defaultValue={[10]}
        min={4}
        max={maxSquareSize}
        onValueChange={(v) =>
          dispatch(SettingsAction.drawSquare, v[0] * nodeSize)
        }
      />

      <Label>Animation Speed</Label>
      <Slider
        defaultValue={[animationSpeed]}
        onValueChange={(v) => dispatch(SettingsAction.animationSpeed, v[0])}
      />
      <Button onClick={reset}>Reset</Button>
    </>
  );
};
