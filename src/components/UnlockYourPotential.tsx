"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

const PREMIUM_EASE = [0.16, 1, 0.3, 1] as const;
const SMOOTH_EASE = [0.4, 0, 0.2, 1] as const;

/** App store badge component with hover effect (scaled 30% larger) */
function AppStoreBadge({ type, href }: { type: "google" | "apple"; href: string }) {
  const isApple = type === "apple";
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-[52px] items-center gap-3 rounded-md border border-white/20 bg-black px-4 transition-all duration-300 hover:scale-105 hover:border-white/40"
      aria-label={isApple ? "Download on the App Store" : "Get it on Google Play"}
    >
      {isApple ? (
        <>
          <svg className="h-8 w-8" viewBox="0 0 24 24" fill="white">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-[10px] leading-tight text-white/70">Download on the</span>
            <span className="text-base font-medium leading-tight text-white">App Store</span>
          </div>
        </>
      ) : (
        <>
          <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none">
            <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92z" fill="#00D9FF"/>
            <path d="M17.556 8.235l-3.764 3.765 3.764 3.765-4.623 2.67L3.609 1.814l9.324 16.621 4.623-2.67z" fill="#00F076"/>
            <path d="M3.609 22.186l9.324-16.621 4.623 2.67-3.764 3.765 3.764 3.765-4.623 2.67L3.61 1.814" fill="#FF3A44"/>
            <path d="M3.609 1.814l9.324 6.421-2.35 4.09-6.974-9.59z" fill="#FFD500"/>
          </svg>
          <div className="flex flex-col items-start">
            <span className="text-[10px] leading-tight text-white/70">GET IT ON</span>
            <span className="text-base font-medium leading-tight text-white">Google Play</span>
          </div>
        </>
      )}
    </a>
  );
}

/**
 * UnlockYourPotential section: Large green headline with phone mockup overlaying it,
 * description text, and app store badges. Features scroll-based parallax animations.
 */
export default function UnlockYourPotential() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for phone mockup (reduced amplitude for more text breathing room)
  const phoneY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const phoneScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.97, 1, 1, 0.97]);

  // Fade in elements as section enters viewport
  const contentOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0, 1, 1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.2], [30, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#010400] py-24"
      data-header-theme="dark"
      aria-label="Unlock Your Potential"
    >
      {/* Fixed height container matching Figma: 900px on desktop, scaled on mobile */}
      <div className="relative mx-auto h-[700px] w-full max-w-[1440px] sm:h-[800px] lg:h-[900px]">
        {/* Headline - positioned at top, behind phone (z-10) */}
        <motion.div
          className="absolute left-1/2 top-0 z-10 w-full -translate-x-1/2 text-center"
          style={{ opacity: contentOpacity, y: headlineY }}
        >
          <h2
            className="whitespace-nowrap text-5xl uppercase leading-[1.1] tracking-tight text-[#24ff00] sm:text-7xl md:text-8xl lg:text-[144px]"
            style={{ fontFamily: "var(--font-anton), sans-serif" }}
          >
            <span className="block">UNLOCK</span>
            <span className="block">YOUR POTENTIAL</span>
          </h2>
        </motion.div>

        {/* Phone Mockup - positioned at top: 24px, overlaying headline (z-20) */}
        <motion.div
          className="absolute left-1/2 top-[16px] z-20 -translate-x-1/2 sm:top-[20px] lg:top-[24px]"
          style={{ y: phoneY, scale: phoneScale }}
        >
          <div className="relative h-[500px] w-[500px] sm:h-[600px] sm:w-[600px] md:h-[700px] md:w-[700px] lg:h-[852px] lg:w-[848px]">
            <Image
              src="/UnlockYourPotential/Mockup.png"
              alt="AIM app showing soccer training drills, levels, and performance tracking"
              fill
              className="object-contain drop-shadow-[0_4px_41px_rgba(0,0,0,0.72)]"
              priority
            />
          </div>
        </motion.div>

        {/* Description Text - positioned at bottom, in front of phone (z-30) */}
        <motion.p
          className="absolute bottom-[100px] left-1/2 z-30 w-[90%] max-w-[563px] -translate-x-1/2 text-center text-sm font-normal uppercase leading-relaxed tracking-wide text-[#d9d9d9] sm:bottom-[120px] sm:text-base md:text-lg lg:bottom-[150px]"
          style={{
            fontFamily: "var(--font-geist-sans), sans-serif",
            opacity: contentOpacity,
          }}
        >
          Every stat tells a story. From shot speed to jump height, our AI
          captures and breaks down your every move—giving you clear, measurable
          data that drives real progress.
        </motion.p>

        {/* App Store Badges - positioned closer to description text (z-30) */}
        <motion.div
          className="absolute bottom-[40px] left-1/2 z-30 flex -translate-x-1/2 flex-wrap items-center justify-center gap-4 sm:bottom-[60px] sm:gap-6 lg:bottom-[100px]"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: 0.3 }}
        >
          <AppStoreBadge type="google" href="https://play.google.com/store" />
          <AppStoreBadge type="apple" href="https://apps.apple.com" />
        </motion.div>
      </div>
    </section>
  );
}
