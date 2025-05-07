import { MotionConfig, MotionGlobalConfig } from 'motion/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MathJaxProvider } from 'react-hook-mathjax';
import { SWRConfig } from 'swr';

import { TourProvider } from '@/components';

import { App } from './app/app-component.tsx';
import { Toaster } from './components/ui';

import './index.css';
import './i18n.ts';
import 'shepherd.js/dist/css/shepherd.css';

if (__E2E__) {
  MotionGlobalConfig.skipAnimations = true;
  document.documentElement.dataset.e2e = '';
}

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
