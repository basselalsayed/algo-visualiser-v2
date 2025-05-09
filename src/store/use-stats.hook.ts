import { createDraft, finishDraft, produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { type RuntimeInfo } from '@/algorithms';
import { sleep } from '@/lib';

import { createSelectors } from './create-selectors.functoin';
import { type DispatchFunction } from './types';

export type ResultsSource = 'stats.local' | 'stats.global';

interface StatsStore {
  addResult: (result: RuntimeInfo, openStats: boolean) => Promise<void>;
  dispatch: DispatchFunction<StatsStore, 'dispatch' | 'addResult' | 'results'>;
  results: RuntimeInfo[];
  resultsSource: ResultsSource;
  statsOpen: boolean;
}

export const useStats = createSelectors(
  create(
    persist<StatsStore>(
      (set, get) => ({
        addResult: async (result, openStats) => {
          const draft = createDraft(get());
          draft.results.push(result);
          await sleep(300);
          if (openStats) {
            draft.statsOpen = true;
          }

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
        statsOpen: false,
      }),
      {
        name: 'statsStorage',
      }
    )
  )
);
