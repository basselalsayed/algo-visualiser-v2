import { HTML_SELECTORS } from '../constants';

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

class CustomEventEmitter {
  emit(event: keyof typeof customEvents) {
    document
      .querySelector(HTML_SELECTORS.components.grid)
      ?.dispatchEvent(customEvents[event]);
  }
}

export const eventEmitter = new CustomEventEmitter();
