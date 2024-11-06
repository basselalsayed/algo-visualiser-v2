import { type RuntimeInfo } from '@/lib/algorithms';
import { produce } from 'immer';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface StatsStore {
  statsOpen: boolean;
  setStatsOpen: (open: boolean) => void;
  results: RuntimeInfo[];
  addResult: (result: RuntimeInfo) => void;
}

export const useStats = create(
  persist<StatsStore>(
    (set) => ({
      statsOpen: true,
      setStatsOpen: (open) =>
        set(
          produce((state) => {
            state.statsOpen = open;
          })
        ),
      results: [],
      addResult: (result) =>
        set(
          produce((state) => {
            state.results.push(result);
            state.statsOpen = true;
          })
        ),
    }),
    {
      name: 'statsStorage',
    }
  )
);
