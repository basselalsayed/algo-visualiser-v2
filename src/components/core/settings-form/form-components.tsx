import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import { Slider } from '@/components/slider.component';
import { Checkbox, Label } from '@/components/ui';
import { useDimensions, useSettings } from '@/hooks';

import { PERFORMANCE_NODE_SIZE_THRESHOLD } from './constants';

export const NodeSizeSlider: FC = () => {
  const { dispatch, nodeSize, performanceMode } = useSettings();
  const { t } = useTranslation();

  return (
    <Slider
      label={t('settings.nodeSize')}
      value={[nodeSize]}
      min={10}
      max={200}
      step={10}
      onValueChange={(v) => {
        if (v[0] <= PERFORMANCE_NODE_SIZE_THRESHOLD) {
          if (performanceMode) return dispatch('nodeSize', v[0]);
          else if (globalThis.confirm(t('settings.performanceCheck'))) {
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
      defaultValue={[animationSpeed]}
      onValueChange={(v) => dispatch('animationSpeed', v[0])}
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
