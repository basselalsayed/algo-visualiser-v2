import { HTML_IDS } from '@/lib';

export const ShortestPathContainer = () => (
  <div id={HTML_IDS.components.shortestPathContainer}>
    <svg
      id={HTML_IDS.components.shortestPathSvg}
      className='pointer-events-none absolute top-0 left-0 h-full w-full'
    />
    <div id={HTML_IDS.components.shortestPathTooltip} />
  </div>
);
