import { createServer } from 'node:http';
import { readFile, stat, realpath } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.json': 'application/json', '.xml': 'application/xml; charset=utf-8', '.txt': 'text/plain; charset=utf-8', '.rsc': 'text/x-component' };
export function createStaticServer(directory = path.resolve('dist/client')) {
  const root = path.resolve(directory);
  return createServer(async (request, response) => {
    if (!['GET', 'HEAD'].includes(request.method ?? '')) { response.writeHead(405, { Allow: 'GET, HEAD' }); response.end(); return; }
    try {
      const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
      let target = path.resolve(root, '.' + pathname);
      if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(404); response.end(); return; }
      try {
        const information = await stat(target);
        if (information.isDirectory()) {
          if (!pathname.endsWith('/')) { response.writeHead(308, { Location: pathname + '/' + new URL(request.url, 'http://localhost').search }); response.end(); return; }
          target = path.join(target, 'index.html');
        }
        const actual = await realpath(target);
        const actualRoot = await realpath(root);
        if (!actual.startsWith(actualRoot + path.sep)) throw new Error('Outside public directory');
        const body = await readFile(actual);
        response.writeHead(200, { 'Content-Type': types[path.extname(actual)] ?? 'application/octet-stream', 'X-Content-Type-Options': 'nosniff' });
        response.end(request.method === 'HEAD' ? undefined : body);
      } catch {
        const body = await readFile(path.join(root, '404.html'));
        response.writeHead(404, { 'Content-Type': types['.html'] });
        response.end(request.method === 'HEAD' ? undefined : body);
      }
    } catch { response.writeHead(400); response.end('Bad request'); }
  });
}
if (import.meta.url === pathToFileURL(process.argv[1] ?? '').href) {
  const port = Number(process.env.PORT ?? 4318);
  const server = createStaticServer();
  server.listen(port, '127.0.0.1', () => console.log(`Local: http://127.0.0.1:${port}/`));
}
