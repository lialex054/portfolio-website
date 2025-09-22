"use client"; // Required for scroll animations

import GlassesFollower from "@/components/GlassesFollower";
import { projects } from "@/lib/projects";
import { ChevronDown } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion"; // Import framer-motion tools
import Link from "next/link";

export default function Home() {
  const mostRecentProject = projects[0];

  // Hook to track scroll progress
  const { scrollYProgress } = useScroll();

  // Map scroll progress to opacity
  // When scrollYProgress is 0 (top), opacity is 1.
  // When scrollYProgress is 0.1 (10% scrolled), opacity is 0.
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  return (
    <main className="relative bg-gray-900 text-gray-100">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-24">
        {/* Container for the logo */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none pr-10">
          <div className="pointer-events-auto">
            <GlassesFollower />
          </div>
        </div>

        {/* Container for the left-aligned text and photo */}
        <div className="relative z-20">
          <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
          <p className="max-w-xl text-gray-300 mb-6">
            Hi, I’m Alex — a design engineering student passionate about building
            products that merge technical craft with user-focused design.
          </p>
          <div className="w-80 h-96 bg-gray-300 rounded-md"></div>
          <Link href={`/projects/${mostRecentProject.slug}`}>
            <button className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              My Projects
            </button>
          </Link>
        </div>

        {/* Animated Scroll Down Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
          style={{ opacity }} // Apply the dynamic opacity
        >
          <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
        </motion.div>
      </section>

      {/* Most Recent Project Section */}
      <section className="py-20 px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl">
          <div className="flex flex-col mb-8">
            <h2 className="text-xl text-gray-300 mb-2">
              Most recent project:
            </h2>
            <h3 className="text-4xl font-extrabold uppercase mb-4">
              {mostRecentProject.name}
            </h3>
            <p className="text-gray-400">{mostRecentProject.description}</p>
          </div>
          <div className="grid grid-cols-3 grid-rows-2 gap-4 h-80 md:h-96">
            <div className="col-span-2 row-span-2 bg-gray-300 rounded-md"></div>
            <div className="col-start-3 row-span-1 bg-gray-300 rounded-md"></div>
            <div className="col-start-3 row-start-2 row-span-1 bg-gray-300 rounded-md"></div>
          </div>
        </div>
      </section>
    </main>
  );
}