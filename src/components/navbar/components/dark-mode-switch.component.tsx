import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from 'usehooks-ts';

import { Switch } from '@/components/ui';

export const DarkModeSwitch = () => {
  const { isDarkMode, toggle } = useDarkMode();

  const Component = isDarkMode ? Moon : Sun;

  return (
    <Switch
      onCheckedChange={toggle}
      checked={isDarkMode}
      thumbChildren={<Component size={'0.75rem'} />}
      title='Toggle dark mode'
    />
  );
};
