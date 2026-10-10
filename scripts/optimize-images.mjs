// Compresses source images into public/work/<slug>/ as WebP and records
// their dimensions in content/media.json for next/image.
//
// Usage:
//   node scripts/optimize-images.mjs <source-folder> <slug> [name=file ...]
// Each name=file pair writes <name>.webp from <source-folder>/<file>.
// Without pairs, every image in the folder is written as 01.webp, 02.webp, …
// in filename order.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_WIDTH = 2400;
const QUALITY = 78;
const root = process.cwd();
const manifestPath = path.join(root, "content", "media.json");

const [, , sourceDir, slug, ...pairs] = process.argv;
if (!sourceDir || !slug) {
  console.error("Usage: node scripts/optimize-images.mjs <source-folder> <slug> [name=file ...]");
  process.exit(1);
}

let jobs;
if (pairs.length) {
  jobs = pairs.map((pair) => {
    const i = pair.indexOf("=");
    return { name: pair.slice(0, i), file: pair.slice(i + 1) };
  });
} else {
  const files = (await fs.readdir(sourceDir))
    .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
    .sort();
  jobs = files.map((file, i) => ({ name: String(i + 1).padStart(2, "0"), file }));
}

const outDir = path.join(root, "public", "work", slug);
await fs.mkdir(outDir, { recursive: true });

let manifest = {};
try {
  manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
} catch {
  manifest = {};
}

for (const { name, file } of jobs) {
  const src = path.join(sourceDir, file);
  const out = path.join(outDir, `${name}.webp`);
  const info = await sharp(src)
    .rotate()
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(out);
  const key = `/work/${slug}/${name}.webp`;
  manifest[key] = { width: info.width, height: info.height };
  console.log(`${key}  ${info.width}×${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}

const sorted = Object.fromEntries(Object.entries(manifest).sort(([a], [b]) => a.localeCompare(b)));
await fs.mkdir(path.dirname(manifestPath), { recursive: true });
await fs.writeFile(manifestPath, JSON.stringify(sorted, null, 2) + "\n");
