import { type FC, type PropsWithChildren, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import Shepherd, {
  type StepOptions,
  type StepOptionsButton,
  type Tour,
  type TourOptions,
} from 'shepherd.js';

import { HTML_SELECTORS, customEventKeys } from '@/lib';

import { defineContext } from './define-context.fn';

// eslint-disable-next-line react-refresh/only-export-components
export const [TourContext, useTour] = defineContext<Tour>('Tour');

export const TourProvider: FC<PropsWithChildren> = ({ children }) => {
  const { t } = useTranslation('tour');

  const shepherdCancelButton = useMemo<StepOptionsButton>(
    () => ({
      action(this) {
        this.cancel();
      },
      text: t('buttons.cancel'),
    }),
    [t]
  );

  const shepherdNextButton = useMemo<StepOptionsButton>(
    () => ({
      action(this) {
        this.next();
      },
      text: t('buttons.next'),
    }),
    [t]
  );

  const steps = useMemo<StepOptions[]>(
    () => [
      {
        buttons: [shepherdCancelButton, shepherdNextButton],
        text: t('intro'),
      },
      {
        text: t('description'),
      },
      {
        attachTo: {
          element: HTML_SELECTORS.components.grid,
          on: 'auto',
        },
        text: t('steps.grid.content'),
        title: t('steps.grid.header'),
      },
      {
        attachTo: {
          element: HTML_SELECTORS.tutorial.node,
          on: 'auto',
        },
        text: t('steps.node.content'),
        title: t('steps.node.header'),
      },
      {
        advanceOn: {
          event: customEventKeys.mazeComplete,
          selector: HTML_SELECTORS.components.grid,
        },
        attachTo: {
          element: HTML_SELECTORS.buttons.maze,
          on: 'auto',
        },
        buttons: undefined,
        title: t('steps.maze.header'),
      },
      {
        advanceOn: {
          event: customEventKeys.startSelected,
          selector: HTML_SELECTORS.components.grid,
        },
        attachTo: {
          element: HTML_SELECTORS.components.grid,
          on: 'auto',
        },
        buttons: undefined,
        title: t('steps.startNode.header'),
      },
      {
        advanceOn: {
          event: customEventKeys.endSelected,
          selector: HTML_SELECTORS.components.grid,
        },
        attachTo: {
          element: HTML_SELECTORS.components.grid,
          on: 'auto',
        },
        buttons: undefined,
        title: t('steps.endNode.header'),
      },
      {
        attachTo: {
          element: HTML_SELECTORS.buttons.algoFormTrigger,
          on: 'auto',
        },
        title: t('steps.algoForm.header'),
      },
      {
        attachTo: {
          element: HTML_SELECTORS.buttons.settingsTrigger,
          on: 'auto',
        },
        title: t('steps.settings.header'),
      },
      {
        attachTo: {
          element: HTML_SELECTORS.buttons.search,
          on: 'auto',
        },
        title: t('steps.search.header'),
      },
      {
        attachTo: {
          element: HTML_SELECTORS.components.grid,
          on: 'auto',
        },
        text: t('steps.kbd.content'),
        title: t('steps.kbd.header'),
      },
      {
        advanceOn: {
          event: customEventKeys.runComplete,
          selector: HTML_SELECTORS.components.grid,
        },
        attachTo: {
          element: HTML_SELECTORS.buttons.run,
          on: 'auto',
        },
        buttons: undefined,
        title: t('steps.run.header'),
      },

      {
        advanceOn: {
          event: 'click',
          selector: HTML_SELECTORS.buttons.reset,
        },
        attachTo: {
          element: HTML_SELECTORS.buttons.reset,
          on: 'auto',
        },
        buttons: undefined,
        title: t('steps.reset.header'),
      },
      {
        buttons: [shepherdNextButton],
        title: t('complete'),
      },
    ],
    [shepherdCancelButton, shepherdNextButton, t]
  );

  const options = useMemo<TourOptions>(
    () => ({
      defaultStepOptions: {
        arrow: true,
        buttons: [shepherdNextButton],
      },
    }),
    [shepherdNextButton]
  );

  const tour = useMemo(() => {
    const tourInstance = new Shepherd.Tour(options);

    tourInstance.addSteps(steps);

    return tourInstance;
  }, [options, steps]);

  return <TourContext.Provider value={tour}>{children}</TourContext.Provider>;
};
