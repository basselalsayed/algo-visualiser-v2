import { PauseIcon, PlayIcon, Repeat1 } from 'lucide-react';
import { type FC, type ReactElement } from 'react';
import { match } from 'ts-pattern';

import { SrOnly } from '@/components';
import { Button } from '@/components/ui';
import { useRun } from '@/hooks/state/useRun';

export const RunButton: FC = () => {
  const { readyToRun, run, runState } = useRun();

  const [icon, tKey] = match(runState)
    .returnType<[ReactElement, TKey]>()
    .with('idle', 'paused', () => [<PlayIcon />, 'sr.play'])
    .with('running', () => [<PauseIcon />, 'sr.pause'])
    .with('done', () => [<Repeat1 />, 'sr.replay'])
    .exhaustive();

  return (
    <Button onClick={run} disabled={!readyToRun}>
      {icon}
      <SrOnly tKey={tKey} />
    </Button>
  );
};
