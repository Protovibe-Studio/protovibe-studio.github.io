import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { test } from 'node:test';

// Playwright is already a dependency of the bundled Protovibe plugin.
const { chromium } = createRequire(new URL('../plugins/protovibe/package.json', import.meta.url))('playwright');

test('app launch attempts preserve the landing page and manual fallback', async () => {
  const files = {
    '/open/': ['../public/open/index.html', 'text/html'],
    '/open/open.js': ['../public/open/open.js', 'text/javascript'],
    '/icon.svg': ['../public/icon.svg', 'image/svg+xml'],
  };
  const server = createServer(async (req, res) => {
    const file = files[new URL(req.url, 'http://localhost').pathname];
    if (!file) { res.writeHead(404).end(); return; }
    try {
      res.setHeader('Content-Type', file[1]);
      res.end(await readFile(new URL(file[0], import.meta.url)));
    } catch { res.writeHead(500).end(); }
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH || undefined });
    const page = await browser.newPage();
    page.setDefaultTimeout(5000);
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    const base = `http://127.0.0.1:${server.address().port}/open/`;
    const target = 'protovibe://annotation/k3f9x2m1qa/a-9z8y7x6w';
    const url = base + '?url=' + encodeURIComponent(target);
    await page.goto(url);
    const link = page.getByRole('link', { name: 'Open in Protovibe', exact: true });
    await link.waitFor({ state: 'visible' });
    assert.equal(page.url(), url);
    assert.equal(await link.getAttribute('href'), target);
    const frameName = await page.locator('#launcher').getAttribute('name');
    assert.equal(await link.getAttribute('target'), frameName);
    // Some browsers block the protocol without committing any frame navigation.
    await link.click();
    await page.waitForLoadState('networkidle');
    assert.equal(page.url(), url);
    assert.equal(await link.isVisible(), true);
    assert.equal(await page.getByRole('link', { name: 'Get Protovibe' }).isVisible(), true);

    await page.goto(base + '?url=' + encodeURIComponent('javascript:alert(1)'));
    assert.equal(await link.isVisible(), false);
    assert.match(await page.locator('#status').textContent(), /invalid/);
    assert.equal(await page.locator('#launcher').getAttribute('src'), null);
    assert.deepEqual(errors, []);
  } finally {
    await browser?.close();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
  }
});
