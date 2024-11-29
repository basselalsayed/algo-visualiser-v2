import { Search } from 'lucide-react';

import { Kbd } from '@/components/kbd-component';
import { Button } from '@/components/ui';
import { useCommand } from '@/hooks';
import { OPEN_COMMAND_KEY } from '@/lib';

export const QuickSearchButton = () => {
  const { dispatch, open } = useCommand();

  return (
    <Button onClick={() => dispatch('open', !open)}>
      <Search />

      <Kbd primaryKey={OPEN_COMMAND_KEY} />
    </Button>
  );
};
