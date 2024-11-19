import { Moon, Sun } from 'lucide-react';
import { useDarkMode as _useDarkMode } from 'usehooks-ts';

export const useDarkMode = () => {
  const value = _useDarkMode();

  const IconComponent = value.isDarkMode ? Moon : Sun;

  return { ...value, IconComponent };
};
