import { RotateCcw } from 'lucide-react';

import { SrOnly } from '@/components';
import { Button } from '@/components/ui';
import { useRun } from '@/hooks';

export const ResetButton = () => {
  const { reset } = useRun();

  return (
    <Button onClick={reset} title='Reset grid'>
      <RotateCcw />
      <SrOnly tKey='sr.resetGrid' />
    </Button>
  );
};
