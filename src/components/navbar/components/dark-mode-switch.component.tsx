import { useTranslation } from 'react-i18next';

import { Switch } from '@/components/ui';
import { useDarkMode } from '@/hooks';

export const DarkModeSwitch = () => {
  const { IconComponent, isDarkMode, toggle } = useDarkMode();

  const { t } = useTranslation();

  return (
    <Switch
      onCheckedChange={toggle}
      checked={isDarkMode}
      thumbChildren={<IconComponent size={'0.75rem'} />}
      title={t(
        isDarkMode ? 'commandk.darkMode.disable' : 'commandk.darkMode.enable'
      )}
    />
  );
};
