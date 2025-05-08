import { type Page, expect } from '@playwright/test';

import { type AlgoName } from '@/algorithms/types';

export const getCommandKButton = (page: Page) =>
  page.getByRole('button', { name: /⌘K|\^K/ });

export const openCommandKButton = (page: Page) =>
  getCommandKButton(page).click();

export const openCommandKKbd = (page: Page) =>
  page.locator('body').press('ControlOrMeta+k');

export const getShortestPathGroup = (page: Page, algo: AlgoName) =>
  page.locator(`g#g-${algo}`);

export const getShortestPathTooltip = (page: Page, algo: AlgoName) =>
  page.locator(`#tooltip-${algo}`);

export async function assertShortestPathVisisble(page: Page, algo: AlgoName) {
  await expect(getShortestPathGroup(page, algo)).toBeVisible();
  await expect(getShortestPathTooltip(page, algo)).toBeVisible();
}

export const openAlgoForm = (page: Page) =>
  page.getByRole('button', { name: 'Algorithms' }).click();

export const algoFormNext = (page: Page) =>
  page.getByRole('button', { name: 'Next slide' }).click();

export const runVisualiser = (page: Page) =>
  page.getByRole('button', { name: 'Play' }).click();

export const resetVisualiser = (page: Page) =>
  page.getByRole('button', { name: 'Reset grid' }).click();

export async function skipTour(page: Page) {
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'No thanks' }).click();
}
