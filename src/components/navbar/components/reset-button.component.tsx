import { RotateCcw } from 'lucide-react';

import { SrOnly } from '@/components';
import { Button } from '@/components/ui';
import { useRun } from '@/hooks';
import { HTML_IDS } from '@/lib';

export const ResetButton = () => {
  const { reset } = useRun();

  return (
    <Button onClick={reset} title='Reset grid' id={HTML_IDS.buttons.reset}>
      <RotateCcw />
      <SrOnly tKey='sr.resetGrid' />
    </Button>
  );
};
