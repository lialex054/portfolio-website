// FILE: src/components/ProjectGallery.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import ImageOverlay from "./ImageOverlay";
import { AnimatePresence } from "framer-motion";

export default function ProjectGallery({ images, projectName }: { images: string[]; projectName: string }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  // REMOVED: The 'direction' state is no longer needed
  // const [direction, setDirection] = useState(0); 

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
        {images.length > 0 ? (
          images.map((src, index) => {
            const className =
              index === 0
                ? "md:row-span-2 md:col-span-2 min-h-[400px]"
                : "min-h-[192px]";

            return (
              <div
                key={src}
                className={`relative rounded-md overflow-hidden bg-gray-800/50 ${className} 
                           group transition-transform duration-300 ease-in-out hover:scale-95 cursor-pointer`}
                onClick={() => handleImageClick(index)}
              >
                <Image
                  src={src}
                  alt={`${projectName} image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            );
          })
        ) : (
          <div className="md:col-span-2 flex items-center justify-center bg-gray-800/50 rounded-md min-h-[400px]">
            <p className="text-gray-500">
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