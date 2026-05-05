const http = require('http');
const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'upload', 'renewable-ireland-v8 (18).html');
const html = fs.readFileSync(htmlPath, 'utf8');

const server = http.createServer((req, res) => {
  if (req.url === '/' || req.url === '') {
    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    });
    res.end(html);
  } else {
    // Try to serve from public directory
    const publicPath = path.join(__dirname, 'public', req.url.replace(/^\//, ''));
    if (fs.existsSync(publicPath) && !fs.statSync(publicPath).isDirectory()) {
      const ext = path.extname(publicPath);
      const types = {
        '.html': 'text/html',
        '.css': 'text/css',
        '.js': 'application/javascript',
        '.png': 'image/png',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.svg': 'image/svg+xml',
        '.ico': 'image/x-icon',
        '.webp': 'image/webp',
      };
      res.writeHead(200, { 'Content-Type': types[ext] || 'application/octet-stream' });
      res.end(fs.readFileSync(publicPath));
    } else {
      res.writeHead(404);
      res.end('Not found');
    }
  }
});

server.listen(3000, '0.0.0.0', () => {
  console.log('Simple server running on port 3000');
});
