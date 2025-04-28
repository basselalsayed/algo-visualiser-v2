import { useEffect } from 'react';

import { useTour } from '@/contexts';

export function useHandleTour() {
  const { startTour, tourComplete, tourDismissed } = useTour();

  useEffect(() => {
    if (!tourComplete && !tourDismissed) startTour();
  }, [startTour, tourComplete, tourDismissed]);
}
