"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { site } from "@/lib/site";

const pill =
  "inline-flex min-h-11 items-center rounded-full border border-chip px-[18px] text-sm font-medium transition-colors hover:border-fg";

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = resolvedTheme !== "light";
  return (
    <button
      type="button"
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={mounted ? `Switch to ${dark ? "light" : "dark"} theme` : "Switch theme"}
      className="inline-flex size-11 items-center justify-center rounded-full border border-chip transition-colors hover:border-fg"
    >
      {mounted && (dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />)}
    </button>
  );
}

export default function Footer() {
  return (
    <footer className="mx-auto mt-12 max-w-[1280px] px-4 pb-8 md:mt-20 md:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">Get in touch</span>
        <div className="flex flex-wrap gap-2">
          <a href={`mailto:${site.email}`} className={pill}>
            Email
          </a>
          <a href={site.linkedin} target="_blank" rel="noopener noreferrer" className={pill}>
            LinkedIn ↗
          </a>
          <a href={site.cv} target="_blank" rel="noopener noreferrer" className={pill}>
            CV ↗
          </a>
          <ThemeToggle />
        </div>
      </div>
      <p className="mt-7 text-[13px] text-muted">
        © {new Date().getFullYear()} {site.name}
      </p>
    </footer>
  );
}
