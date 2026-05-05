const { spawn } = require('child_process');
const path = require('path');

const server = spawn('node', [
  '--max-old-space-size=4096',
  path.join(__dirname, 'node_modules/.bin/next'),
  'dev', '-p', '3000'
], {
  cwd: __dirname,
  stdio: ['inherit', 'inherit', 'inherit'],
  detached: false
});

server.on('exit', (code) => {
  console.log(`Server exited with code ${code}. Restarting...`);
  setTimeout(() => process.exit(1), 1000);
});

server.on('error', (err) => {
  console.error('Server error:', err);
  process.exit(1);
});

// Keep this process alive
setInterval(() => {
  if (server.exitCode !== null) {
    process.exit(1);
  }
}, 5000);
