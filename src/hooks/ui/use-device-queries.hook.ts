import { useMediaQuery } from 'usehooks-ts';

export const breakPoints = {
  laptop: 82,
  mobile: 43,
  tablet: 62,
};

export const isMobileMq = `(max-width: ${breakPoints.tablet}rem)`;
export const isMobileLandscapeMq = `only screen and (
     (
       (max-height: 62rem) and (max-width: 35rem)
     ) or
     (
       (max-height: 35rem) and (max-width: 62rem)
     )
   ) and (orientation: landscape)`;

export const isMobileOrTabletMq = `(max-width: ${breakPoints.laptop}rem)`;
export const isTabletMq = `(min-width: ${breakPoints.tablet}rem) and (max-width: ${breakPoints.laptop}rem)`;
export const isDesktopMq = `(min-width: ${breakPoints.laptop}rem)`;

interface Return {
  isDesktop: boolean;
  isMobile: boolean;
  isMobileLandscape: boolean;
  isMobileOrTablet: boolean;
  isTablet: boolean;
}

export const useDeviceQueries = (): Return => {
  const isMobile = useMediaQuery(isMobileMq);
  const isMobileOrTablet = useMediaQuery(isMobileOrTabletMq);
  const isTablet = useMediaQuery(isTabletMq);
  const isDesktop = useMediaQuery(isDesktopMq);
  const isMobileLandscape = useMediaQuery(isMobileLandscapeMq);

  return {
    isDesktop,
    isMobile,
    isMobileLandscape,
    isMobileOrTablet,
    isTablet,
  };
};
