// FILE: src/components/HomePageClient.tsx

"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import GlassesFollower from "@/components/GlassesFollower";
import type { Project } from "@/lib/projects";
import ImageOverlay from "./ImageOverlay";

interface HomePageClientProps {
  mostRecentProject: Project;
  recentProjectImages: string[];
}

export default function HomePageClient({ mostRecentProject, recentProjectImages }: HomePageClientProps) {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const projectSectionRef = useRef<HTMLElement>(null);

  // State and handlers for the image overlay
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseOverlay = () => setSelectedImageIndex(null);

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % recentProjectImages.length);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + recentProjectImages.length) % recentProjectImages.length);
  };

  const handleScrollDown = () => {
    projectSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative bg-gray-900 text-gray-100">
      
      {/* --- THIS ENTIRE HERO SECTION WAS MISSING AND IS NOW RESTORED --- */}
      <section className="relative min-h-screen flex items-center px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none pr-10">
          <div className="pointer-events-auto">
            <GlassesFollower />
          </div>
        </div>

        <div className="relative z-20">
          <h1 className="text-4xl font-bold mb-4">My Portfolio</h1>
          <p className="max-w-xl text-gray-300 mb-6">
            Hi, I’m Alex — a design engineering student passionate about building
            products that merge technical craft with user-focused design.
          </p>
          
          <Image
            src="/photo.jpg"
            alt="A profile photo for the portfolio"
            width={320}
            height={384}
            className="rounded-md object-cover"
            priority
          />
          
          <Link href={`/projects/${mostRecentProject.slug}`}>
            <button className="mt-8 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
              My Projects
            </button>
          </Link>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer"
          style={{ opacity }}
          onClick={handleScrollDown}
        >
          <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
        </motion.div>
      </section>
      {/* --- END OF RESTORED SECTION --- */}


      {/* Most Recent Project Section */}
      <section ref={projectSectionRef} className="py-20 px-4 sm:px-6 md:px-12 lg:px-24">
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
            {recentProjectImages.length > 0 ? (
              <>
                <div
                  className="relative col-span-2 row-span-2 rounded-md overflow-hidden bg-gray-800/50 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95"
                  onClick={() => handleImageClick(0)}
                >
                  <Image src={recentProjectImages[0]} alt={`${mostRecentProject.name} main image`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 66vw" priority />
                </div>
                {recentProjectImages[1] && (
                  <div
                    className="relative col-start-3 row-span-1 rounded-md overflow-hidden bg-gray-800/50 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95"
                    onClick={() => handleImageClick(1)}
                  >
                    <Image src={recentProjectImages[1]} alt={`${mostRecentProject.name} image 2`} fill className="object-cover" sizes="33vw" />
                  </div>
                )}
                {recentProjectImages[2] && (
                  <div
                    className="relative col-start-3 row-start-2 row-span-1 rounded-md overflow-hidden bg-gray-800/50 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-95"
                    onClick={() => handleImageClick(2)}
                  >
                    <Image src={recentProjectImages[2]} alt={`${mostRecentProject.name} image 3`} fill className="object-cover" sizes="33vw" />
                  </div>
                )}
              </>
            ) : (
              <div className="col-span-full row-span-full flex items-center justify-center bg-gray-800/50 rounded-md">
                <p className="text-gray-500">No images available for this project.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Render the ImageOverlay when an image is selected */}
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
    </main>
  );
}