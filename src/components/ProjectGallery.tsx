// FILE: src/components/ProjectGallery.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import ImageOverlay from "./ImageOverlay";
import { AnimatePresence } from "framer-motion";
import { useScrollLock } from "@/hooks/use-scroll-lock";

export default function ProjectGallery({ images, projectName }: { images: string[]; projectName: string }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  useScrollLock(selectedImageIndex !== null);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseOverlay = () => setSelectedImageIndex(null);

  const handleNext = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! + 1) % images.length);
  };

  const handlePrev = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prevIndex) => (prevIndex! - 1 + images.length) % images.length);
  };

  return (
    <>
      {/* UPDATED: The image grid code has been restored here */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {images.length > 0 ?
          (images.slice(0, 3).map((src, index) => {
            const isThirdImage = index === 2;
            const hasMoreImages = images.length > 3;
            const showOverlay = isThirdImage && hasMoreImages;
            const className = index === 0 ? "md:row-span-2 md:col-span-2 min-h-[400px]" : "min-h-[192px]";
            
            return (
              <div
                key={src}
                className={`group relative rounded-md overflow-hidden bg-zinc-200 dark:bg-zinc-800/50 ${className} transition-transform duration-300 ease-in-out hover:scale-95 cursor-pointer`}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={src}
                  alt={`${projectName} image ${index + 1}`}
                  fill
                  className={`object-cover transition-opacity duration-300 ${showOverlay ? 'group-hover:opacity-50' : ''}`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {showOverlay && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-white text-lg font-semibold">See more images</p>
                  </div>
                )}
              </div>
            );
          }))
         : 
        (
          <div className="md:col-span-2 flex items-center justify-center bg-zinc-200 dark:bg-zinc-800/50 rounded-md min-h-[400px]">
            <p className="text-zinc-500">
              No images available for this project.
            </p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selectedImageIndex !== null && (
          <ImageOverlay
            imageSrc={images[selectedImageIndex]}
            onClose={handleCloseOverlay}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        )}
      </AnimatePresence>
    </>
  );
}