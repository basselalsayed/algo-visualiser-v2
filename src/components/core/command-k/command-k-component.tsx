import {
  ChevronsLeftRight,
  ChevronsUpDown,
  MoveDiagonal2,
  Scaling,
} from 'lucide-react';
import { type FC } from 'react';

import {
  AlgoFormMini,
  AnimationSpeedSlider,
  DrawSquareSlider,
  GridHeightSlider,
  GridWidthSlider,
  NodeSizeSlider,
} from '@/components/core';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui/command';
import { useCommand } from '@/hooks';
import {
  EDIT_ALGORITHM,
  EDIT_ANIMATION_SPEED,
  EDIT_DRAW_SQUARE,
  EDIT_GRID_HEIGHT,
  EDIT_GRID_WIDTH,
  EDIT_NODE_SIZE,
} from '@/lib/constants';

import {
  MazeRunCommandItem,
  RunCommandItem,
  ShowStatsCommandItem,
} from './command-items';

export const CommandKComponent: FC = () => {
  const { dispatch, open, search } = useCommand();

  return (
    <CommandDialog open={open} onOpenChange={(v) => dispatch('open', v)}>
      <CommandInput
        value={search}
        onValueChange={(v) => dispatch('search', v)}
        placeholder='Type a command or search...'
      />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Suggestions'>
          <RunCommandItem />
          <MazeRunCommandItem />
          <ShowStatsCommandItem />
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Settings'>
          <CommandItem>
            <Scaling />
            <NodeSizeSlider />
            <CommandShortcut primaryKey={EDIT_NODE_SIZE} />
          </CommandItem>
          <CommandItem>
            <ChevronsLeftRight />
            <GridWidthSlider />
            <CommandShortcut primaryKey={EDIT_GRID_WIDTH} />
          </CommandItem>
          <CommandItem>
            <ChevronsUpDown />
            <GridHeightSlider />
            <CommandShortcut primaryKey={EDIT_GRID_HEIGHT} />
          </CommandItem>
          <CommandItem>
            <MoveDiagonal2 />
            <DrawSquareSlider />
            <CommandShortcut primaryKey={EDIT_DRAW_SQUARE} />
          </CommandItem>
          <CommandItem>
            <Scaling />
            <AnimationSpeedSlider />
            <CommandShortcut primaryKey={EDIT_ANIMATION_SPEED} />
          </CommandItem>

          <CommandItem>
            <Scaling />
            <span>Algorithm</span>

            <div className='flex flex-wrap justify-center gap-2'>
              <AlgoFormMini />
            </div>

            <CommandShortcut primaryKey={EDIT_ALGORITHM} />
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
