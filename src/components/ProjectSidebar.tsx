"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects } from "@/lib/projects";
import { useState, useEffect, useRef } from "react";
import { motion, useSpring, useVelocity, useTransform } from "framer-motion";

export default function ProjectSidebar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  
  // Create refs for each navigation item to measure their position
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  // State to store the measured positions
  const [positions, setPositions] = useState<{ top: number; height: number }[]>([]);

  // 1. Measure the position of each link item after they render
  useEffect(() => {
    if (!navRef.current) return;
    const measuredPositions = itemRefs.current.map(el => {
      if (!el) return { top: 0, height: 0 };
      return { top: el.offsetTop, height: el.offsetHeight };
    });
    setPositions(measuredPositions);
  }, []);

  // Determine the index of the active or hovered item
  const activeIndex = projects.findIndex(p => pathname === `/projects/${p.slug}`);
  const targetIndex = hoveredIndex ?? activeIndex;

  // 2. Use a spring for the dot's vertical position for fluid movement
  const dotY = useSpring(0, { stiffness: 500, damping: 40 });
  const dotHeight = useSpring(6, { stiffness: 500, damping: 40 });

  // Update the spring's target position when the active/hovered item changes
  useEffect(() => {
    if (targetIndex !== -1 && positions[targetIndex]) {
      const { top, height } = positions[targetIndex];
      dotY.set(top + height / 2 - 3); // Center of the link item
    }
  }, [targetIndex, positions, dotY]);

  // 3. Use velocity and transform to create the stretching effect
  const yVelocity = useVelocity(dotY);
  const stretch = useTransform(yVelocity, [-300, 0, 300], [2.5, 1, 2.5]);

  return (
    <aside className="fixed top-0 bottom-0 left-0 w-64 p-12 flex items-center">
      <nav 
        ref={navRef}
        className="relative flex flex-col gap-4 text-left w-full"
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {projects.map((project, index) => (
          <Link
            key={project.slug}
            ref={el => itemRefs.current[index] = el}
            href={`/projects/${project.slug}`}
            className={`
              relative text-base transition-colors truncate
              ${(hoveredIndex === index || (hoveredIndex === null && activeIndex === index)) 
                ? "text-white" 
                : "text-gray-400 hover:text-white"}
            `}
            onMouseEnter={() => setHoveredIndex(index)}
          >
            {project.name}
          </Link>
        ))}

        {/* The single animated dot */}
        <motion.div
          className="absolute left-[-16px] w-1.5 rounded-full bg-white"
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