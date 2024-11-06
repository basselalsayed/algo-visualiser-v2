import { FC, useRef } from 'react';
import { Sheet, SheetContent } from '../ui/sheet';
import { useStats } from '@/hooks/state/useStats';
import { ScrollArea } from '../ui/scroll-area';
import { useDeviceQueries } from '@/hooks/ui/useDeviceQueries';
import { StatsTable } from './stats-table.component';
import { StatsCards } from './stats-cards.component';

export const StatsSheet: FC = () => {
  const { statsOpen, setStatsOpen, results } = useStats();

  const { isMobile } = useDeviceQueries();

  const Component = isMobile ? StatsCards : StatsTable;

  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <Sheet open={statsOpen} onOpenChange={setStatsOpen}>
      <SheetContent className='sm:w-7/12'>
        <ScrollArea className='h-full' viewPortRef={scrollRef}>
          <Component results={results} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
