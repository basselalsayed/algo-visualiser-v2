import { Search } from 'lucide-react';
import { type FC } from 'react';

import { Kbd } from '@/components/kbd-component';
import { Button } from '@/components/ui/button';
import { HTML_IDS, OPEN_COMMAND_KEY } from '@/lib';
import { useCommand } from '@/store';

export const QuickSearchButton: FC<{ showKbd?: boolean }> = ({
  showKbd = true,
}) => {
  const { dispatch, open } = useCommand();

  return (
    <Button
      onClick={() => dispatch('open', !open)}
      id={HTML_IDS.buttons.search}
    >
      <Search />

      {showKbd && <Kbd primaryKey={OPEN_COMMAND_KEY} />}
    </Button>
  );
};
