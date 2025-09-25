// FILE: src/components/ImageOverlay.tsx

"use client";

import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Re-add AnimatePresence

interface ImageOverlayProps {
  imageSrc: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

// A simple variant for the fade-in/fade-out effect
const fadeVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export default function ImageOverlay({ imageSrc, onClose, onNext, onPrev }: ImageOverlayProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onNext, onPrev, onClose]);

  const handleButtonClick = (e: React.MouseEvent, action: () => void) => {
    e.stopPropagation();
    action();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <button className="absolute top-4 right-4 z-50 text-white hover:text-gray-300" onClick={onClose}><X size={32} /></button>
      <button className="absolute left-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/75" onClick={(e) => handleButtonClick(e, onPrev)}><ChevronLeft size={32} /></button>
      <button className="absolute right-4 top-1/2 -translate-y-1/2 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/75" onClick={(e) => handleButtonClick(e, onNext)}><ChevronRight size={32} /></button>

      {/* UPDATED: We've re-added AnimatePresence with mode="wait" for a clean transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={imageSrc} // The key is crucial for AnimatePresence to know the image has changed
          variants={fadeVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.2 }}
          className="relative w-full h-full max-w-4xl max-h-[80vh]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image src={imageSrc} alt="Enlarged project image" fill className="object-contain" sizes="100vw" />
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}