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
  document.documentElement.dataset.e2e = '';

  const { worker } = await import('__msw__/browser.ts');

  await worker.start();
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
      <MathJaxProvider
        options={{
          options: { enableMenu: false },
        }}
      />
      <TourProvider>
        <App />
      </TourProvider>
    </SWRConfig>
  </StrictMode>
);
