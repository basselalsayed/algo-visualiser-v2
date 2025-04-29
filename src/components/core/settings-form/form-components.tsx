import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Slider } from '@/components/slider.component';
import { Checkbox, Label } from '@/components/ui';
import { useDimensions, useSettings } from '@/hooks';
import { Duration } from '@/lib';

import { MAX_NODE_SIZE, MIN_NODE_SIZE, NODE_SIZE_STEP } from './constants';
import { updateNodeSize } from './utils';

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
  const { t } = useTranslation();

  return (
    <Slider
      label={t('settings.gridHeight')}
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
  const { t } = useTranslation();

  return (
    <Slider
      label={t('settings.drawSquare')}
      defaultValue={[10]}
      min={6}
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
      min={-200}
      max={-1}
      step={-1}
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
