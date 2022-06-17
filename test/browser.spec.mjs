import { test } from '@playwright/test';
import { expect } from 'chai'

test('all functions', async ({ page }) => {
  const console_values = [];
  page.on('console', (msg) => console_values.push(msg.text()));

  const __dirname = new URL(import.meta.url).pathname;
  await page.goto(`file://${__dirname}/../index.html`);

  expect(console_values[0]).to.eq('敬老の日');
  expect(console_values[1]).to.eq('true');
  expect(console_values[2]).to.eq('false');
});