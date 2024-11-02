import { useMemo } from 'react';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { useSettings } from '@/hooks/state/useSettings';
import { Button } from '../ui/button';
import { Card } from '../card.component';
import { Checkbox } from '../ui/checkbox';

const PERFORMANCE_NODE_SIZE_THRESHOLD = 24;

export const SettingsForm = () => {
  const {
    nodeSize,
    gridWidth,
    gridHeight,
    maxGridWidth,
    maxGridHeight,
    animationSpeed,
    performanceMode,
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
    <Card title='Settings' contentClassName='flex flex-col gap-4'>
      <Label>Node size</Label>
      <Slider
        value={[nodeSize]}
        min={10}
        max={200}
        step={10}
        onValueChange={(v) => {
          if (v[0] <= PERFORMANCE_NODE_SIZE_THRESHOLD) {
            if (performanceMode) return dispatch('nodeSize', v[0]);
            else if (
              window.confirm(
                'This size is only recommended for faster computers, are you sure?'
              )
            ) {
              dispatch('performanceMode', true);
              dispatch('nodeSize', v[0]);
              return;
            }
          }
          dispatch('nodeSize', v[0]);
        }}
      />
      <Label>Grid width</Label>
      <Slider
        value={[columnCount]}
        min={6}
        max={maxColumnCount}
        step={1}
        onValueChange={(v) => dispatch('gridWidth', v[0] * nodeSize)}
      />

      <Label>Grid height</Label>
      <Slider
        value={[rowCount]}
        min={6}
        max={maxRowCount}
        onValueChange={(v) => dispatch('gridHeight', v[0] * nodeSize)}
      />

      <Label>Draw square</Label>
      <Slider
        defaultValue={[10]}
        min={6}
        max={maxSquareSize}
        onValueChange={(v) => dispatch('drawSquare', v[0] * nodeSize)}
      />

      <Label>Animation Speed</Label>
      <Slider
        defaultValue={[animationSpeed]}
        onValueChange={(v) => dispatch('animationSpeed', v[0])}
      />

      <div className='flex items-center space-x-2'>
        <Checkbox
          id='perf'
          checked={performanceMode}
          onCheckedChange={() => dispatch('performanceMode', !performanceMode)}
        />
        <Label htmlFor='perf'>Performance mode</Label>
      </div>
      <Button onClick={reset}>Reset</Button>
    </Card>
  );
};
