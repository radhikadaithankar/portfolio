import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve, relative } from "node:path";

// Validate the files that will actually be uploaded, including links between
// the independently deployed portfolio and CV. No network or credentials needed.
const sites = new Map([
  ["radhikakd.com", resolve("out")],
  ["cv.radhikakd.com", resolve("cv-site")],
]);
const errors = [];
const documents = new Map();
const decode = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&#x27;", "'")
    .replaceAll("&quot;", '"');
const files = (directory) =>
  readdirSync(directory).flatMap((name) => {
    const path = join(directory, name);
    return statSync(path).isDirectory() ? files(path) : [path];
  });
function fileFor(url) {
  const root = sites.get(url.hostname);
  if (!root) return null;
  const path = join(root, decodeURIComponent(url.pathname));
  assert(
    !relative(root, path).startsWith(".."),
    `Path leaves site root: ${url}`,
  );
  return [path, `${path}.html`, join(path, "index.html")].find(
    (candidate) => existsSync(candidate) && statSync(candidate).isFile(),
  );
}
function checkLink(raw, base, source) {
  const url = new URL(decode(raw), base);
  if (!["https:", "http:"].includes(url.protocol) || !sites.has(url.hostname))
    return;
  const target = fileFor(url);
  if (!target) {
    errors.push(`${source}: missing destination ${url}`);
    return;
  }
  if (url.hash && target.endsWith(".html")) {
    const content = documents.get(target) ?? readFileSync(target, "utf8");
    const ids = [...content.matchAll(/\bid=["']([^"']+)["']/g)].map((match) =>
      decode(match[1]),
    );
    if (!ids.includes(decodeURIComponent(url.hash.slice(1))))
      errors.push(`${source}: missing anchor ${url}`);
  }
}
let pages = 0;
for (const [host, root] of sites) {
  assert(
    existsSync(join(root, "index.html")),
    `Build ${host} before running this check`,
  );
  for (const file of files(root).filter((path) => path.endsWith(".css"))) {
    const base = new URL(
      relative(root, file).replaceAll("\\", "/"),
      `https://${host}/`,
    );
    for (const match of readFileSync(file, "utf8").matchAll(
      /url\(["']?([^\s"')]+)["']?\)/g,
    ))
      checkLink(match[1], base, file);
  }
  for (const file of files(root).filter((path) => path.endsWith(".html"))) {
    const html = readFileSync(file, "utf8");
    documents.set(file, html);
    const pathname = relative(root, file)
      .replaceAll("\\", "/")
      .replace(/(?:^|\/)index\.html$/, "/")
      .replace(/\.html$/, "");
    const base = new URL(pathname, `https://${host}/`);
    const markup = html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "");
    if (/\bTODO\b/.test(markup))
      errors.push(`${file}: unpublished TODO text is visible`);
    for (const match of markup.matchAll(
      /\b(?:href|src|poster)=["']([^"']+)["']/g,
    ))
      checkLink(match[1], base, file);
    for (const match of html.matchAll(
      /<script\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/g,
    ))
      checkLink(match[1], base, file);
    for (const match of html.matchAll(
      /<script\b[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g,
    )) {
      try {
        JSON.parse(match[1]);
      } catch {
        errors.push(`${file}: invalid structured data`);
      }
    }
    if (!/404|_not-found/.test(file)) {
      if (!/<link\b[^>]*rel=["']canonical["']/.test(html))
        errors.push(`${file}: missing canonical URL`);
      if (
        /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/.test(
          html,
        )
      )
        errors.push(`${file}: public content is noindex`);
    }
    pages++;
  }
  const sitemap = readFileSync(join(root, "sitemap.xml"), "utf8");
  for (const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g))
    checkLink(match[1], `https://${host}/`, `${host} sitemap`);
  assert(
    readFileSync(join(root, "robots.txt"), "utf8").includes(
      `https://${host}/sitemap.xml`,
    ),
    `${host}: robots sitemap missing`,
  );
}
assert(
  !existsSync("out/designs.html"),
  "Private design experiments must not be deployed",
);
assert(
  !existsSync("out/media-check.html"),
  "Temporary media verification must not be deployed",
);
assert(
  readFileSync("cv-site/Radhika-Daithankar-CV.pdf")
    .subarray(0, 5)
    .equals(Buffer.from("%PDF-")),
  "CV download is not a PDF",
);
assert(errors.length === 0, errors.join("\n"));
console.log(
  `Validated ${pages} HTML pages: local links, anchors, assets, canonical metadata, structured data, sitemaps and CV download.`,
);
