import { test } from '@playwright/test';
import { strictEqual } from "node:assert";

test('all functions', async ({ page }) => {
  const console_values = [];
  page.on('console', (msg) => console_values.push(msg.text()));

  const __dirname = new URL(import.meta.url).pathname;
  await page.goto(`file://${__dirname}/../index.html`);

  strictEqual(console_values[0], '敬老の日');
  strictEqual(console_values[1], 'true');
  strictEqual(console_values[2], 'false');
});