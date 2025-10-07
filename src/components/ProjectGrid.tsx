// FILE: src/components/ProjectGrid.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import type { ProjectGridItem } from "@/lib/project-utils";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ProjectGridProps {
  projects: (ProjectGridItem & { firstImage: string | null })[];
}

const gridItemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export default function ProjectGrid({ projects }: ProjectGridProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const sizeToGridClass = {
    '2x2': 'col-span-2 row-span-2',
    '1x2': 'col-span-1 row-span-2',
    '2x1': 'col-span-2 row-span-1',
    '1x1': 'col-span-1 row-span-1',
  };

  return (
    // UPDATED: Added md:grid-flow-row-dense to make the grid packing algorithm smarter
    <div className="grid grid-cols-1 md:grid-cols-3 md:grid-flow-row-dense auto-rows-[350px] gap-4">
      {projects.map((project, index) => (
        <motion.div
          key={project.slug}
          className={`${
            isDesktop ? sizeToGridClass[project.size] : "col-span-1 row-span-1"
          } relative rounded-md overflow-hidden group`}
          custom={index}
          variants={gridItemVariants}
          initial="hidden"
          // UPDATED: Changed back to animate="visible" to fix staggering
          // and removed the conflicting transition prop.
          animate="visible"
        >
          <Link href={`/projects/${project.slug}`} className="block w-full h-full">
            {project.firstImage && (
              <Image
                src={project.firstImage}
                alt={`${project.name} preview`}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-colors duration-300 group-hover:from-black/70" />
            <div className="absolute inset-0 flex items-end p-6">
              <h3 className="text-white text-2xl font-bold uppercase tracking-tight">
                {project.name}
              </h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}