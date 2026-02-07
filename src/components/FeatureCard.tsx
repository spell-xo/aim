"use client";

import { motion } from "framer-motion";

type FeatureCardProps = {
  title: string;
  description: string;
};

// Feature card with hover motion.
export default function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <motion.div
      className="group rounded-2xl border border-white/10 bg-white/5 p-7 backdrop-blur transition"
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-4 h-10 w-10 rounded-full bg-white/10" />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-white/70">{description}</p>
    </motion.div>
  );
}
