// Runs after `vite build` + the SSR build. Writes one static HTML file per page
// so search engines get real content and per-page metadata without running JS.
//
//   dist/index.html     -> /
//   dist/services.html  -> /services   (vercel.json cleanUrls)
//   dist/about.html     -> /about
//   dist/admin.html     -> /admin      (client-only shell, noindex)
//   dist/404.html       -> any unknown URL, served with a real 404 status
//   dist/sitemap.xml

import { readFile, rm, writeFile } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const { render, metaFor, canonicalUrl, pages, SITE_URL } = await import(pathToFileURL(ssrEntry).href);

const template = await readFile(path.join(dist, "index.html"), "utf8");

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function headFor(meta, { canonical = true } = {}) {
  const url = canonicalUrl(meta.path);
  const lines = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    `<meta name="robots" content="${meta.noindex ? "noindex, nofollow" : "index, follow"}" />`,
    canonical && !meta.noindex ? `<link rel="canonical" href="${url}" />` : "",
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
  ];
  return lines.filter(Boolean).join("\n  ");
}

function page(meta, appHtml) {
  const out = template
    .replace(/<!-- seo:start[\s\S]*?<!-- seo:end -->/, headFor(meta))
    .replace("<!--app-->", appHtml);
  if (out === template) throw new Error("prerender: template markers not found");
  return out;
}

const targets = [
  { url: "/", file: "index.html" },
  { url: "/services", file: "services.html" },
  { url: "/about", file: "about.html" },
];

for (const { url, file } of targets) {
  await writeFile(path.join(dist, file), page(metaFor(url), render(url)));
  console.log(`prerendered ${url} -> dist/${file}`);
}

// 404: rendered from an unmatched path so the NotFound route is used.
await writeFile(path.join(dist, "404.html"), page(metaFor("/__not-found__"), render("/__not-found__")));
console.log("prerendered 404 -> dist/404.html");

// Admin stays client-rendered (it needs the browser for login), but is never indexed.
await writeFile(path.join(dist, "admin.html"), page(metaFor("/admin"), ""));
console.log("wrote /admin shell -> dist/admin.html");

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${Object.keys(pages)
  .map(
    (p) => `  <url>
    <loc>${canonicalUrl(p)}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;
await writeFile(path.join(dist, "sitemap.xml"), sitemap);
console.log(`wrote sitemap.xml (${Object.keys(pages).length} URLs, ${SITE_URL})`);

await rm(path.join(root, "dist-ssr"), { recursive: true, force: true });
