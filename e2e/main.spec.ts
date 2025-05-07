import { expect, test } from '@playwright/test';

import {
  algoFormNext,
  assertShortestPathVisisble,
  openAlgoForm,
  resetVisualiser,
  runVisualiser,
  skipTour,
} from './utils';

test('test', async ({ page }) => {
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

  await page.getByRole('button', { name: 'Close' }).click();
  await openAlgoForm(page);
  await algoFormNext(page);
  await runVisualiser(page);
  await page.getByRole('button', { name: 'Close' }).click();
  await openAlgoForm(page);
  await algoFormNext(page);

  await runVisualiser(page);
  await page.getByRole('button', { name: 'Close' }).click();
  await openAlgoForm(page);
  await algoFormNext(page);
  await runVisualiser(page);
  await page.getByRole('button', { name: 'Close' }).click();
  await openAlgoForm(page);
  await algoFormNext(page);
  await runVisualiser(page);
  await page.getByRole('button', { name: 'Close' }).click();

  await assertShortestPathVisisble(page, 'dijkstra');
  await assertShortestPathVisisble(page, 'aStarE');
  await assertShortestPathVisisble(page, 'aStarM');
  await assertShortestPathVisisble(page, 'dfs');
  await assertShortestPathVisisble(page, 'bfs');

  await resetVisualiser(page);
});
