"use client";

import { motion } from "framer-motion";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
};

// Section container with subtle entrance animation.
export default function Section({ children, className }: SectionProps) {
  return (
    <motion.section
      className={`relative mx-auto w-full max-w-6xl px-6 py-24 sm:px-10 ${className ?? ""}`}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.section>
  );
}
