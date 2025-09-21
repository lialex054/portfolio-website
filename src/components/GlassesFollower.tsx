"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import glasses from "/public/glasses.svg";

export default function GlassesFollower() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Motion values for smooth movement
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    x.set(mouse.x - 32); // offset half width of SVG
    y.set(mouse.y - 32); // offset half height of SVG
  }, [mouse, x, y]);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        position: "absolute",
        top: 0,
        left: 0,
        width: 64,
        height: 64,
        pointerEvents: "none",
      }}
    >
      <Image src={glasses} alt="Glasses Logo" width={64} height={64} />
    </motion.div>
  );
}
