import { expect, test } from '@playwright/test';

import {
  algoFormNext,
  assertShortestPathVisisble,
  openAlgoForm,
  resetVisualiser,
  runVisualiser,
  skipTour,
} from './utils';

test.skip('test', async ({ page }) => {
  async function closeStats() {
    await page
      .getByRole('button', { name: 'Close' })
      .click({ timeout: 30_000 });
  }

  await page.goto('/');

  await skipTour(page);
  expect(
    await page.evaluate(() => localStorage.getItem('av-tour-dismissed'))
  ).toBe('true');

  await page.locator('div:nth-child(2)').first().click();
  await page.locator('div:nth-child(15) > div:nth-child(7)').click();
  await runVisualiser(page);
  await expect(
    page.getByRole('heading', { name: 'Run History' })
  ).toBeVisible();

  await closeStats();
  await openAlgoForm(page);
  await algoFormNext(page);
  await runVisualiser(page);
  await closeStats();
  await openAlgoForm(page);
  await algoFormNext(page);

  await runVisualiser(page);
  await closeStats();
  await openAlgoForm(page);
  await algoFormNext(page);
  await runVisualiser(page);
  await closeStats();
  await openAlgoForm(page);
  await algoFormNext(page);
  await runVisualiser(page);
  await closeStats();

  await assertShortestPathVisisble(page, 'dijkstra');
  await assertShortestPathVisisble(page, 'aStarE');
  await assertShortestPathVisisble(page, 'aStarM');
  await assertShortestPathVisisble(page, 'dfs');
  await assertShortestPathVisisble(page, 'bfs');

  await resetVisualiser(page);
});
