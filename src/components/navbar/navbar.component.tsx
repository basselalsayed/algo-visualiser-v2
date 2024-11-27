import { type FC } from 'react';

import { useDeviceQueries } from '@/hooks';

import { DesktopNav } from './desktop-nav.component';
import { MobileNav } from './mobile-nav.component';

export const Navbar: FC = () => {
  const { isMobile } = useDeviceQueries();

  return isMobile ? <MobileNav /> : <DesktopNav />;
};
