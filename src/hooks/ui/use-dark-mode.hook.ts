import { Moon, Sun } from 'lucide-react';
import { useLocalStorage, useMediaQuery } from 'usehooks-ts';

const PREFERS_DARK_QUERY = '(prefers-color-scheme: dark)';

export const useDarkMode = () => {
  const prefersDark = useMediaQuery(PREFERS_DARK_QUERY);
  const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
    'av-dark-mode',
    prefersDark ?? false
  );

  const IconComponent = isDarkMode ? Moon : Sun;

  return {
    disable: () => setDarkMode(false),
    enable: () => setDarkMode(true),
    IconComponent,
    isDarkMode,
    prefersDark,
    setDarkMode,
    toggle: () => setDarkMode((prev) => !prev),
  };
};
