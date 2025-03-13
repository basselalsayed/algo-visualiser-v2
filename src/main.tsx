import { MotionConfig } from 'framer-motion';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MathJaxProvider } from 'react-hook-mathjax';
import { SWRConfig } from 'swr';

import { App } from './app/app-component.tsx';

import './index.css';
import './i18n.ts';
import 'shepherd.js/dist/css/shepherd.css';
import { TourProvider } from './contexts/tour.context.tsx';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <SWRConfig
      value={{
        revalidateIfStale: false,
        revalidateOnFocus: false,
      }}
    >
      <MotionConfig reducedMotion='user'>
        <MathJaxProvider
          options={{
            options: { enableMenu: false },
          }}
        />
        <TourProvider>
        <App />
        </TourProvider>
      </MotionConfig>
    </SWRConfig>
  </StrictMode>
);
