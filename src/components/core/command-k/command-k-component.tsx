import { GlobeIcon } from '@radix-ui/react-icons';
import {
  ChevronsLeftRight,
  ChevronsUpDown,
  MoveDiagonal2,
  Navigation,
  Scaling,
} from 'lucide-react';
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';

import {
  AlgoFormMini,
  AnimationSpeedSlider,
  DrawSquareSlider,
  GridHeightSlider,
  GridWidthSlider,
  LanguageSelect,
  NodeSizeSlider,
} from '@/components';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from '@/components/ui';
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
  CommandKItem,
  DarkModeCommandItem,
  MazeRunCommandItem,
  RandomiseWallsCommandItem,
  ResetGridCommandItem,
  RunCommandItem,
  ShowStatsCommandItem,
  StartTourCommandItem,
  WallModeCommandItem,
} from './command-items';

export const CommandKComponent: FC = () => {
  const { dispatch, open, search } = useCommand();

  const { t } = useTranslation();

  return (
    <CommandDialog open={open} onOpenChange={(v) => dispatch('open', v)}>
      <CommandInput
        value={search}
        onValueChange={(v) => dispatch('search', v)}
        placeholder={t('commandk.searchPlaceholder')}
      />

      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading={t('commandk.headings.actions')}>
          <RunCommandItem />
          <MazeRunCommandItem />
          <ShowStatsCommandItem />
          <ResetGridCommandItem />
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading={t('commandk.headings.controls')}>
          <CommandKItem
            icon={<Navigation />}
            shortcut={EDIT_ALGORITHM}
            tKey='commandk.algorithm'
          >
            <ul className='flex flex-wrap justify-center gap-2'>
              <AlgoFormMini />
            </ul>
          </CommandKItem>

          <WallModeCommandItem />
          <DarkModeCommandItem />
          <CommandKItem icon={<GlobeIcon />}>
            <LanguageSelect />
          </CommandKItem>
        </CommandGroup>
        <CommandGroup heading={t('commandk.headings.settings')}>
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

          <CommandGroup heading={t('commandk.headings.misc')}>
            <RandomiseWallsCommandItem />
            <StartTourCommandItem />
          </CommandGroup>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
