/**
 * Minimal, dependency-free static file server for the exported `./out` folder.
 * Used as the production start command on Node hosts (e.g. Hostinger):
 *   npm run build   ->  produces ./out
 *   npm start       ->  serves ./out on $PORT
 *
 * No framework, no Prisma, no Next runtime — just static files, so it can't
 * fail to serve CSS/JS the way a misconfigured Next server can.
 */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, normalize, extname } from "node:path";

const ROOT = join(process.cwd(), "out");
const PORT = process.env.PORT || 3000;

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

async function tryFile(p) {
  try {
    const s = await stat(p);
    if (s.isFile()) return p;
    if (s.isDirectory()) {
      const idx = join(p, "index.html");
      const si = await stat(idx).catch(() => null);
      if (si?.isFile()) return idx;
    }
  } catch {
    /* not found */
  }
  return null;
}

async function resolvePath(urlPath) {
  // Prevent path traversal.
  const clean = normalize(decodeURIComponent(urlPath.split("?")[0])).replace(/^(\.\.[/\\])+/, "");
  const base = join(ROOT, clean);
  return (
    (await tryFile(base)) ||
    (await tryFile(`${base}.html`)) ||
    (await tryFile(join(base, "index.html")))
  );
}

const server = createServer(async (req, res) => {
  let file = await resolvePath(req.url || "/");
  let status = 200;
  if (!file) {
    file = join(ROOT, "404.html");
    status = 404;
  }
  try {
    const body = await readFile(file);
    const type = TYPES[extname(file)] || "application/octet-stream";
    const immutable = file.includes(`${join("_next", "static")}`);
    res.writeHead(status, {
      "Content-Type": type,
      "Cache-Control": immutable ? "public, max-age=31536000, immutable" : "public, max-age=0, must-revalidate",
    });
    res.end(body);
  } catch {
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end("500 Internal Server Error");
  }
});

server.listen(PORT, () => {
  console.log(`Serving ./out on http://localhost:${PORT}`);
});
