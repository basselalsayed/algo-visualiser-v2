import { useTranslation } from 'react-i18next';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useGrid } from '@/store';

export const WallSwitch = () => {
  const dispatch = useGrid.use.dispatch();
  const wallMode = useGrid.use.wallMode();

  const { t } = useTranslation();

  return (
    <div className='flex items-center gap-x-2 px-4'>
      <Switch
        id='wall-mode'
        checked={wallMode}
        onCheckedChange={(v) => dispatch('wallMode', v)}
      />
      <Label
        htmlFor='wall-mode'
        onClick={() => dispatch('wallMode', !wallMode)}
      >
        {t('navbar.wallSwitch')}
      </Label>
    </div>
  );
};
