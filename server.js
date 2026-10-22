const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3013;
const PUBLIC_DIR = path.join(__dirname, 'public');

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2'
};

function send(res, status, body, headers) {
  res.writeHead(status, Object.assign({ 'Cache-Control': 'no-cache' }, headers || {}));
  res.end(body);
}

const server = http.createServer((req, res) => {
  try {
    const urlPath = decodeURIComponent(req.url.split('?')[0]);
    let rel = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    let filePath = path.normalize(path.join(PUBLIC_DIR, rel));

    if (!filePath.startsWith(PUBLIC_DIR)) {
      return send(res, 403, 'Prohibido', { 'Content-Type': 'text/plain; charset=utf-8' });
    }

    fs.stat(filePath, (err, stat) => {
      if (!err && stat.isDirectory()) filePath = path.join(filePath, 'index.html');

      fs.readFile(filePath, (err2, data) => {
        if (err2) {
          return send(res, 404, '<!doctype html><meta charset="utf-8"><h1>404 — Página no encontrada</h1><p><a href="/">Volver al test</a></p>', { 'Content-Type': 'text/html; charset=utf-8' });
        }
        const type = MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
        send(res, 200, data, { 'Content-Type': type });
      });
    });
  } catch (e) {
    send(res, 500, 'Error interno', { 'Content-Type': 'text/plain; charset=utf-8' });
  }
});

server.listen(PORT, () => {
  console.log('Test "¿Con qué época encajas?" disponible en http://localhost:' + PORT);
});
