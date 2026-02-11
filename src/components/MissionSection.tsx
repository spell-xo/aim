"use client";

import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";

/** Premium easing for dramatic entries */
const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;

const MESSAGES = [
  "We're building the world's most intelligent training system — merging human ambition with AI precision.",
  "AIM isn't just about improvement — it's about evolution.",
  "We believe elite coaching should be available to anyone with a ball, a dream, and a desire to be better.",
];

/** Animated word component with staggered reveal */
function AnimatedWord({
  word,
  index,
  isActive,
}: {
  word: string;
  index: number;
  isActive: boolean;
}) {
  return (
    <motion.span
      className="inline-block"
      initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{
        opacity: isActive ? 1 : 0,
        y: isActive ? 0 : 24,
        filter: isActive ? "blur(0px)" : "blur(8px)",
      }}
      transition={{
        duration: 0.8,
        delay: isActive ? index * 0.045 : 0,
        ease: PREMIUM_EASE,
      }}
    >
      {word}&nbsp;
    </motion.span>
  );
}

/** Splits text into words and animates each with staggered delays */
function SplitText({ text, isActive }: { text: string; isActive: boolean }) {
  const words = text.split(" ");
  return (
    <span className="inline">
      {words.map((word, i) => (
        <AnimatedWord key={i} word={word} index={i} isActive={isActive} />
      ))}
    </span>
  );
}

/** Sticky scroll section: mission messages cycle with elegant word-by-word reveal and premium transitions. */
export default function MissionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Message 1: appears early when section is fully visible (~0.16), holds until 0.34
  const opacity1 = useTransform(scrollYProgress, [0, 0.12, 0.16, 0.34, 0.40, 1], [0, 0, 1, 1, 0, 0]);
  const y1 = useTransform(scrollYProgress, [0.12, 0.16, 0.34, 0.40], [30, 0, 0, -30]);
  const scale1 = useTransform(scrollYProgress, [0, 0.12, 0.16, 0.34, 0.40, 1], [0.97, 0.97, 1, 1, 0.97, 0.97]);

  // Message 2: visible from 0.42 to 0.56, wider hold window
  const opacity2 = useTransform(scrollYProgress, [0, 0.38, 0.42, 0.56, 0.62, 1], [0, 0, 1, 1, 0, 0]);
  const y2 = useTransform(scrollYProgress, [0.38, 0.42, 0.56, 0.62], [30, 0, 0, -30]);
  const scale2 = useTransform(scrollYProgress, [0, 0.38, 0.42, 0.56, 0.62, 1], [0.97, 0.97, 1, 1, 0.97, 0.97]);

  // Message 3: visible from 0.64 to 0.80, holds longer before fade
  const opacity3 = useTransform(scrollYProgress, [0, 0.60, 0.64, 0.80, 0.86, 1], [0, 0, 1, 1, 0, 0]);
  const y3 = useTransform(scrollYProgress, [0.60, 0.64, 0.80, 0.86], [30, 0, 0, -30]);
  const scale3 = useTransform(scrollYProgress, [0, 0.60, 0.64, 0.80, 0.86, 1], [0.97, 0.97, 1, 1, 0.97, 0.97]);

  // Track which message is active for word animation (matches opacity ranges)
  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    if (progress >= 0.14 && progress < 0.38) {
      setActiveIndex(0);
    } else if (progress >= 0.40 && progress < 0.60) {
      setActiveIndex(1);
    } else if (progress >= 0.62 && progress < 0.84) {
      setActiveIndex(2);
    } else {
      setActiveIndex(-1);
    }
  });

  const messages = [
    { text: MESSAGES[0], opacity: opacity1, y: y1, scale: scale1 },
    { text: MESSAGES[1], opacity: opacity2, y: y2, scale: scale2 },
    { text: MESSAGES[2], opacity: opacity3, y: y3, scale: scale3 },
  ];

  return (
    <section id="mission" ref={containerRef} aria-label="Our Mission" className="relative" data-header-theme="light">
      <div className="h-[700vh]">
        <div className="sticky top-0 flex h-screen w-full items-center justify-center bg-white px-6 py-16">
          <div className="relative mx-auto min-h-[200px] w-full max-w-3xl text-center">
            {messages.map(({ text, opacity, y, scale }, i) => (
              <motion.p
                key={i}
                className="absolute inset-0 flex items-center justify-center text-2xl leading-snug text-zinc-800 sm:text-3xl md:text-4xl lg:text-5xl"
                style={{
                  fontFamily: "var(--font-geist-sans), sans-serif",
                  opacity,
                  y,
                  scale,
                }}
              >
                <SplitText text={text} isActive={activeIndex === i} />
              </motion.p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
