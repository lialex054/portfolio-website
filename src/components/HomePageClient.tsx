"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import GlassesFollower from "@/components/GlassesFollower";
import FadeIn from "./FadeIn";
import Underline from "@/components/Underline";
import type { Project } from "@/lib/projects";
import ImageOverlay from "./ImageOverlay";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useScrollLock } from "@/hooks/use-scroll-lock";
import PageWrapper from "./PageWrapper";
import { Button } from "./ui/button";

interface HomePageClientProps {
  mostRecentProject: Project;
  recentProjectImages: string[];
}

export default function HomePageClient({ mostRecentProject, recentProjectImages }: HomePageClientProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const projectSectionRef = useRef<HTMLElement>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  useScrollLock(selectedImageIndex !== null);
  
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const handleImageClick = (index: number) => setSelectedImageIndex(index);
  const handleCloseOverlay = () => setSelectedImageIndex(null);
  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! + 1) % recentProjectImages.length);
  };
  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! - 1 + recentProjectImages.length) % recentProjectImages.length);
  };
  const handleScrollDown = () => {
    projectSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <PageWrapper>
      <div className="relative">
        <section className="relative min-h-screen flex items-center">
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none pr-10">
            {/* 3. Conditionally render the GlassesFollower only on desktop */}
            {isDesktop && (
              <div className="pointer-events-auto">
                <GlassesFollower />
              </div>
            )}
          </div>

          <FadeIn>
            <div className="relative z-20">
              <div className="inline-block mb-4">
                <h1 className="text-5xl font-extrabold mb-2">My Portfolio</h1>
                <Underline />
              </div>
              <p className="max-w-xl text-zinc-600 dark:text-zinc-300 mb-6 block">
                Hi, I’m Alex — a design engineering student passionate about building
                products that merge technical craft with user-focused design.
              </p>

              <Link href={`/projects/${mostRecentProject.slug}`} className="block mb-4">
                <h3 className="text-2xl font-outfit font-semibold text-orange-600 hover:text-orange-700 transition-colors">
                  View Projects &gt;
                </h3>
              </Link>
              
              <Image
                src="/photo.jpg"
                alt="A profile photo for the portfolio"
                width={320}
                height={384}
                className="rounded-md object-cover"
                priority
              />
            </div>
          </FadeIn>

          <motion.button
            className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
            style={{ opacity }}
            onClick={handleScrollDown}
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-8 h-8 text-zinc-500 dark:text-zinc-400 animate-bounce" />
          </motion.button>
        </section>

        <section ref={projectSectionRef} className="py-20">
          <FadeIn>
            <div className="max-w-3xl">
              <div className="flex flex-col mb-8">
                {/* UPDATED: Text colors now adapt to the theme */}
                <h2 className="text-xl text-zinc-600 dark:text-zinc-300 mb-2">
                  Most recent project:
                </h2>
                <h3 className="text-4xl font-extrabold uppercase mb-4">
                  {mostRecentProject.name}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400">{mostRecentProject.description}</p>
              </div>
              <div className="grid grid-cols-3 grid-rows-2 gap-4 h-80 md:h-96">
                {recentProjectImages.length > 0 ? (
                  <>
                    {/* UPDATED: Placeholder backgrounds now adapt to the theme */}
                    <div
                      className="relative col-span-2 row-span-2 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800/50 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95"
                      onClick={() => handleImageClick(0)}
                    >
                      <Image src={recentProjectImages[0]} alt={`${mostRecentProject.name} main image`} fill className="object-cover group-hover:opacity-100" sizes="(max-width: 768px) 100vw, 66vw" priority />
                    </div>
                    {recentProjectImages[1] && (
                      <div
                        className="relative col-start-3 row-span-1 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800/50 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95"
                        onClick={() => handleImageClick(1)}
                      >
                        <Image src={recentProjectImages[1]} alt={`${mostRecentProject.name} image 2`} fill className="object-cover group-hover:opacity-100" sizes="33vw" />
                      </div>
                    )}
                    {recentProjectImages[2] && (
                      <div className="relative col-start-3 row-start-2 row-span-1 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800/50 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95" onClick={() => handleImageClick(2)}>
                        <Image src={recentProjectImages[2]} alt={`${mostRecentProject.name} image 3`} fill className={`object-cover transition-opacity duration-300 ${recentProjectImages.length > 3 ? 'opacity-50' : ''}`} sizes="33vw" />
                        {recentProjectImages.length > 3 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 transition-opacity duration-300">
                            <p className="text-white text-lg font-semibold">See more images</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="col-span-full row-span-full flex items-center justify-center bg-zinc-200 dark:bg-zinc-800/50 rounded-md">
                    <p className="text-zinc-500 dark:text-zinc-500">No images available for this project.</p>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </section>

        <AnimatePresence>
          {selectedImageIndex !== null && (
            <ImageOverlay
              imageSrc={recentProjectImages[selectedImageIndex]}
              onClose={handleCloseOverlay}
              onNext={handleNext}
              onPrev={handlePrev}
            />
          )}
        </AnimatePresence>
      </div>
    </PageWrapper>
  );
}