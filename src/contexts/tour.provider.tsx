import { type TFunction } from 'i18next';
import { type FC, type PropsWithChildren, memo, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import { useTranslation } from 'react-i18next';
import Shepherd, {
  type StepOptions,
  type StepOptionsButton,
  type TourOptions,
} from 'shepherd.js';
import { useLocalStorage } from 'usehooks-ts';

import { LanguageSelect } from '@/components';
import { buttonVariants } from '@/components/ui';
import { useDeviceQueries, useMutationObserver } from '@/hooks';
import { HTML_SELECTORS, customEventKeys } from '@/lib';

import { TourContext } from './tour.context';

function renderLanguageSelectStep(t: TFunction<'tour'>) {
  const container = document.createElement('div');

  createRoot(container).render(
    <div className='flex flex-col gap-3'>
      <p>{t('steps.intro.content')}</p>
      <LanguageSelect />
    </div>
  );

  return container;
}

export const TourProvider: FC<PropsWithChildren> = memo(({ children }) => {
  const { t } = useTranslation('tour');
  const { isMobile } = useDeviceQueries();
  const [tourComplete, setTourComplete] = useLocalStorage<boolean>(
    'av-tour-complete',
    false
  );
  const [tourDismissed, setTourDismissed] = useLocalStorage<boolean>(
    'av-tour-dismissed',
    false
  );

  const shepherdCancelButton = useMemo<StepOptionsButton>(
    () => ({
      action(this) {
        this.cancel();
        setTourDismissed(true);
      },
      classes: buttonVariants({ size: 'lg', variant: 'outline' }),
      secondary: true,
      text: t('buttons.cancel'),
    }),
    [setTourDismissed, t]
  );

  const shepherdNextButton = useMemo<StepOptionsButton>(
    () => ({
      action(this) {
        this.next();
      },
      classes: buttonVariants({ size: 'lg', variant: 'secondary' }),
      text: t('buttons.next'),
    }),
    [t]
  );

  const steps = useMemo<StepOptions[]>(
    () =>
      (
        [
          {
            text: () => renderLanguageSelectStep(t),
            title: t('steps.intro.header'),
          },
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
            text: t('steps.maze.header'),
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
            text: t('steps.startNode.header'),
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
            text: t('steps.endNode.header'),
          },
          !isMobile && {
            attachTo: {
              element: HTML_SELECTORS.buttons.algoFormTrigger,
              on: 'auto',
            },
            text: t('steps.algoForm.header'),
          },
          !isMobile && {
            attachTo: {
              element: HTML_SELECTORS.buttons.settingsTrigger,
              on: 'auto',
            },
            text: t('steps.settings.header'),
          },
          {
            attachTo: {
              element: isMobile
                ? HTML_SELECTORS.buttons.sheetTrigger
                : HTML_SELECTORS.buttons.search,
              on: 'auto',
            },
            text: t('steps.search.header'),
          },
          !isMobile && {
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
            text: t('steps.run.header'),
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
            text: t('steps.reset.header'),
          },
          {
            buttons: [shepherdNextButton],
            title: t('complete'),
            when: {
              show: () => setTourComplete(true),
            },
          },
        ] as StepOptions[]
      ).filter(Boolean),
    [isMobile, setTourComplete, shepherdCancelButton, shepherdNextButton, t]
  );

  const options = useMemo<TourOptions>(
    () => ({
      defaultStepOptions: {
        arrow: true,
        buttons: [shepherdNextButton],
      },
      exitOnEsc: false,
    }),
    [shepherdNextButton]
  );

  const tour = useMemo(() => {
    Shepherd.activeTour?.cancel();
    const tourInstance = new Shepherd.Tour(options);

    tourInstance.addSteps(steps);

    return tourInstance;
  }, [options, steps]);

  useMutationObserver({
    callback: () => {
      for (const className of [
        'shepherd-button',
        'shepherd-button-secondary',
        'shepherd-title',
      ]) {
        for (const el of document.querySelectorAll(`.${className}`)) {
          el.classList.remove(className);
        }
      }
    },
    cleanup: true,
    options: {
      attributeFilter: ['class'],
      attributes: true,
      childList: true,
      subtree: true,
    },
  });

  return (
    <TourContext value={{ tour, tourComplete, tourDismissed }}>
      {children}
    </TourContext>
  );
});
