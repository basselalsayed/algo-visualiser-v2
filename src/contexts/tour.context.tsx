import { type Tour } from 'shepherd.js';

import { defineContext } from './define-context.fn';

export const [TourContext, useTour] = defineContext<{
  tour: Tour;
  tourComplete: boolean;
  tourDismissed: boolean;
}>('Tour');
