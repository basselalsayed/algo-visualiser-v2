import { BrickWall } from 'lucide-react';
import { type FC } from 'react';

import { Button } from '../ui/button';
import { useRun } from '@/hooks/state/useRun';

export const MazeButton: FC<{ run: () => Promise<void> }> = () => {
  const { readyToRunMaze, runMaze } = useRun();

  return (
    <Button onClick={runMaze} disabled={!readyToRunMaze}>
      <BrickWall />
    </Button>
  );
};
