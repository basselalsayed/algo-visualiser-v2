import { expect, test } from '@playwright/test';

import {
  algoFormNext,
  assertShortestPathVisisble,
  openAlgoForm,
  resetVisualiser,
  runVisualiser,
} from './utils';

test('test', async ({ page }) => {
  function continueTour() {
    return page.getByRole('button', { name: 'Continue' }).click();
  }

  await page.goto('/');

  await expect(
    page.getByText(
      'Welcome to the Algorithm Visualiser! Please select a language🇬🇧 English'
    )
  ).toBeVisible();
  await continueTour();

  await expect(
    page.getByText(
      'Would you like to take a brief tour? Tour can be restarted anytime via the'
    )
  ).toBeVisible();
  await continueTour();

  await expect(page.getByText('This project showcases how')).toBeVisible();
  await continueTour();

  await expect(page.getByText("This is the grid It's")).toBeVisible();
  await continueTour();

  await expect(page.getByText('This is a node It can be a')).toBeVisible();
  await continueTour();

  await expect(page.getByText('Click the maze button to')).toBeVisible();
  await page.getByRole('button', { name: 'Build maze' }).click();

  await expect(page.getByText('Click any blank node to set a')).toBeVisible();
  await page.locator('div:nth-child(2) > div:nth-child(2)').first().click();
  await page.locator('div:nth-child(14) > div:nth-child(6)').click();

  await expect(page.getByText('Click the run button to')).toBeVisible();
  await runVisualiser(page);
  await assertShortestPathVisisble(page, 'dijkstra');

  await expect(page.getByText('Select another algorithm here')).toBeVisible();
  await openAlgoForm(page);
  await algoFormNext(page);

  await expect(
    page.getByText(
      'Click the run button to compare with the previous algorithm'
    )
  ).toBeVisible();
  await runVisualiser(page);
  await assertShortestPathVisisble(page, 'aStarE');

  await expect(page.getByText('Optionally change settings')).toBeVisible();
  await continueTour();

  await expect(page.getByText('Explore more options here')).toBeVisible();
  await continueTour();

  await expect(
    page.getByRole('heading', { name: 'Enable keyboard navigation of' })
  ).toBeVisible();
  await continueTour();

  await expect(page.getByText('Click to reset the grid')).toBeVisible();
  await resetVisualiser(page);

  await expect(
    page.getByRole('heading', { name: 'Thanks for completing the' })
  ).toBeVisible();
  await continueTour();
  expect(
    await page.evaluate(() => localStorage.getItem('av-tour-complete'))
  ).toBe('true');
});
