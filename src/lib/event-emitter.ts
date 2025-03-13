import { HTML_SELECTORS } from './constants';

export const customEventKeys = {
  endSelected: 'endSelected',
  mazeComplete: 'mazeComplete',
  runComplete: 'runComplete',
  startSelected: 'startSelected',
};

export const customEvents = {
  endSelected: new CustomEvent(customEventKeys.endSelected),
  mazeComplete: new CustomEvent(customEventKeys.mazeComplete),
  runComplete: new CustomEvent(customEventKeys.runComplete),
  startSelected: new CustomEvent(customEventKeys.startSelected),
};

class CustomEventEmitter {
  emit(event: keyof typeof customEvents) {
    document
      .querySelector(HTML_SELECTORS.components.grid)
      ?.dispatchEvent(customEvents[event]);
  }
}

export const eventEmitter = new CustomEventEmitter();
