import { produce } from 'immer';
import { create } from 'zustand';

import { createSelectors } from './create-selectors.functoin';
import { type DispatchFunction } from './types';

interface CommandStore {
  dispatch: DispatchFunction<CommandStore, 'dispatch'>;
  open: boolean;
  search: string;
}

export const useCommand = createSelectors(
  create<CommandStore>((set) => ({
    dispatch: (type, payload) =>
      set(
        produce<CommandStore>((state) => {
          state[type] = payload;
        })
      ),
    open: false,
    search: '',
  }))
);
