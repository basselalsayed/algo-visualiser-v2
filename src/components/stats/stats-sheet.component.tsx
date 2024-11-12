import { useOffsetInfiniteScrollQuery } from '@supabase-cache-helpers/postgrest-swr';
import { throttle } from 'lodash-es';
import { type FC, type UIEvent, useMemo, useRef } from 'react';
import { useEventCallback } from 'usehooks-ts';

import { Tabs } from '../tabs.component';
import { ScrollArea } from '../ui/scroll-area';
import { Sheet, SheetContent } from '../ui/sheet';
import { apiClient } from '@/data/client';
import { mapKeysToCamel } from '@/data/transformers/objects/mapKeysToCamel';
import { useStats } from '@/hooks/state/useStats';
import { useDeviceQueries } from '@/hooks/ui/useDeviceQueries';
import { elementIsFullyScrolled } from '@/lib/utils';

import { StatsCards } from './stats-cards.component';
import { StatsTable } from './stats-table.component';

export const StatsSheet: FC = () => {
  const { dispatch, results: local, resultsSource, statsOpen } = useStats();

  const isGlobal = resultsSource === 'global';

  const { isMobile } = useDeviceQueries();

  const Component = isMobile ? StatsCards : StatsTable;

  const scrollRef = useRef<HTMLDivElement>(null);

  const { data, isValidating, loadMore } = useOffsetInfiniteScrollQuery(
    apiClient.from('algo_result').select().order('id', { ascending: true }),
    { pageSize: 25 }
  );


  const global = useMemo(() => mapKeysToCamel(data), [data]);

  const results = (isGlobal ? global : local) ?? [];

  const onScroll = useEventCallback(
    throttle((e: UIEvent<HTMLDivElement>) => {
      if (
        isGlobal &&
        elementIsFullyScrolled(e.target as HTMLDivElement) &&
        !isValidating
      ) {
        loadMore?.();
      }
    }, 300)
  );

  return (
    <Sheet open={statsOpen} onOpenChange={(v) => dispatch('statsOpen', v)}>
      <SheetContent className='flex flex-col gap-y-4 sm:w-7/12'>
        <h1>Previous runs</h1>
        <Tabs
          defaultValue='local'
          value={resultsSource}
          values={['local', 'global']}
          onValueChange={(v) => dispatch('resultsSource', v)}
        />
        <ScrollArea ref={scrollRef} onScroll={onScroll}>
          <Component results={results} loading={isValidating} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
