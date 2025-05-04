import { HTML_SELECTORS } from '@/lib/constants/id';

export const customEventKeys = {
  algoChanged: 'algoChanged',
  endSelected: 'endSelected',
  mazeComplete: 'mazeComplete',
  runComplete: 'runComplete',
  startSelected: 'startSelected',
} as const;

export const customEvents = Object.fromEntries(
  Object.keys(customEventKeys).map((key) => [key, new CustomEvent(key)])
) as { [K in keyof typeof customEventKeys]: CustomEvent };

export function emitCustomEvent(event: keyof typeof customEvents) {
  document
    .querySelector(HTML_SELECTORS.components.grid)
    ?.dispatchEvent(customEvents[event]);
}
