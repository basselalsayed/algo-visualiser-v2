import { useTranslation } from 'react-i18next';

import { Card } from '../../card.component';
import { Button } from '../../ui/button';
import { useSettings } from '@/hooks/state/useSettings';

import {
  AnimationSpeedSlider,
  DrawSquareSlider,
  GridHeightSlider,
  GridWidthSlider,
  NodeSizeSlider,
  PerformanceCheckbox,
} from './form-components';

export const SettingsForm = () => {
  const { reset } = useSettings();
  const { t } = useTranslation();

  return (
    <Card title={t('settings.title')} contentClassName='flex flex-col gap-4'>
      <NodeSizeSlider />
      <GridWidthSlider />
      <GridHeightSlider />
      <DrawSquareSlider />
      <AnimationSpeedSlider />
      <PerformanceCheckbox />
      <Button onClick={reset}>{t('settings.reset')}</Button>
    </Card>
  );
};
