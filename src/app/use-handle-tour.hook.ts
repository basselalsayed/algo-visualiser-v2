import { useEffect } from 'react';

import { useTour } from '@/contexts';

export function useHandleTour() {
  const { tour, tourComplete, tourDismissed } = useTour();

  useEffect(() => {
    if (!tour.isActive() && !tourComplete && !tourDismissed) tour.start();
  }, [tour, tourComplete, tourDismissed]);
}
