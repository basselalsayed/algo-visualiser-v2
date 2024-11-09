import { RotateCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useRun } from '@/hooks/state/useRun';

export const ResetButton = () => {
  const { reset } = useRun();

  return (
    <Button onClick={reset} title='Reset grid'>
      <RotateCcw />
      <span className='sr-only'>Reset grid</span>
    </Button>
  );
};
