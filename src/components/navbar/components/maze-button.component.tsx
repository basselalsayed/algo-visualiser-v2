import { BrickWall } from 'lucide-react';
import { type FC } from 'react';

import { SrOnly } from '@/components';
import { Button } from '@/components/ui';
import { useRun } from '@/hooks';
import { HTML_IDS } from '@/lib';

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
