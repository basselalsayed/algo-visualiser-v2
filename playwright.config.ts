import { defineConfig, devices } from '@playwright/test';

const port = 2025;

export default defineConfig({
  expect: { timeout: 10_000 },
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['dot'], ['html', { open: 'never' }]],
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  testDir: './e2e',

  timeout: 3 * 60_000,

  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: `http://localhost:${port}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  webServer: {
    command: `pnpm dev-e2e --port ${port}`,
    port,
    reuseExistingServer: !process.env.CI,
  },

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
});
