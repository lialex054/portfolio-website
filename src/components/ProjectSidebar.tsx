"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSortedProjects } from "@/lib/project-utils";
import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useSpring, useVelocity, useTransform } from "framer-motion";

export default function ProjectSidebar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  const sortedProjects = useMemo(() => getSortedProjects(), []);

  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const [positions, setPositions] = useState<{ top: number; height: number }[]>([]);

  useEffect(() => {
    if (!navRef.current) return;
    const measuredPositions = itemRefs.current.map(el => {
      if (!el) return { top: 0, height: 0 };
      return { top: el.offsetTop, height: el.offsetHeight };
    });
    setPositions(measuredPositions);
  }, [sortedProjects]);

  const activeIndex = sortedProjects.findIndex(p => pathname === `/projects/${p.slug}`);
  const targetIndex = hoveredIndex ?? activeIndex;

  const dotY = useSpring(0, { stiffness: 500, damping: 40 });
  const dotHeight = useSpring(6, { stiffness: 500, damping: 40 });

  useEffect(() => {
    if (targetIndex !== -1 && positions[targetIndex]) {
      const { top, height } = positions[targetIndex];
      dotY.set(top + height / 2 - 3);
    }
  }, [targetIndex, positions, dotY]);

  const yVelocity = useVelocity(dotY);
  const stretch = useTransform(yVelocity, [-300, 0, 300], [2.5, 1, 2.5]);

  return (
    <aside className="fixed top-0 bottom-0 left-0 w-64 p-12 flex items-center">
      <nav 
        ref={navRef}
        className="relative flex flex-col gap-4 text-left w-full"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {sortedProjects.map((project, index) => {
          const isTarget = hoveredIndex === index || (hoveredIndex === null && activeIndex === index);
          return (
            <Link
              key={project.slug}
              ref={(el) => { itemRefs.current[index] = el; }}
              href={`/projects/${project.slug}`}
              className={`
                relative text-base transition-colors truncate
                ${isTarget 
                  ? "font-semibold text-gray-900 dark:text-white" // UPDATED: Active state is bold and theme-aware
                  : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"}
              `}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              {project.name}
            </Link>
          );
        })}

        <motion.div
          className="absolute left-[-16px] w-1.5 rounded-full bg-gray-900 dark:bg-white"
          style={{ 
            y: dotY, 
            scaleY: stretch,
            height: dotHeight,
          }}
        />
      </nav>
    </aside>
  );
}