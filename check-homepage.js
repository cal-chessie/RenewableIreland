const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 });
  await new Promise(r => setTimeout(r, 4000));
  
  const result = await page.evaluate(() => {
    // Check all major sections
    const sections = {};
    const selectors = [
      '#mainnav', '.hero', '.tstrip', '.tlogos', '.wsec', 
      '#calculator', '#grants', '#how-it-works', '#areas', 
      '#faq', '#reviews', 'footer'
    ];
    selectors.forEach(s => {
      const el = document.querySelector(s);
      sections[s] = el ? { visible: el.offsetHeight > 0, height: el.offsetHeight } : 'NOT_FOUND';
    });
    
    // Check S:0
    const s0 = document.getElementById('S:0');
    
    // Check WhatsApp
    const wa = document.querySelector('.wa-root');
    
    // Check cursor elements
    const cursor = document.getElementById('ricur');
    const trail = document.getElementById('ritrail');
    
    // Check body height
    const bodyHeight = document.body.scrollHeight;
    
    // Check for any visible "Loading" text
    const loadingText = document.body.innerText.includes('Loading…');
    
    return { sections, s0Found: !!s0, waFound: !!wa, cursorFound: !!cursor, trailFound: !!trail, bodyHeight, loadingVisible: loadingText };
  });
  console.log(JSON.stringify(result, null, 2));
  await browser.close();
})();
