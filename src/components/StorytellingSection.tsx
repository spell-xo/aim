"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Premium easing curves for fluid animations */
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SMOOTH_EASE = [0.4, 0, 0.2, 1] as const;

/**
 * StorytellingSection: "Every Stat Tells A Story" section with asymmetric card grid,
 * descriptive text overlays, and scroll-based parallax animations.
 */
export default function StorytellingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for cards
  const cardY1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const cardY2 = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const cardY3 = useTransform(scrollYProgress, [0, 1], [80, -80]);

  // Fade in as section enters viewport
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#010400] py-24"
      data-header-theme="dark"
      aria-label="Every Stat Tells A Story"
    >
      {/* Full-bleed divider line - positioned at section level for true edge-to-edge */}
      <div
        className="pointer-events-none absolute inset-x-0 top-[calc(96px+52px+24px)] h-px bg-[#24ff00]/60 sm:top-[calc(96px+60px+24px)] lg:top-[calc(96px+52px+24px)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-[72px] px-6">
        {/* Header section */}
        <motion.div
          className="flex w-full flex-col items-center gap-6"
          style={{ opacity: contentOpacity }}
        >
          {/* Main heading */}
          <h2
            className="text-center text-4xl uppercase leading-none text-white sm:text-5xl lg:text-[52px]"
            style={{ fontFamily: "var(--font-anton), sans-serif" }}
          >
            Every stat
            <br />
            tells a story
          </h2>

          {/* Spacer for divider visual gap */}
          <div className="h-px w-full" aria-hidden="true" />

          {/* Subheading description */}
          <p
            className="max-w-[563px] text-center text-base uppercase leading-[1.25] text-white sm:text-lg"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
          >
            Every stat tells a story. From shot speed to jump height, our AI captures and breaks down your every move—giving you clear, measurable data that drives real progress.
          </p>
        </motion.div>

        {/* Cards grid section */}
        <div className="flex w-full flex-col gap-6">
          {/* Top row: Large left card + Right column */}
          <div className="flex flex-col gap-6 lg:h-[700px] lg:flex-row">
            {/* Large left card */}
            <motion.div
              className="h-[400px] flex-1 overflow-hidden rounded-xl bg-white lg:h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: PREMIUM_EASE }}
              style={{ y: cardY1 }}
            />

            {/* Right column */}
            <div className="flex flex-1 flex-col gap-6">
              {/* Top right card */}
              <motion.div
                className="h-[300px] w-full overflow-hidden rounded-xl bg-white lg:h-[400px]"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: PREMIUM_EASE, delay: 0.1 }}
                style={{ y: cardY2 }}
              />

              {/* Text overlay */}
              <motion.div
                className="flex flex-1 items-center overflow-hidden px-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.65, ease: SMOOTH_EASE, delay: 0.2 }}
              >
                <p
                  className="text-xl font-medium uppercase leading-[1.25] sm:text-2xl lg:text-[32px]"
                  style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
                >
                  <span className="text-[#a5a5a5]">Engineered to </span>
                  <span className="text-white">seamlessly blend</span>
                  <span className="text-[#a5a5a5]"> into your space aim improves your soccer skills without disrupting </span>
                  <span className="text-white">your environment</span>
                  <span className="text-[#a5a5a5]">.</span>
                </p>
              </motion.div>
            </div>
          </div>

          {/* Bottom full-width card */}
          <motion.div
            className="h-[300px] w-full overflow-hidden rounded-xl bg-white sm:h-[400px] lg:h-[520px]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: PREMIUM_EASE, delay: 0.15 }}
            style={{ y: cardY3 }}
          />
        </div>
      </div>
    </section>
  );
}
