// Serveur statique local pour l'aperçu du build (dist). Usage: node scripts/preview.mjs
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const racine = join(process.cwd(), '.vercel', 'output', 'static');
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.woff2': 'font/woff2', '.xml': 'application/xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webmanifest': 'application/manifest+json', '.txt': 'text/plain' };

const serveur = createServer(async (req, res) => {
  try {
    let chemin = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let fichier = join(racine, normalize(chemin));
    if (!fichier.startsWith(racine)) { res.writeHead(403); return res.end(); }
    try { await readFile(fichier); } catch { fichier = join(fichier, 'index.html'); }
    const data = await readFile(fichier);
    res.writeHead(200, { 'Content-Type': types[extname(fichier)] ?? 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(await readFile(join(racine, '404.html')));
  }
});
serveur.listen(4321, () => console.log('aperçu sur http://127.0.0.1:4321'));
