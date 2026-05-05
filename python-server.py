#!/usr/bin/env python3
"""Simple HTTP server for Renewable Ireland v8 homepage."""
import http.server
import socketserver
import os

os.chdir('/home/z/my-project')

class RIHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        if self.path == '/' or self.path == '':
            self.path = '/public/v8-homepage.html'
        elif self.path.startswith('/images/') or self.path.startswith('/favicon'):
            self.path = '/public' + self.path
        return super().do_GET()

    def log_message(self, format, *args):
        pass  # Suppress logs for performance

with socketserver.TCPServer(('', 3000), RIHandler) as httpd:
    print('Python server running on port 3000', flush=True)
    httpd.serve_forever()
