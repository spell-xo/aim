"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

type ParallaxSectionProps = {
  children: React.ReactNode;
  className?: string;
  offset?: number;
};

// Parallax wrapper that offsets content based on scroll position.
export default function ParallaxSection({
  children,
  className,
  offset = 120,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
