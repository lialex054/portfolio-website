"use client";

import { useMemo, useState } from "react";
import { TrackingGlasses } from "@/components/glasses/Glasses";
import { useGaze } from "@/components/glasses/GazeProvider";
import type { ProjectMeta } from "@/lib/content";
import { disciplines, site, upcoming, type DisciplineId } from "@/lib/site";
import { cn } from "@/lib/utils";
import ProjectTile from "./ProjectTile";

type Filter = "all" | DisciplineId;

/*
 * Tile sizes belong to grid positions, not projects, so the bento has no gaps
 * whatever order a filter puts the tiles in.
 *   phone: 1 column · tablet (md): 2 · desktop (lg): 4
 */
const SLOTS = [
  { span: "row-span-2 md:col-span-2", big: true, summaryFromMd: true },
  { span: "row-span-2 md:col-span-2", big: true, summaryFromMd: true },
  { span: "md:col-span-2", big: false, summaryFromMd: true },
  { span: "", big: false, summaryFromMd: false },
  { span: "", big: false, summaryFromMd: false },
  { span: "md:col-span-2", big: false, summaryFromMd: true },
];
const EXTRA_SLOT = { span: "", big: false, summaryFromMd: false };
const COMING_SOON_SPAN = "md:col-span-2";

export default function HomeGrid({ projects }: { projects: ProjectMeta[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const { poke } = useGaze();

  const matches = (p: ProjectMeta) => filter === "all" || p.disciplines.includes(filter);

  // "All" keeps the curated order; a discipline puts its projects first, newest first.
  const ordered = useMemo(() => {
    if (filter === "all") return projects;
    const newest = (a: ProjectMeta, b: ProjectMeta) => b.end.localeCompare(a.end) || a.order - b.order;
    const hit = projects.filter((p) => p.disciplines.includes(filter)).sort(newest);
    const miss = projects.filter((p) => !p.disciplines.includes(filter)).sort(newest);
    return [...hit, ...miss];
  }, [filter, projects]);

  const chips: { id: Filter; label: string; count: number }[] = [
    { id: "all", label: "All", count: projects.length },
    ...disciplines.map((d) => ({
      id: d.id,
      label: d.label,
      count: projects.filter((p) => p.disciplines.includes(d.id)).length,
    })),
  ];

  return (
    <section
      id="work"
      aria-label="Selected work"
      className="grid grid-flow-dense auto-rows-[215px] grid-cols-1 gap-3 md:auto-rows-[230px] md:grid-cols-2 md:gap-4 lg:auto-rows-[250px] lg:grid-cols-4"
    >
      <div className="row-span-2 flex min-w-0 flex-col justify-between gap-4 overflow-hidden rounded-tile border border-line bg-tile p-[22px] md:col-span-2 md:p-8">
        <button
          type="button"
          onClick={() => poke("hero")}
          aria-label="Poke the glasses"
          className="self-start rounded-lg"
        >
          <TrackingGlasses id="hero" className="h-[82px] w-[150px] md:h-[104px] md:w-[190px] lg:h-[120px] lg:w-[220px]" />
        </button>

        <div className="min-w-0">
          <p className="mb-2.5 text-[15px] font-medium text-muted">Hi, I&apos;m Alex</p>
          <h1 className="text-balance text-[28px] font-semibold leading-[1.04] tracking-[-0.035em] md:text-[40px] lg:text-[44px]">
            {site.headline}
          </h1>
          <p className="mt-3.5 text-sm leading-normal text-muted md:text-base">{site.credentials}</p>
        </div>

        <div
          role="group"
          aria-label="Filter projects by discipline"
          className="-mx-1 flex flex-nowrap gap-2 overflow-x-auto px-1 [scrollbar-width:none] md:flex-wrap"
        >
          {chips.map((c) => {
            const on = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(c.id)}
                className={cn(
                  "flex min-h-11 shrink-0 items-center gap-1.5 rounded-full border px-4 text-sm font-medium transition-colors",
                  on ? "border-fg bg-fg text-bg" : "border-chip bg-transparent text-fg hover:border-fg",
                )}
              >
                {c.label}
                <span className="font-mono text-xs opacity-60">{c.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {ordered.map((p, i) => {
        const slot = SLOTS[i] ?? EXTRA_SLOT;
        return (
          <ProjectTile
            key={p.slug}
            project={p}
            span={slot.span}
            big={slot.big}
            summaryFromMd={slot.summaryFromMd}
            dimmed={!matches(p)}
            priority={i < 2}
          />
        );
      })}

      {upcoming.length > 0 && (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-tile border-[1.5px] border-dashed border-chip p-6 text-center transition-opacity duration-300",
            COMING_SOON_SPAN,
            filter !== "all" && "opacity-25",
          )}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Coming soon</span>
          <span className="text-xl font-semibold tracking-[-0.02em]">New case studies on the way</span>
          <span className="max-w-[420px] text-sm text-muted">{upcoming.join(" · ")}</span>
        </div>
      )}
    </section>
  );
}
