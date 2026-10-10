"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { MouseEvent } from "react";
import { GlassesMark } from "@/components/glasses/Glasses";
import { site } from "@/lib/site";
import { openAbout, scrollToId, scrollToTop } from "@/lib/scroll";

const linkClass =
  "inline-flex min-h-11 items-center px-1.5 text-sm font-medium text-muted transition-colors hover:text-fg";

export default function Nav() {
  const onHome = usePathname() === "/";

  const toTop = (e: MouseEvent) => {
    if (!onHome) return;
    e.preventDefault();
    scrollToTop();
  };

  return (
    <header className="sticky top-0 z-30 border-b border-line bg-nav backdrop-blur-md">
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-4 py-2 pl-2.5 pr-3 md:px-8 md:py-2.5">
        <Link href="/" onClick={toTop} className="flex min-h-11 items-center gap-3 px-1.5" aria-label={`${site.name}, home`}>
          <GlassesMark className="h-[31px] w-[56px]" />
          <span className="text-base font-semibold tracking-[-0.01em]">{site.name}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-1 md:gap-3">
          {onHome ? (
            <>
              <button type="button" className={linkClass} onClick={() => scrollToId("work")}>
                Work
              </button>
              <button type="button" className={linkClass} onClick={openAbout}>
                About
              </button>
            </>
          ) : (
            <>
              <Link href="/#work" className={linkClass}>
                Work
              </Link>
              <Link href="/#about" className={linkClass}>
                About
              </Link>
            </>
          )}
          <a
            href={site.cv}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex min-h-11 items-center rounded-full bg-fg px-[18px] text-sm font-semibold text-bg transition-opacity hover:opacity-85"
          >
            CV ↗
          </a>
        </nav>
      </div>
    </header>
  );
}
