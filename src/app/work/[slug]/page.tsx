import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { formatRange, getProject, getProjects } from "@/lib/content";
import { mdxComponents, slugify } from "@/components/mdx/components";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = getProject((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    openGraph: {
      title: p.title,
      description: p.summary,
      images: [{ url: p.cover, width: p.coverSize.width, height: p.coverSize.height, alt: p.coverAlt }],
    },
  };
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { content } = await compileMDX({ source: project.body, components: mdxComponents });
  const toc = [...project.body.matchAll(/^##\s+(.+)$/gm)].map((m) => ({ title: m[1].trim(), id: slugify(m[1]) }));

  const all = getProjects();
  const next = all[(all.findIndex((p) => p.slug === slug) + 1) % all.length];

  const facts = [
    { label: "Timeline", value: formatRange(project.start, project.end) },
    project.context && { label: "Context", value: project.context },
    project.role && { label: "Role", value: project.role },
    project.team && { label: "Team", value: project.team },
    project.tools.length > 0 && { label: "Tools", value: project.tools.join(", ") },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <main className="mx-auto max-w-[1280px] px-4 pb-8 pt-6 md:px-6 md:pt-10 lg:px-8">
      <Link
        href="/#work"
        className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-fg"
      >
        <ArrowLeft className="size-4" aria-hidden="true" />
        All work
      </Link>

      <header className="mt-4 max-w-[880px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
          {project.tags} · {project.year}
        </p>
        <h1 className="mt-3 text-[40px] font-semibold leading-[1.02] tracking-[-0.04em] md:text-[64px]">
          {project.title}
        </h1>
        <p className="mt-4 text-lg leading-normal text-muted md:text-[21px]">{project.summary}</p>
      </header>

      <div className="relative mt-8 overflow-hidden rounded-tile border border-line bg-tile-2 md:mt-10">
        <Image
          src={project.cover}
          alt={project.coverAlt}
          width={project.coverSize.width}
          height={project.coverSize.height}
          priority
          sizes="(min-width: 1280px) 1216px, 100vw"
          className="max-h-[72vh] w-full object-cover"
        />
      </div>

      <section
        aria-label="Project facts"
        className="mt-4 grid grid-cols-1 gap-3 rounded-tile border border-line bg-tile p-6 sm:grid-cols-2 md:p-8 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
      >
        {facts.map((f) => (
          <div key={f.label} className="flex flex-col gap-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{f.label}</span>
            <span className="text-[15px] leading-snug">{f.value}</span>
          </div>
        ))}
        <div className="flex flex-col items-start gap-1.5">
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Result</span>
          <span className="rounded-full bg-accent px-[11px] py-1.5 text-[13px] font-semibold text-on-accent">
            {project.stat}
          </span>
        </div>
      </section>

      <div className="mt-12 grid grid-cols-1 gap-12 md:mt-16 lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16">
        <aside className="hidden lg:block">
          <nav aria-label="On this page" className="sticky top-28 flex flex-col gap-1">
            <span className="mb-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">On this page</span>
            {toc.map((h) => (
              <a key={h.id} href={`#${h.id}`} className="py-1 text-sm text-muted transition-colors hover:text-fg">
                {h.title}
              </a>
            ))}
            {project.links.length > 0 && (
              <div className="mt-6 flex flex-col gap-2 border-t border-line pt-6">
                {project.links.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium transition-colors hover:text-accent"
                  >
                    {l.label} ↗
                  </a>
                ))}
              </div>
            )}
          </nav>
        </aside>

        <article className="case-body max-w-[760px]">
          {content}
          {project.links.length > 0 && (
            <div className="!mt-14 flex flex-wrap gap-2 lg:hidden">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full border border-chip px-[18px] text-sm font-medium !text-fg !no-underline"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          )}
        </article>
      </div>

      {next && next.slug !== slug && (
        <Link
          href={`/work/${next.slug}`}
          className="group relative mt-16 block h-[260px] overflow-hidden rounded-tile bg-tile-2 text-white md:mt-24 md:h-[320px]"
        >
          <Image
            src={next.cover}
            alt=""
            fill
            sizes="(min-width: 1280px) 1216px, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4 md:inset-x-8 md:bottom-8">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-white/75">Next project</span>
              <p className="mt-2 text-[32px] font-semibold leading-none tracking-[-0.03em] md:text-[44px]">{next.title}</p>
            </div>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-[#111113]">
              <ArrowUpRight className="size-5" aria-hidden="true" />
            </span>
          </div>
        </Link>
      )}
    </main>
  );
}
