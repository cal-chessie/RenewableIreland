const http = require('http');
const fs = require('fs');
const path = require('path');

const HTML_FILE = path.join(__dirname, 'upload/renewable-ireland-v8 (18).html');
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const html = fs.readFileSync(HTML_FILE, 'utf8');

const server = http.createServer((req, res) => {
  // Root path -> serve v8 HTML
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-cache' });
    res.end(html);
    return;
  }
  
  // Try to serve from public directory
  let filePath = path.join(PUBLIC_DIR, req.url.split('?')[0]);
  if (filePath.startsWith(PUBLIC_DIR) && fs.existsSync(filePath)) {
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
    return;
  }
  
  res.writeHead(404);
  res.end('Not found');
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Static server running on port 3000');
});
