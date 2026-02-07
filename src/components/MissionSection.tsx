"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const MESSAGES = [
  "We're building the world's most intelligent training system — merging human ambition with AI precision.",
  "AIM isn't just about improvement — it's about evolution.",
  "We believe elite coaching should be available to anyone with a ball, a dream, and a desire to be better.",
];

/** Sticky scroll section: mission messages cycle with blur, scale, and y transitions. */
export default function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity1 = useTransform(scrollYProgress, [0, 0.06, 0.1, 0.28, 0.36, 1], [0, 0, 1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0.06, 0.1, 0.28, 0.36], [40, 0, 0, -40]);
  const blur1 = useTransform(scrollYProgress, [0, 0.06, 0.1, 0.28, 0.36, 1], [4, 0, 0, 0, 4, 4]);
  const filter1 = useTransform(blur1, (v) => `blur(${v}px)`);
  const scale1 = useTransform(scrollYProgress, [0, 0.06, 0.1, 0.28, 0.36, 1], [0.96, 1, 1, 1, 0.96, 0.96]);

  const opacity2 = useTransform(scrollYProgress, [0, 0.28, 0.34, 0.58, 0.66, 1], [0, 0, 1, 1, 0, 0]);
  const y2 = useTransform(scrollYProgress, [0.28, 0.34, 0.58, 0.66], [40, 0, 0, -40]);
  const blur2 = useTransform(scrollYProgress, [0, 0.28, 0.34, 0.58, 0.66, 1], [4, 0, 0, 0, 4, 4]);
  const filter2 = useTransform(blur2, (v) => `blur(${v}px)`);
  const scale2 = useTransform(scrollYProgress, [0, 0.28, 0.34, 0.58, 0.66, 1], [0.96, 1, 1, 1, 0.96, 0.96]);

  const opacity3 = useTransform(scrollYProgress, [0, 0.58, 0.64, 0.88, 0.96, 1], [0, 0, 1, 1, 0, 0]);
  const y3 = useTransform(scrollYProgress, [0.58, 0.64, 0.88, 0.96], [40, 0, 0, -40]);
  const blur3 = useTransform(scrollYProgress, [0, 0.58, 0.64, 0.88, 0.96, 1], [4, 0, 0, 0, 4, 4]);
  const filter3 = useTransform(blur3, (v) => `blur(${v}px)`);
  const scale3 = useTransform(scrollYProgress, [0, 0.58, 0.64, 0.88, 0.96, 1], [0.96, 1, 1, 1, 0.96, 0.96]);

  const messages = [
    { text: MESSAGES[0], opacity: opacity1, y: y1, filter: filter1, scale: scale1 },
    { text: MESSAGES[1], opacity: opacity2, y: y2, filter: filter2, scale: scale2 },
    { text: MESSAGES[2], opacity: opacity3, y: y3, filter: filter3, scale: scale3 },
  ];

  return (
    <section ref={containerRef} aria-label="Our Mission" className="relative" data-header-theme="light">
      <div className="h-[500vh]">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center bg-white px-6 py-16">
          <div className="relative mx-auto min-h-[200px] w-full max-w-3xl text-center">
            {messages.map(({ text, opacity, y, filter, scale }, i) => (
              <motion.p
                key={i}
                className="absolute inset-0 flex items-center justify-center text-2xl leading-snug text-zinc-800 sm:text-3xl md:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  opacity,
                  y,
                  filter,
                  scale,
                }}
              >
                {text}
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
