"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSortedProjects } from "@/lib/project-utils";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
} from "framer-motion";
import { useSidebar } from "@/context/SidebarContext";
import { useScrollLock } from "@/hooks/use-scroll-lock";

const NavContent = ({ onLinkClick }: { onLinkClick?: () => void }) => {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const projects = useMemo(() => getSortedProjects(), []);

  const activeIndex = projects.findIndex(
    (p) => pathname === `/projects/${p.slug}`
  );
  const targetIndex = hoveredIndex ?? activeIndex;

  // Trigger the stretch each time the active/hovered target changes
  const [animTick, setAnimTick] = useState(0);
  const isFirst = useRef(true);
  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      return;
    }
    setAnimTick((t) => t + 1);
  }, [targetIndex]);

  return (
    <nav
      className="relative w-full p-12 text-left"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <h2 className="mb-2 text-lg font-semibold text-zinc-500 dark:text-zinc-400">
        Projects
      </h2>

      <LayoutGroup id="sidebar">
        <ul className="relative flex flex-col gap-4">
          {projects.map((project, index) => {
            const isTarget =
              targetIndex === index && index !== -1;

            return (
              <li key={project.slug} className="relative pl-4">
                {isTarget && (
                  // Wrapper that moves with a spring between items
                  <motion.span
                    layoutId="active-dot"
                    className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2"
                    transition={{
                      type: "spring",
                      layout: {
                        type: "spring",
                        stiffness: 650,
                        damping: 36,
                        mass: 0.35,
                      },
                    }}
                    aria-hidden="true"
                  >
                    {/* Inner dot that stretches briefly on each move */}
                    <motion.span
                      key={animTick}
                      className="block h-1.5 w-1.5 rounded-full bg-black dark:bg-white"
                      initial={{ scaleX: 1, scaleY: 1, color: 'transparent' }}
                      animate={{
                        scaleY: [1, 1.8, 1],
                        scaleX: [1, 0.85, 1],
                      }}
                      transition={{
                        duration: 0.35,
                        times: [0, 0.45, 1],
                        ease: "easeOut",
                      }}
                      aria-hidden="true"
                    />
                  </motion.span>
                )}

                <Link
                  href={`/projects/${project.slug}`}
                  onClick={onLinkClick}
                  onMouseEnter={() => setHoveredIndex(index)}
                  className={`relative truncate text-base ${
                    isTarget
                      ? "font-semibold text-zinc-900 dark:text-white"
                      : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  }`}
                >
                  {project.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </LayoutGroup>
    </nav>
  );
};

export default function ProjectSidebar() {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  useScrollLock(isSidebarOpen);

  return (
    <>
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:fixed lg:top-0 lg:bottom-0 lg:left-0 lg:flex lg:w-64 lg:items-center bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90">
        <NavContent />
      </aside>

      {/* --- MOBILE SIDEBAR --- */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleSidebar}
              className="fixed inset-0 z-40 bg-black/50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-80 max-w-[calc(100%-4rem)] bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90 lg:hidden"
            >
              <NavContent onLinkClick={toggleSidebar} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}