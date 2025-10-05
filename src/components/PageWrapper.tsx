"use client";

import { motion, type Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import type { PropsWithChildren } from "react";

const pageVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function PageWrapper({ children }: PropsWithChildren) {
  const pathname = usePathname();
  return (
    <motion.div
      key={pathname} // This key is crucial for AnimatePresence to detect page changes
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}