import { renderDialogSnapshot, renderFragmentSnapshot } from '@/test/utils';

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from './command';

describe('Command UI snapshot', () => {
  it('looks the same', () => {
    expect(
      renderFragmentSnapshot(
        <Command>
          <CommandInput placeholder='Type a command...' />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading='Suggestions'>
              <CommandItem>
                Profile
                <CommandShortcut primaryKey='P'>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                Settings
                <CommandShortcut primaryKey='S'>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading='Actions'>
              <CommandItem>Logout</CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      )
    ).toMatchSnapshot();
  });

  it('renders CommandDialog correctly', () => {
    expect(
      renderDialogSnapshot(
        <CommandDialog open>
          <CommandInput placeholder='Search...' />
          <CommandList>
            <CommandItem>Option 1</CommandItem>
            <CommandItem>Option 2</CommandItem>
          </CommandList>
        </CommandDialog>
      )
    ).toMatchSnapshot();
  });
});
