import { BrickWall } from 'lucide-react';
import { type FC } from 'react';

import { SrOnly } from '@/components';
import { Button } from '@/components/ui';
import { useRun } from '@/hooks';

export const MazeButton: FC = () => {
  const { readyToRunMaze, runMaze } = useRun();

  return (
    <Button onClick={runMaze} disabled={!readyToRunMaze}>
      <BrickWall />
      <SrOnly tKey='sr.buildMaze' />
    </Button>
  );
};
