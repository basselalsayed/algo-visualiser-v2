import { expect, test } from '@playwright/test';

import { openCommandKKbd, skipTour } from './utils';

test('test', async ({ page }) => {
  await page.goto('/');
  await skipTour(page);
  await openCommandKKbd(page);

  await page
    .getByRole('group', { name: 'Controls' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇸🇦 العربية' }).click();
  await expect(page.getByLabel('التحكم')).toContainText('تشغيل الوضع الداكن');
  await page
    .getByRole('group', { name: 'التحكم' })
    .getByRole('combobox')
    .click();

  await page.getByRole('option', { name: '🇮🇹 Italiano' }).click();
  await expect(page.getByLabel('Controlli')).toContainText(
    'Attiva modalità scura'
  );
  await page
    .getByRole('group', { name: 'Controlli' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇨🇿 Čeština' }).click();
  await expect(page.getByLabel('Ovládání')).toContainText(
    'Aktivovat tmavý režim'
  );
  await page
    .getByRole('group', { name: 'Ovládání' })
    .getByRole('combobox')
    .click();

  await page.getByRole('option', { name: '🇩🇪 Deutsch' }).click();
  await expect(page.getByLabel('Steuerung')).toContainText(
    'Dunkelmodus aktivieren'
  );
  await page
    .getByRole('group', { name: 'Steuerung' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇬🇷 Ελληνικά' }).click();
  await expect(page.getByLabel('Έλεγχοι')).toContainText(
    'Ενεργοποίηση σκοτεινής λειτουργίας'
  );
  await page
    .getByRole('group', { name: 'Έλεγχοι' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇪🇸 Español' }).click();
  await expect(page.getByLabel('Controles')).toContainText(
    'Activar modo oscuro'
  );
  await page
    .getByRole('group', { name: 'Controles' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇫🇷 Français' }).click();
  await expect(page.getByLabel('Contrôles')).toContainText(
    'Activer le mode sombre'
  );
  await page
    .getByRole('group', { name: 'Contrôles' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇮🇳 हिंदी' }).click();
  await expect(page.getByLabel('नियंत्रण')).toContainText(
    'डार्क मोड सक्षम करें'
  );
  await page
    .getByRole('group', { name: 'नियंत्रण' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇯🇵 日本語' }).click();
  await expect(page.getByLabel('コントロール')).toContainText(
    'ダークモードを有効にする'
  );
  await page
    .getByRole('group', { name: 'コントロール' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇰🇷 한국어' }).click();
  await expect(page.getByLabel('컨트롤')).toContainText('어두운 모드 활성화');
  await page
    .getByRole('group', { name: '컨트롤' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇳🇱 Nederlands' }).click();
  await expect(page.getByLabel('Besturing')).toContainText(
    'Schakel donkere modus in'
  );
  await page
    .getByRole('group', { name: 'Besturing' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇵🇱 Polski' }).click();
  await expect(page.getByLabel('Sterowanie')).toContainText(
    'Włącz tryb ciemny'
  );
  await page
    .getByRole('group', { name: 'Sterowanie' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇵🇹 Português' }).click();
  await expect(page.getByLabel('Controles')).toContainText(
    'Ativar modo escuro'
  );
  await page
    .getByRole('group', { name: 'Controles' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇷🇺 Русский' }).click();
  await expect(page.getByLabel('Управление')).toContainText(
    'Включить тёмный режим'
  );
  await page
    .getByRole('group', { name: 'Управление' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇸🇪 Svenska' }).click();
  await expect(page.getByLabel('Kontroller')).toContainText(
    'Sätt på mörkt läge'
  );
  await page
    .getByRole('group', { name: 'Kontroller' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇹🇷 Türkçe' }).click();
  await expect(page.getByLabel('Kontroller')).toContainText('Koyu modunu aç');
  await page
    .getByRole('group', { name: 'Kontroller' })
    .getByRole('combobox')
    .click();
  await page.getByRole('option', { name: '🇨🇳 中文 (简体)' }).click();
  await expect(page.getByLabel('控制')).toContainText('启用暗模式');
});
