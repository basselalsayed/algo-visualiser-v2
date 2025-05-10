import { useOffsetInfiniteScrollQuery } from '@supabase-cache-helpers/postgrest-swr';
import { throttle } from 'lodash-es';
import { type FC, type UIEvent, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useEventCallback } from 'usehooks-ts';

import { apiClient, mapKeysToCamel } from '@/data';
import { useDeviceQueries } from '@/hooks';
import { elementIsFullyScrolled } from '@/lib';
import { useStats } from '@/store';

import { Tabs } from '../tabs.component';
import { ScrollArea } from '../ui/scroll-area';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/sheet';

import { StatsCards } from './stats-cards.component';
import { StatsTable } from './stats-table.component';

export const StatsSheet: FC = () => {
  const { dispatch, results: local, resultsSource, statsOpen } = useStats();

  const isGlobal = resultsSource === 'stats.global';

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

  const { t } = useTranslation();

  return (
    <Sheet open={statsOpen} onOpenChange={(v) => dispatch('statsOpen', v)}>
      <SheetContent className='flex flex-col gap-y-4 sm:w-7/12'>
        <SheetHeader>
          <SheetTitle>{t('stats.title')}</SheetTitle>
          <SheetDescription className='sr-only'>
            {t('stats.title')}
          </SheetDescription>
        </SheetHeader>
        <Tabs
          defaultValue='stats.local'
          value={resultsSource}
          values={['stats.local', 'stats.global']}
          onValueChange={(v) => dispatch('resultsSource', v)}
        />
        <ScrollArea ref={scrollRef} onScroll={onScroll}>
          <Component results={results} loading={isValidating} />
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};
