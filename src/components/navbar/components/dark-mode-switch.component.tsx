import { useTranslation } from 'react-i18next';

import { SVGGradWrapper } from '@/components';
import { Switch } from '@/components/ui';
import { useDarkMode } from '@/hooks';

export const DarkModeSwitch = () => {
  const { IconComponent, isDarkMode, toggle } = useDarkMode();

  const { t } = useTranslation();

  return (
    <Switch
      variant='icon'
      onCheckedChange={toggle}
      checked={isDarkMode}
      thumbChildren={
        <SVGGradWrapper>
          <IconComponent size={'1.25rem'} />
        </SVGGradWrapper>
      }
      title={t(
        isDarkMode ? 'commandk.darkMode.disable' : 'commandk.darkMode.enable'
      )}
    />
  );
};
