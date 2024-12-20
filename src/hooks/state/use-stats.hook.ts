import { createDraft, finishDraft, produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type RuntimeInfo } from '@/lib/algorithms';
import { sleep } from '@/lib/utils';

import { type DispatchFunction } from './types';

export type ResultsSource = 'stats.local' | 'stats.global';

interface StatsStore {
  addResult: (result: RuntimeInfo) => void;
  dispatch: DispatchFunction<StatsStore, 'dispatch' | 'addResult' | 'results'>;
  results: RuntimeInfo[];
  resultsSource: ResultsSource;
  statsOpen: boolean;
}

export const useStats = create(
  persist<StatsStore>(
    (set, get) => ({
      addResult: async (result) => {
        const draft = createDraft(get());
        draft.results.push(result);
        await sleep(300);
        draft.statsOpen = true;

        return set(finishDraft(draft));
      },
      dispatch: (type, payload) =>
        set(
          produce<StatsStore>((state) => {
            state[type] = payload;
          })
        ),
      results: [],
      resultsSource: 'stats.local',
      statsOpen: true,
    }),
    {
      name: 'statsStorage',
    }
  )
);
