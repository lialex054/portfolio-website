"use client";

import { motion } from "framer-motion";

export default function Underline() {
  return (
    <motion.span
      className="block h-1 bg-black dark:bg-white rounded-full origin-left"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );
}