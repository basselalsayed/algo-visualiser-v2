/// <reference types="vitest/config" />

import path from 'node:path';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { type PluginOption, defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';

const plugins: PluginOption[] = [react(), tailwindcss()];

if (process.env.BUNDLE_ANALYZE) plugins.push(analyzer());

export default defineConfig({
  define: {
    __E2E__: Boolean(process.env.E2E),
  },
  esbuild: {
    target: 'es2022',
  },
  plugins,
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      __msw__: path.resolve(import.meta.dirname, './__msw__'),
    },
  },
  test: {
    environment: 'jsdom',
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build,eslint,prettier}.config.*',
      'e2e/**/*',
    ],
    globals: true,
    setupFiles: ['src/test/setup.ts', 'src/test/polyfills.ts'],
  },
});
