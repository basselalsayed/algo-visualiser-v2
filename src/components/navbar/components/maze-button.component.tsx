import { BrickWall } from 'lucide-react';
import { type FC } from 'react';

import { SrOnly } from '@/components/sr-only.component';
import { Button } from '@/components/ui/button';
import { HTML_IDS } from '@/lib';
import { useRun } from '@/store';

export const MazeButton: FC = () => {
  const { readyToRunMaze, runMaze } = useRun();

  return (
    <Button
      onClick={runMaze}
      disabled={!readyToRunMaze}
      id={HTML_IDS.buttons.maze}
    >
      <BrickWall />
      <SrOnly tKey='sr.buildMaze' />
    </Button>
  );
};
