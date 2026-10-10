"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import { useGaze } from "@/components/glasses/GazeProvider";
import type { ProjectMeta } from "@/lib/content";
import { cn } from "@/lib/utils";

type Props = {
  project: ProjectMeta;
  /** Grid classes for this position in the bento. */
  span: string;
  big: boolean;
  /** Show the summary on md and up only. */
  summaryFromMd: boolean;
  dimmed: boolean;
  priority?: boolean;
};

export default function ProjectTile({ project: p, span, big, summaryFromMd, dimmed, priority }: Props) {
  const { active, touch, registerTile, setHovered } = useGaze();
  const isActive = active === p.slug;
  const frames = p.previewFrames ?? [p.cover];
  const isVideo = frames.length > 1;
  const [frame, setFrame] = useState(0);
  const tileRef = useCallback((el: HTMLAnchorElement | null) => registerTile(p.slug, el), [p.slug, registerTile]);

  // Video previews advance only while the tile has the glasses' attention.
  useEffect(() => {
    if (!isVideo || !isActive) return;
    const t = window.setInterval(() => setFrame((f) => (f + 1) % frames.length), 900);
    return () => window.clearInterval(t);
  }, [isVideo, isActive, frames.length]);

  return (
    <Link
      href={`/work/${p.slug}`}
      ref={tileRef}
      onMouseEnter={() => setHovered(p.slug)}
      onMouseLeave={() => setHovered(null)}
      onFocus={() => setHovered(p.slug)}
      onBlur={() => setHovered(null)}
      className={cn(
        "group relative block min-w-0 overflow-hidden rounded-tile bg-tile-2 text-white",
        "transition-[opacity,box-shadow,transform] duration-[450ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]",
        span,
        dimmed && "opacity-[0.22]",
        isActive && !touch && "-translate-y-1",
        isActive && touch && "ring-2 ring-accent",
      )}
    >
      {frames.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={i === 0 ? p.coverAlt : ""}
          fill
          priority={priority && i === 0}
          sizes={big ? "(min-width: 768px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"}
          className={cn(
            "object-cover transition-[opacity,transform] duration-[900ms] ease-[cubic-bezier(0.2,0.7,0.2,1)]",
            isVideo && i !== frame ? "opacity-0" : "opacity-100",
            isActive && "scale-[1.06]",
          )}
        />
      ))}
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 via-40% to-transparent to-[66%]" />

      <div className="absolute inset-x-3.5 top-3.5 flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          <span className="rounded-full bg-[rgba(10,10,12,0.6)] px-2.5 py-[7px] font-mono text-[11px] uppercase tracking-[0.08em] backdrop-blur-md">
            {p.tags} · {p.year}
          </span>
          {isVideo && (
            <span className="flex items-center gap-1.5 rounded-full bg-[rgba(10,10,12,0.6)] px-2.5 py-[7px] font-mono text-[11px] uppercase tracking-[0.08em] backdrop-blur-md">
              <Play className="size-2.5 fill-current" aria-hidden="true" />
              {p.videoLabel ?? "Video"}
            </span>
          )}
        </div>
        <span
          aria-hidden="true"
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-[#111113] transition-[opacity,transform] duration-300",
            isActive ? "scale-100 opacity-100" : "scale-[0.6] opacity-0",
          )}
        >
          <ArrowUpRight className="size-[18px]" />
        </span>
      </div>

      <div className="absolute inset-x-5 bottom-[18px] flex flex-col gap-2">
        <h3
          className={cn(
            "font-semibold leading-[1.05] tracking-[-0.025em]",
            big ? "text-[28px] md:text-[34px]" : "text-[22px] md:text-2xl",
          )}
        >
          {p.title}
        </h3>
        {(big || summaryFromMd) && (
          <p className={cn("max-w-[460px] text-[15px] leading-[1.45] text-white/85", !big && "hidden md:block")}>
            {p.summary}
          </p>
        )}
        <span className="mt-0.5 self-start rounded-full bg-accent px-[11px] py-1.5 text-[13px] font-semibold text-on-accent">
          {p.stat}
        </span>
      </div>

      {isVideo && (
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[3px] bg-white/20">
          <div
            className="h-full bg-accent transition-[width] duration-[800ms] ease-linear"
            style={{ width: `${((frame + 1) / frames.length) * 100}%` }}
          />
        </div>
      )}
    </Link>
  );
}
