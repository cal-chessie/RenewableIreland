#!/bin/bash
# Custom dev script for Renewable Ireland
# Uses Python static server for stability (Node.js OOM issues in container)
cd /home/z/my-project

# Kill any existing servers on port 3000
fuser -k 3000/tcp 2>/dev/null || true
sleep 1

# Start Python HTTP server on port 3000 (serves v8 homepage + static assets)
python3 -c "
import http.server, socketserver, os, signal, sys

os.chdir('/home/z/my-project')

class RIHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.path = '/public/v8-homepage.html'
        elif self.path.startswith('/images/') or self.path.startswith('/favicon') or self.path == '/logo.svg' or self.path == '/logo.jpeg' or self.path == '/robots.txt':
            self.path = '/public' + self.path
        elif self.path == '/v8-homepage.html':
            self.path = '/public/v8-homepage.html'
        return super().do_GET()

    def log_message(self, format, *args):
        pass

class ReuseAddrServer(socketserver.TCPServer):
    allow_reuse_address = True
    allow_reuse_port = True

with ReuseAddrServer(('', 3000), RIHandler) as httpd:
    print('RI Python server ready on port 3000', flush=True)
    httpd.serve_forever()
" &

echo "Python HTTP server started on port 3000"
