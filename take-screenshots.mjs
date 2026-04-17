// デモサイトのスクリーンショット撮影スクリプト
// 実行: node take-screenshots.mjs

import { chromium } from '/Users/chidai/.npm/_npx/9833c18b2d85bc59/node_modules/playwright/index.mjs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const demos = [
  'salon', 'restaurant', 'guesthouse', 'construction', 'diving',
  'patisserie', 'nursery', 'camp', 'osteopathic', 'farm',
];

const outDir = path.join(__dirname, 'public/images/demo-screenshots');

async function main() {
  console.log('ブラウザ起動中...');
  const browser = await chromium.launch({ channel: 'chrome' });
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
  });

  for (const name of demos) {
    const page = await context.newPage();
    const url = `http://localhost:3001/demo/${name}`;
    try {
      console.log(`撮影中: ${name}...`);
      await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
      await page.waitForTimeout(2000);
      await page.screenshot({ path: path.join(outDir, `${name}.png`) });
      console.log(`  ✓ ${name}.png`);
    } catch (e) {
      console.error(`  ✗ ${name}: ${e.message}`);
    }
    await page.close();
  }

  await browser.close();
  console.log('完了！Chrome開き直してOK');
}

main();
