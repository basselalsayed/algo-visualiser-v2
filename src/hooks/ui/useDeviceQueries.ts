import { useMediaQuery } from 'usehooks-ts';

export const breakPoints = {
  laptop: 82,
  mobile: 43,
  tablet: 62,
};

export const isMobileMq = `(max-width: ${breakPoints.tablet}rem)`;
export const isMobileOrTabletMq = `(max-width: ${breakPoints.laptop}rem)`;
export const isTabletMq = `(min-width: ${breakPoints.tablet}rem) and (max-width: ${breakPoints.laptop}rem)`;
export const isDesktopMq = `(min-width: ${breakPoints.laptop}rem)`;

export const useDeviceQueries = () => {
  const isMobile = useMediaQuery(isMobileMq);
  const isMobileOrTablet = useMediaQuery(isMobileOrTabletMq);
  const isTablet = useMediaQuery(isTabletMq);
  const isDesktop = useMediaQuery(isDesktopMq);

  return {
    isDesktop,
    isMobile,
    isMobileOrTablet,
    isTablet,
  };
};
