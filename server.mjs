/**
 * Minimal, dependency-free static file server for the exported `./out` folder.
 * Used as the production start command on Node hosts (e.g. Hostinger):
 *   npm run build   ->  produces ./out
 *   npm start       ->  serves ./out on $PORT
 *
 * No framework, no Next runtime — just static files, so it can't fail to
 * serve CSS/JS the way a misconfigured Next server can.
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
  ".mp4": "video/mp4",
  ".webm": "video/webm",
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

const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  let file = await tryFile(join(ROOT, safe));
  if (!file && !extname(safe)) file = await tryFile(join(ROOT, `${safe}.html`));
  if (!file) file = await tryFile(join(ROOT, "404.html"));

  if (!file) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not found");
    return;
  }

  const body = await readFile(file);
  const type = TYPES[extname(file)] || "application/octet-stream";
  const status = file.endsWith("404.html") && !safe.includes("404") ? 404 : 200;
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": file.includes("/_next/") ? "public, max-age=31536000, immutable" : "no-cache",
  });
  res.end(body);
});

server.listen(PORT, () => {
  console.log(`overlaycraft: serving ./out on :${PORT}`);
});
