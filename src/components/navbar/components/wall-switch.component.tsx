import { useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

import { Label, Switch } from '@/components/ui';
import { useGrid } from '@/hooks/state/useGrid';

export const WallSwitch = () => {
  const { dispatch, wallMode } = useGrid(
    useShallow(({ dispatch, wallMode }) => ({ dispatch, wallMode }))
  );

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
