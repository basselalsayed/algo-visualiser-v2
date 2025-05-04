import { PauseIcon, PlayIcon, Repeat1 } from 'lucide-react';
import { type FC, type ReactElement } from 'react';
import { match } from 'ts-pattern';

import { SrOnly } from '@/components/sr-only.component';
import { Button } from '@/components/ui/button';
import { HTML_IDS, RunState } from '@/lib';
import { useRun } from '@/store';

export const RunButton: FC = () => {
  const { readyToRun, run, runState } = useRun();
  /*  eslint-disable react/jsx-key */
  const [icon, tKey] = match(runState)
    .returnType<[ReactElement, TKey]>()
    .with(RunState.idle, RunState.paused, () => [<PlayIcon />, 'sr.play'])
    .with(RunState.running, () => [<PauseIcon />, 'sr.pause'])
    .with(RunState.done, () => [<Repeat1 />, 'sr.replay'])
    .exhaustive();
  /*  eslint-enable react/jsx-key */

  return (
    <Button
      onClick={run}
      disabled={!readyToRun}
      id={HTML_IDS.buttons.run}
      variant='secondary'
    >
      {icon}
      <SrOnly tKey={tKey} />
    </Button>
  );
};
