import { chromium } from 'playwright';

const BASE = 'http://localhost:3000';
const OUT = '/home/z/my-project/download';

async function main() {
  const browser = await chromium.launch({ headless: true });

  // ── Screenshot 1: Blog index – desktop 1920×1080 ──
  {
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/counties/dublin/blog`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${OUT}/blog-index-desktop-latest.png`, fullPage: true });
    console.log('✅ blog-index-desktop-latest.png saved');
    await ctx.close();
  }

  // ── Screenshot 2: Blog article – desktop 1920×1080 ──
  {
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/counties/dublin/blog/solar-panels-dublin`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${OUT}/blog-article-desktop-latest.png`, fullPage: true });
    console.log('✅ blog-article-desktop-latest.png saved');
    await ctx.close();
  }

  // ── Screenshot 3: Blog index – mobile 390×844 ──
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/counties/dublin/blog`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${OUT}/blog-index-mobile-latest.png`, fullPage: true });
    console.log('✅ blog-index-mobile-latest.png saved');
    await ctx.close();
  }

  // ── Screenshot 4: Blog article – mobile 390×844 ──
  {
    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)' });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/counties/dublin/blog/solar-panels-dublin`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${OUT}/blog-article-mobile-latest.png`, fullPage: true });
    console.log('✅ blog-article-mobile-latest.png saved');
    await ctx.close();
  }

  // ── CSS analysis on blog index (desktop) ──
  {
    const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
    const page = await ctx.newPage();
    await page.goto(`${BASE}/counties/dublin/blog`, { waitUntil: 'networkidle', timeout: 30000 });
    await page.waitForTimeout(3000);

    // 1. Number of grid columns on the blog grid
    const gridInfo = await page.evaluate(() => {
      // Try to find a grid container
      const grids = document.querySelectorAll('[class*="grid"], [style*="grid"]');
      let blogGrid = null;
      for (const g of grids) {
        const style = getComputedStyle(g);
        if (style.display === 'grid' || style.display === 'inline-grid') {
          blogGrid = g;
          break;
        }
      }
      if (!blogGrid) {
        // Fallback: find any grid-like container near blog cards
        const cards = document.querySelectorAll('a[href*="/blog/"], article, [class*="card"], [class*="post"]');
        if (cards.length > 0) {
          blogGrid = cards[0].parentElement;
        }
      }

      if (blogGrid) {
        const style = getComputedStyle(blogGrid);
        return {
          tag: blogGrid.tagName,
          className: blogGrid.className,
          gridTemplateColumns: style.gridTemplateColumns,
          display: style.display,
          gridAutoColumns: style.gridAutoColumns,
          gridAutoFlow: style.gridAutoFlow,
        };
      }
      return { error: 'No grid container found', allGridElements: Array.from(document.querySelectorAll('[class*="grid"]')).map(e => ({ tag: e.tagName, cls: e.className.substring(0, 80), display: getComputedStyle(e).display })) };
    });

    // 2. Max-width of the blog container
    const containerMaxWidth = await page.evaluate(() => {
      // Try common container classes
      const selectors = [
        '[class*="container"]',
        '[class*="max-w"]',
        '[class*="wrapper"]',
        'main',
        '[class*="blog"]',
      ];
      for (const sel of selectors) {
        const els = document.querySelectorAll(sel);
        for (const el of els) {
          const style = getComputedStyle(el);
          const rect = el.getBoundingClientRect();
          if (rect.width > 400) { // likely a container
            return {
              selector: sel,
              tag: el.tagName,
              className: el.className.substring(0, 100),
              maxWidth: style.maxWidth,
              width: style.width,
              computedWidth: rect.width + 'px',
            };
          }
        }
      }
      return { error: 'No container found' };
    });

    // 3. Font-size and line-height of the first blog card title
    const titleStyles = await page.evaluate(() => {
      // Find the first blog card title
      const selectors = [
        'a[href*="/blog/"] h2',
        'a[href*="/blog/"] h3',
        'article h2',
        'article h3',
        '[class*="card"] h2',
        '[class*="card"] h3',
        '[class*="post"] h2',
        '[class*="post"] h3',
        'h2',
        'h3',
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel);
        if (el) {
          const style = getComputedStyle(el);
          return {
            selector: sel,
            text: el.textContent.substring(0, 60),
            fontSize: style.fontSize,
            lineHeight: style.lineHeight,
            fontWeight: style.fontWeight,
            fontFamily: style.fontFamily.substring(0, 60),
            color: style.color,
            tag: el.tagName,
          };
        }
      }
      return { error: 'No blog card title found' };
    });

    // 4. Cursor value on body element
    const bodyCursor = await page.evaluate(() => {
      const style = getComputedStyle(document.body);
      return {
        cursor: style.cursor,
      };
    });

    // Additional: get more detailed grid info
    const detailedGridInfo = await page.evaluate(() => {
      // Find the most likely blog grid container by checking children count
      const allGrids = [];
      const allEls = document.querySelectorAll('*');
      for (const el of allEls) {
        const cs = getComputedStyle(el);
        if (cs.display === 'grid' || cs.display === 'inline-grid') {
          const childCount = el.children.length;
          if (childCount >= 2) {
            allGrids.push({
              tag: el.tagName,
              className: (el.className || '').substring(0, 100),
              gridTemplateColumns: cs.gridTemplateColumns,
              gap: cs.gap,
              childCount,
              parentTag: el.parentElement?.tagName,
              parentClass: (el.parentElement?.className || '').substring(0, 80),
            });
          }
        }
      }
      return allGrids;
    });

    console.log('\n════════════════════════════════════════');
    console.log('CSS ANALYSIS RESULTS');
    console.log('════════════════════════════════════════\n');

    console.log('1. BLOG GRID COLUMNS:');
    console.log(JSON.stringify(gridInfo, null, 2));
    console.log('');
    console.log('   ALL GRID ELEMENTS (children >= 2):');
    console.log(JSON.stringify(detailedGridInfo, null, 2));
    console.log('');

    console.log('2. BLOG CONTAINER MAX-WIDTH:');
    console.log(JSON.stringify(containerMaxWidth, null, 2));
    console.log('');

    console.log('3. FIRST BLOG CARD TITLE STYLES:');
    console.log(JSON.stringify(titleStyles, null, 2));
    console.log('');

    console.log('4. BODY CURSOR:');
    console.log(JSON.stringify(bodyCursor, null, 2));

    await ctx.close();
  }

  await browser.close();
  console.log('\n✅ All done!');
}

main().catch(e => { console.error(e); process.exit(1); });
