import { RotateCcw } from 'lucide-react';

import { SrOnly } from '@/components/sr-only.component';
import { Button } from '@/components/ui/button';
import { HTML_IDS } from '@/lib';
import { useRun } from '@/store';

export const ResetButton = () => {
  const { reset } = useRun();

  return (
    <Button onClick={reset} title='Reset grid' id={HTML_IDS.buttons.reset}>
      <RotateCcw />
      <SrOnly tKey='sr.resetGrid' />
    </Button>
  );
};
