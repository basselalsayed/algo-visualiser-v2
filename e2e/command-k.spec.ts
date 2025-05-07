import { expect, test } from '@playwright/test';

import { openCommandKKbd, skipTour } from './utils';

test('test', async ({ page }) => {
  await page.goto('/');

  await skipTour(page);

  await openCommandKKbd(page);

  await expect(
    page.getByPlaceholder('Type a command or search...')
  ).toBeVisible();

  await page
    .getByRole('option', {
      name: /Build maze\s+(⌘|\^)?M/,
    })
    .click();

  await expect(page.locator('div[data-type="wall"]').first()).toBeVisible();

  await openCommandKKbd(page);
  await page.getByRole('option', { name: 'Show previous runs' }).click();
  await expect(
    page.getByRole('heading', { name: 'Run History' })
  ).toBeVisible();
  await page.getByRole('button', { name: 'Close' }).click();

  await page.getByRole('option', { name: 'Reset grid' }).click();
  await page.getByRole('button', { name: 'Close' }).click();
  await expect(page.locator('div[data-type="wall"]')).toHaveCount(0);

  await openCommandKKbd(page);

  await page.getByRole('option', { name: 'Enable wall mode' }).click();
  //   await expect(page.getByText('Disable wall mode')).toBeVisible();
  await page.getByRole('option', { name: 'Disable wall mode' }).click();

  //   await expect(page.getByText('Enable wall mode')).toBeVisible();
  await page.getByRole('option', { name: 'Enable dark mode' }).click();
  //   await expect(page.getByText('Disable dark mode')).toBeVisible();
  await page.getByRole('option', { name: 'Disable dark mode' }).click();

  await page.getByRole('option', { name: 'Randomise walls' }).click();
  await expect(page.locator('div[data-type="wall"]').first()).toBeVisible();

  await openCommandKKbd(page);
  await page.getByRole('option', { name: 'Start tour' }).click();
  await expect(
    page.getByRole('heading', { name: 'Welcome to the Algorithm' })
  ).toBeVisible();
});
