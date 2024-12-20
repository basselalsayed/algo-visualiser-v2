import { useEffect } from 'react';

import { useDarkMode } from '@/hooks';

export const useHandleDarkMode = () => {
  const { isDarkMode, prefersDark, setDarkMode } = useDarkMode();

  useEffect(() => {
    setDarkMode(prefersDark);
  }, [prefersDark, setDarkMode]);

  useEffect(() => {
    const rootClasses = globalThis.document.documentElement.classList;

    rootClasses.toggle('dark', isDarkMode);
  }, [isDarkMode]);
};
