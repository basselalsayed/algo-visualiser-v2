import { renderFragmentSnapshot } from '@/test/utils';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from './navigation-menu';

describe('NavigationMenu.component', () => {
  it('looks the same', () => {
    expect(
      renderFragmentSnapshot(
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger />
              <NavigationMenuContent />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )
    ).toMatchSnapshot();
  });
});
