import { PauseIcon, PlayIcon, Repeat1 } from 'lucide-react';
import { type FC, type ReactElement } from 'react';
import { match } from 'ts-pattern';

import { Button } from '../ui/button';
import { useRun } from '@/hooks/state/useRun';

export const RunButton: FC = () => {
  const { readyToRun, run, runState } = useRun();

  const icon = match(runState)
    .returnType<ReactElement>()
    .with('idle', 'paused', () => <PlayIcon />)
    .with('running', () => <PauseIcon />)
    .with('done', () => <Repeat1 />)
    .exhaustive();

  return (
    <Button onClick={run} disabled={!readyToRun}>
      {icon}
    </Button>
  );
};
