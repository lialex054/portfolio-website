// FILE: src/components/HomePageClient.tsx

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
import ProjectDocuments from "./ProjectDocuments";
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
          <div className="absolute inset-0 flex items-center justify-end pointer-events-none pr-32">
            {isDesktop && (
              <div className="pointer-events-auto">
                <GlassesFollower />
              </div>
            )}
          </div>

          <FadeIn>
            <div className="relative z-20">
              {/* UPDATED: Removed fixed size props and added responsive classes */}
              <Image
                src="/photo.png"
                alt="A profile photo for the portfolio"
                width={300} // Keep width/height for Next.js optimization, but CSS will override
                height={300}
                className="rounded-full object-cover object-top mb-6 
                           w-40 h-40 md:w-60 md:h-60 lg:w-[300px] lg:h-[300px]"
                priority
              />
              <div className="inline-block mb-4">
                <h1 className="text-5xl font-extrabold mb-2">Alex&apos;s Portfolio</h1>
                <Underline />
              </div>
              <h2 className="text-2xl font extrabold uppercase tracking-tight mb-4">Imperial College London | Ex-Revolut</h2>
              <p className="max-w-xl text-zinc-600 dark:text-zinc-300 mb-6 block">
                Hi, I’m Alex — an aspiring Product Manager and Design Engineer.
              </p>

              <Button asChild className="mb-4 bg-orange-500 hover:bg-orange-600 dark:bg-orange-600 dark:hover:bg-orange-700 text-white px-8 py-8">
                <Link href="/projects">
                  <h3 className="text-2xl font-outfit font-semibold">
                    View Projects &gt;
                  </h3>
                </Link>
              </Button>
              
            </div>
          </FadeIn>

          <motion.button
            className="fixed bottom-10 left-1/2 -translate-x-1/2 cursor-pointer z-20"
            style={{ opacity }}
            onClick={handleScrollDown}
            aria-label="Scroll to next section"
          >
            <ChevronDown className="w-8 h-8 text-zinc-500 dark:text-zinc-400 animate-bounce" />
          </motion.button>
        </section>

        <section ref={projectSectionRef} className="py-20">
          <FadeIn>
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="mb-12 lg:mb-0">
                <h2 className="text-xl text-zinc-600 dark:text-zinc-300 mb-2">
                  Most recent project:
                </h2>
                <div className="max-w-xl">
                  <h3 className="text-4xl font-extrabold uppercase mb-4">
                    {mostRecentProject.name}
                  </h3>
                  <p className="text-zinc-500 dark:text-zinc-400">{mostRecentProject.description}</p>
                  <ProjectDocuments documents={mostRecentProject.documents} />
                </div>
              </div>
              <div className="grid grid-cols-3 grid-rows-2 gap-4 h-80 md:h-96">
                {recentProjectImages.length > 0 ? (
                  <>
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
                      <div className="group relative col-start-3 row-start-2 row-span-1 rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800/50 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95" onClick={() => handleImageClick(2)}>
                        <Image src={recentProjectImages[2]} alt={`${mostRecentProject.name} image 3`} fill className={`object-cover transition-opacity duration-300 ${recentProjectImages.length > 3 ? 'group-hover:opacity-50' : ''}`} sizes="33vw" />
                        {recentProjectImages.length > 3 && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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