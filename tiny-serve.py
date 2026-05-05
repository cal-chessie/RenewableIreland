import http.server, socketserver, os, sys, time, traceback

HTML_PATH = '/home/z/my-project/upload/renewable-ireland-v8 (18).html'
PUBLIC = '/home/z/my-project/public'

try:
    HTML = open(HTML_PATH, 'rb').read()
except:
    HTML = open('/home/z/my-project/public/index.html', 'rb').read()

class H(http.server.BaseHTTPRequestHandler):
    def do_GET(self):
        try:
            p = self.path.split('?')[0]
            if p == '/':
                self.send_response(200)
                self.send_header('Content-Type', 'text/html; charset=utf-8')
                self.send_header('Cache-Control', 'no-cache')
                self.end_headers()
                self.wfile.write(HTML)
                return
            fp = os.path.join(PUBLIC, p.lstrip('/'))
            if os.path.isfile(fp) and fp.startswith(PUBLIC):
                import mimetypes
                m, _ = mimetypes.guess_type(fp)
                self.send_response(200)
                self.send_header('Content-Type', m or 'application/octet-stream')
                self.end_headers()
                with open(fp, 'rb') as f:
                    self.wfile.write(f.read())
                return
            self.send_error(404)
        except:
            pass

    def log_message(self, *a):
        pass

def run():
    while True:
        try:
            socketserver.TCPServer.allow_reuse_address = True
            s = socketserver.TCPServer(('0.0.0.0', 3000), H)
            s.serve_forever()
        except Exception:
            time.sleep(0.5)

if __name__ == '__main__':
    run()
