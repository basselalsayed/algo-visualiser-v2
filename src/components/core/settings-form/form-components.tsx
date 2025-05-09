import { mean } from 'lodash-es';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Slider } from '@/components/slider.component';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useDimensions } from '@/hooks';
import {
  ANIMATION_SPEED_STEP,
  Duration,
  GRID_HEIGHT_STEP,
  GRID_WIDTH_STEP,
  MAX_ANIMATION_SPEED,
  MAX_NODE_SIZE,
  MIN_ANIMATION_SPEED,
  MIN_GRID_HEIGHT,
  MIN_GRID_WIDTH,
  MIN_NODE_SIZE,
  MIN_SQUARE_SIZE,
  NODE_SIZE_STEP,
} from '@/lib';
import { updateNodeSize, useSettings } from '@/store';

export const NodeSizeSlider: FC = () => {
  const { nodeSize } = useSettings();
  const { t } = useTranslation();

  return (
    <Slider
      label={t('settings.nodeSize')}
      value={[nodeSize]}
      min={MIN_NODE_SIZE}
      max={MAX_NODE_SIZE}
      step={NODE_SIZE_STEP}
      onValueChange={(v) => updateNodeSize(v[0])}
    />
  );
};

export const GridWidthSlider: FC = () => {
  const { dispatch, nodeSize } = useSettings();
  const { columnCount, maxColumnCount } = useDimensions();
  const { t } = useTranslation();

  return (
    <Slider
      label={t('settings.gridWidth')}
      value={[columnCount]}
      min={MIN_GRID_WIDTH}
      max={maxColumnCount}
      step={GRID_WIDTH_STEP}
      onValueChange={(v) => dispatch('gridWidth', v[0] * nodeSize)}
    />
  );
};

export const GridHeightSlider: FC = () => {
  const { dispatch, nodeSize } = useSettings();
  const { maxRowCount, rowCount } = useDimensions();
  const { t } = useTranslation();

  return (
    <Slider
      label={t('settings.gridHeight')}
      value={[rowCount]}
      min={MIN_GRID_HEIGHT}
      max={maxRowCount}
      step={GRID_HEIGHT_STEP}
      onValueChange={(v) => dispatch('gridHeight', v[0] * nodeSize)}
    />
  );
};

export const DrawSquareSlider: FC = () => {
  const { dispatch, nodeSize } = useSettings();
  const { maxSquareSize } = useDimensions();
  const { t } = useTranslation();

  return (
    <Slider
      label={t('settings.drawSquare')}
      defaultValue={[mean([MIN_SQUARE_SIZE, maxSquareSize])]}
      min={MIN_SQUARE_SIZE}
      max={maxSquareSize}
      onValueChange={(v) => dispatch('drawSquare', v[0] * nodeSize)}
    />
  );
};

export const AnimationSpeedSlider: FC = () => {
  const { animationSpeed, dispatch } = useSettings();
  const { t } = useTranslation();

  return (
    <Slider
      label={t('settings.animationSpeed')}
      min={MIN_ANIMATION_SPEED}
      max={MAX_ANIMATION_SPEED}
      step={ANIMATION_SPEED_STEP}
      defaultValue={[-animationSpeed.inMillis]}
      onValueChange={(v) =>
        dispatch('animationSpeed', Duration.fromMillis(Math.abs(v[0])))
      }
    />
  );
};

export const PerformanceCheckbox: FC = () => {
  const { dispatch, performanceMode } = useSettings();
  const { t } = useTranslation();

  return (
    <div className='flex items-center space-x-2'>
      <Checkbox
        id='perf'
        checked={performanceMode}
        onCheckedChange={() => dispatch('performanceMode', !performanceMode)}
      />
      <Label htmlFor='perf'>{t('settings.performance')}</Label>
    </div>
  );
};
