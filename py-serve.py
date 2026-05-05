import http.server, socketserver, os, sys, time

os.chdir('/home/z/my-project')
PORT = 3000

# Read the HTML once at startup to avoid re-reading the large file
HTML_PATH = '/home/z/my-project/upload/renewable-ireland-v8 (18).html'
with open(HTML_PATH, 'r', encoding='utf-8') as f:
    HTML_CONTENT = f.read()

class Handler(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        path = self.path.split('?')[0]
        if path == '/' or path == '':
            self.send_response(200)
            self.send_header('Content-Type', 'text/html; charset=utf-8')
            self.send_header('Cache-Control', 'no-cache')
            self.end_headers()
            self.wfile.write(HTML_CONTENT.encode('utf-8'))
            return
        
        # Serve static files from public/
        file_path = os.path.join('/home/z/my-project/public', path.lstrip('/'))
        if os.path.isfile(file_path) and file_path.startswith('/home/z/my-project/public'):
            import mimetypes
            mime, _ = mimetypes.guess_type(file_path)
            self.send_response(200)
            self.send_header('Content-Type', mime or 'application/octet-stream')
            self.end_headers()
            with open(file_path, 'rb') as f:
                self.wfile.write(f.read())
            return
        
        self.send_error(404)
    
    def log_message(self, format, *args):
        pass  # Suppress logs for performance

while True:
    try:
        with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
            httpd.allow_reuse_address = True
            httpd.serve_forever()
    except Exception as e:
        print(f"Server error: {e}, restarting in 1s...", flush=True)
        time.sleep(1)
