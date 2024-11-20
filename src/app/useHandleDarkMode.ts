import { useEffect } from 'react';

import { useDarkMode } from '@/hooks';

export const useHandleDarkMode = () => {
  const { isDarkMode, prefersDark, setDarkMode } = useDarkMode();

  useEffect(() => {
    setDarkMode(prefersDark);
  }, [prefersDark, setDarkMode]);

  useEffect(() => {
    const rootClasses = window.document.documentElement.classList;

    rootClasses.remove('dark', 'light');

    rootClasses.add(isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);
};
