"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { TrackingGlasses } from "@/components/glasses/Glasses";
import { useGaze } from "@/components/glasses/GazeProvider";
import { about } from "@/lib/site";
import { OPEN_ABOUT_EVENT, scrollToId } from "@/lib/scroll";

export default function About({ portraitSize }: { portraitSize: { width: number; height: number } }) {
  const [open, setOpen] = useState(false);
  const { wink } = useGaze();

  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener(OPEN_ABOUT_EVENT, show);
    if (window.location.hash === "#about") {
      setOpen(true);
      window.setTimeout(() => scrollToId("about"), 120);
    }
    return () => window.removeEventListener(OPEN_ABOUT_EVENT, show);
  }, []);

  const toggle = () => {
    wink("about");
    const next = !open;
    setOpen(next);
    if (next) window.setTimeout(() => scrollToId("about"), 80);
  };

  return (
    <section id="about" aria-label="About" className="mt-12 border-t border-line pt-12 md:mt-20 md:pt-20">
      <div className="flex flex-col items-center gap-3.5 text-center">
        <button
          type="button"
          aria-expanded={open}
          aria-controls="about-panel"
          onClick={toggle}
          className="flex min-h-14 max-w-full items-center gap-3.5 rounded-full border border-line bg-tile py-3.5 pl-5 pr-6 text-base font-medium transition-colors hover:border-chip"
        >
          <TrackingGlasses id="about" pupil={16} className="h-[35px] w-16 shrink-0" />
          <span className="text-left">{open ? "Okay, that’s me" : "Want to see who’s behind the glasses?"}</span>
        </button>
        <span className="text-sm text-muted">
          {open ? "Tap the glasses again to close" : "Totally optional — tap the glasses"}
        </span>
      </div>

      {open && (
        <div
          id="about-panel"
          className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-[0.8fr_1.2fr_1fr]"
        >
          <div className="relative min-h-80 overflow-hidden rounded-tile border border-line bg-tile-2">
            <Image
              src={about.portrait}
              alt="Portrait of Alex"
              width={portraitSize.width}
              height={portraitSize.height}
              className="absolute inset-0 size-full object-cover object-top"
            />
          </div>
          <div className="flex flex-col gap-4 rounded-tile border border-line bg-tile p-8">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Behind the glasses</span>
            <p className="text-[26px] font-medium leading-[1.3] tracking-[-0.02em]">{about.lead}</p>
            {about.bio && <p className="leading-relaxed text-muted">{about.bio}</p>}
          </div>
          <div className="flex flex-col gap-5 rounded-tile border border-line bg-tile p-8 md:col-span-2 lg:col-span-1">
            <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Experience</span>
            <ul className="flex flex-col">
              {about.experience.map((x) => (
                <li key={x.org} className="flex flex-col gap-1 border-b border-line py-4 first:pt-0 last:border-0 last:pb-0">
                  <span className="text-[17px] font-semibold">{x.org}</span>
                  <span className="text-sm text-muted">
                    {x.role} · {x.dates}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
