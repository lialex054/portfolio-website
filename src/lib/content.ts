import "server-only";
import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";
import { z } from "zod";
import media from "../../content/media.json";

const PROJECTS_DIR = path.join(process.cwd(), "content", "projects");
const month = z.string().regex(/^\d{4}-\d{2}$/, "use YYYY-MM");

const frontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  context: z.string().optional(),
  role: z.string().optional(),
  team: z.string().optional(),
  start: month,
  end: month,
  disciplines: z.array(z.enum(["product", "ux", "build", "story"])).min(1),
  tags: z.string(),
  tools: z.array(z.string()).default([]),
  stat: z.string(),
  cover: z.string(),
  coverAlt: z.string(),
  previewFrames: z.array(z.string()).optional(),
  videoLabel: z.string().optional(),
  order: z.number(),
  links: z.array(z.object({ label: z.string(), url: z.string().url() })).default([]),
});

export type ProjectMeta = z.infer<typeof frontmatterSchema> & {
  slug: string;
  year: string;
  coverSize: { width: number; height: number };
};

export type Project = ProjectMeta & { body: string };

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatMonth(ym: string) {
  const [y, m] = ym.split("-");
  return `${MONTHS[Number(m) - 1]} ${y}`;
}

export function formatRange(start: string, end: string) {
  return start === end ? formatMonth(start) : `${formatMonth(start)} – ${formatMonth(end)}`;
}

export function mediaSize(src: string) {
  const size = (media as Record<string, { width: number; height: number }>)[src];
  if (!size) throw new Error(`No size recorded for ${src}. Run scripts/optimize-images.mjs.`);
  return size;
}

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

function load(slug: string): Project {
  const file = path.join(PROJECTS_DIR, slug, "index.mdx");
  const raw = fs.readFileSync(file, "utf8");
  const match = FRONTMATTER.exec(raw);
  if (!match) throw new Error(`Missing frontmatter (--- … ---) at the top of ${file}`);
  const data: unknown = parseYaml(match[1]);
  const content = raw.slice(match[0].length);
  const parsed = frontmatterSchema.safeParse(data);
  if (!parsed.success) {
    throw new Error(`Invalid frontmatter in ${file}:\n${parsed.error.message}`);
  }
  const meta = parsed.data;
  return {
    ...meta,
    slug,
    year: meta.end.slice(0, 4),
    coverSize: mediaSize(meta.cover),
    body: content,
  };
}

let cache: Project[] | null = null;

/** All projects in curated order (frontmatter `order`). */
export function getProjects(): Project[] {
  if (cache && process.env.NODE_ENV === "production") return cache;
  const slugs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory() && fs.existsSync(path.join(PROJECTS_DIR, d.name, "index.mdx")))
    .map((d) => d.name);
  cache = slugs.map(load).sort((a, b) => a.order - b.order);
  return cache;
}

export function getProject(slug: string) {
  return getProjects().find((p) => p.slug === slug);
}

/** Frontmatter only, safe to pass to client components. */
export function toMeta({ body: _body, ...meta }: Project): ProjectMeta {
  void _body;
  return meta;
}
