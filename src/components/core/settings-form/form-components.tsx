import { type FC } from 'react';

import { Slider } from '@/components/slider.component';
import { Checkbox, Label } from '@/components/ui';
import { useDimensions } from '@/hooks/core/useDimensions';
import { useSettings } from '@/hooks/state/useSettings';

import { PERFORMANCE_NODE_SIZE_THRESHOLD } from './constants';

export const NodeSizeSlider: FC = () => {
  const { dispatch, nodeSize, performanceMode } = useSettings();

  return (
    <Slider
      label='Node size'
      value={[nodeSize]}
      min={10}
      max={200}
      step={10}
      onValueChange={(v) => {
        if (v[0] <= PERFORMANCE_NODE_SIZE_THRESHOLD) {
          if (performanceMode) return dispatch('nodeSize', v[0]);
          else if (
            window.confirm(
              'This size is only recommended for faster devices, are you sure?'
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
  );
};

export const GridWidthSlider: FC = () => {
  const { dispatch, nodeSize } = useSettings();
  const { columnCount, maxColumnCount } = useDimensions();

  return (
    <Slider
      label='Grid width'
      value={[columnCount]}
      min={6}
      max={maxColumnCount}
      step={1}
      onValueChange={(v) => dispatch('gridWidth', v[0] * nodeSize)}
    />
  );
};

export const GridHeightSlider: FC = () => {
  const { dispatch, nodeSize } = useSettings();
  const { maxRowCount, rowCount } = useDimensions();

  return (
    <Slider
      label='Grid height'
      value={[rowCount]}
      min={6}
      max={maxRowCount}
      onValueChange={(v) => dispatch('gridHeight', v[0] * nodeSize)}
    />
  );
};

export const DrawSquareSlider: FC = () => {
  const { dispatch, nodeSize } = useSettings();
  const { maxSquareSize } = useDimensions();

  return (
    <Slider
      label='Draw square'
      defaultValue={[10]}
      min={6}
      max={maxSquareSize}
      onValueChange={(v) => dispatch('drawSquare', v[0] * nodeSize)}
    />
  );
};

export const AnimationSpeedSlider: FC = () => {
  const { animationSpeed, dispatch } = useSettings();

  return (
    <Slider
      label='Animation Speed'
      defaultValue={[animationSpeed]}
      onValueChange={(v) => dispatch('animationSpeed', v[0])}
    />
  );
};

export const PerformanceCheckbox: FC = () => {
  const { dispatch, performanceMode } = useSettings();

  return (
    <div className='flex items-center space-x-2'>
      <Checkbox
        id='perf'
        checked={performanceMode}
        onCheckedChange={() => dispatch('performanceMode', !performanceMode)}
      />
      <Label htmlFor='perf'>Performance mode</Label>
    </div>
  );
};
