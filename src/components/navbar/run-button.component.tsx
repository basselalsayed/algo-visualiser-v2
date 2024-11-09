import { PauseIcon, PlayIcon, Repeat1 } from 'lucide-react';
import { type FC, type ReactElement } from 'react';

import { Button } from '../ui/button';
import { useRun } from '@/hooks/state/useRun';

export const RunButton: FC = () => {
  const { readyToRun, run, runState } = useRun();

  let icon: ReactElement;

  switch (runState) {
    case 'idle':
    case 'paused':
      icon = <PlayIcon />;
      break;
    case 'running': {
      icon = <PauseIcon />;
      break;
    }
    case 'done': {
      icon = <Repeat1 />;
      break;
    }
  }

  return (
    <Button onClick={run} disabled={!readyToRun}>
      {icon}
    </Button>
  );
};
