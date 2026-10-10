# Alex Li — portfolio

Next.js 15 · React 19 · Tailwind CSS v4 · MDX case studies.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (also type-checks and validates content)
```

## Where things live

| Path | What |
| --- | --- |
| `content/projects/<slug>/index.mdx` | One case study: frontmatter drives the home tile, the body is the page |
| `content/media.json` | Image sizes, written by the image script — don't edit by hand |
| `public/work/<slug>/` | Compressed project images (WebP) |
| `src/lib/site.ts` | Name, links, About text, experience, archive, "coming soon" list |
| `src/app/globals.css` | Design tokens (colours for dark and light) |
| `src/components/glasses/` | The glasses and the gaze engine that drives them |
| `src/components/home/` | Bento grid, tiles, archive, About |
| `src/components/mdx/` | Components you can use inside case studies |

## Adding a project

1. Compress its images (originals can live anywhere outside the repo):

   ```bash
   node scripts/optimize-images.mjs ~/Desktop/daybreak daybreak cover=hero.png flow=flows.png
   ```

   This writes `public/work/daybreak/cover.webp` etc. and records their sizes.

2. Create `content/projects/daybreak/index.mdx`:

   ```mdx
   ---
   title: Daybreak
   summary: One sentence on the problem and what you made.
   context: Where and why it happened
   role: Your role            # optional
   team: 4 people             # optional
   start: 2026-01
   end: 2026-04
   disciplines: [product, ux] # product | ux | build | story — drives the filters
   tags: Product · UX         # shown on the tile
   tools: [Figma, SQL]
   stat: The headline result
   cover: /work/daybreak/cover.webp
   coverAlt: What the cover shows
   order: 1                   # position under "All"; renumber the others
   links:
     - label: Report
       url: https://…
   ---

   ## The problem
   …
   ```

3. Remove its name from `upcoming` in `src/lib/site.ts`.

The build fails with a clear message if frontmatter is missing or an image hasn't been run through the script.

## Case study components

| Component | Example |
| --- | --- |
| `Figure` | `<Figure src="/work/x/flow.webp" alt="…" caption="…" />` |
| `Gallery` | `<Gallery images={[{ src: "…", alt: "…" }]} />` |
| `Stat` | `<Stat value="+60%" label="study time in user testing" />` |
| `Callout` | `<Callout>Key insight…</Callout>` |
| `YouTube` | `<YouTube id="dQw4w9WgXcQ" title="…" />` (loads only on click) |
| `XPost` | `<XPost url="https://x.com/…/status/…" />` |

`##` headings appear in the case study's "On this page" list automatically.

A video tile on the home page cycles through `previewFrames` (a list of image paths in the frontmatter) while it has the glasses' attention.

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the live domain (for example `https://alexli.com`) so link previews resolve. Old `/projects/<slug>` URLs redirect to the new pages.
