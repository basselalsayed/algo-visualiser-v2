import { MotionConfig } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MathJaxProvider } from 'react-hook-mathjax';
import { SWRConfig } from 'swr';

import { App } from './app/app-component.tsx';
import { Toaster } from './components/ui';
import { TourProvider } from './contexts';

import './index.css';
import './i18n.ts';
import 'shepherd.js/dist/css/shepherd.css';

createRoot(document.querySelector('#root')!).render(
  <StrictMode>
    <Toaster />
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
