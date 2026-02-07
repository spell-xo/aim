"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CtaButton from "@/components/CtaButton";

const HERO_VIDEO_LOCAL = "/Hero/HeroVideoBG.mp4";
const HERO_VIDEO_FALLBACK =
  "https://assets.mixkit.co/videos/preview/mixkit-man-playing-soccer-502-large.mp4";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

type HeroProps = { visible?: boolean };

/** Full-viewport hero: video background, Anton headlines, green accent. Animates in when visible (after preloader). */
export default function Hero({ visible = true }: HeroProps) {
  const [src, setSrc] = useState(HERO_VIDEO_LOCAL);

  return (
    <section className="relative h-screen overflow-hidden" data-header-theme="dark">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        onError={() => setSrc(HERO_VIDEO_FALLBACK)}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/40" aria-hidden />
      <div className="relative flex h-full flex-col p-8 md:p-12 lg:p-16">
        {/* Main content: vertical stack — h1, full-width divider, subtext right */}
        <div className="flex flex-1 flex-col justify-center gap-6 pt-16">
          <motion.div
            className="max-w-2xl text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={
              visible
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: visible ? 0.2 : 0 }}
          >
            <h1
              className="text-5xl uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[72px]"
              style={{ fontFamily: "var(--font-anton), sans-serif" }}
            >
              <span className="block">It&apos;s Time. To Rise.</span>
              <span className="block text-[#24ff00]">
                From Streets To Stadiums.
              </span>
            </h1>
          </motion.div>
          <motion.div
            className="-mx-8 w-[calc(100%+4rem)] md:-mx-12 md:w-[calc(100%+6rem)] lg:-mx-16 lg:w-[calc(100%+8rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: visible ? 0.3 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/Hero/hero-divider.svg"
              alt=""
              className="h-6 w-full"
              style={{ objectFit: "fill" }}
              aria-hidden
            />
          </motion.div>
          <motion.p
            className="max-w-sm self-end text-left text-sm font-light uppercase leading-relaxed tracking-[0.15em] text-white/90 sm:text-base"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            initial={{ opacity: 0, x: 16 }}
            animate={
              visible
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 16 }
            }
            transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: visible ? 0.35 : 0 }}
          >
            WHERE TALENT MEETS OPPORTUNITY. TRAIN SMARTER, PERFORM BETTER, AND
            RISE TO THE NEXT LEVEL.
          </motion.p>
        </div>

        {/* Bottom-left: CTA */}
        <motion.div
          className="absolute bottom-8 left-8 md:bottom-12 md:left-12 lg:bottom-16 lg:left-16"
          initial={{ opacity: 0, y: 12 }}
          animate={
            visible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: visible ? 0.4 : 0 }}
        >
          <CtaButton href="#join">GET STARTED</CtaButton>
        </motion.div>

        {/* Bottom-right: scroll indicator */}
        <motion.div
          className="absolute bottom-8 right-8 flex flex-col items-end gap-2 md:bottom-12 md:right-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: visible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: visible ? 0.6 : 0 }}
        >
          <span
            className="text-xs font-light uppercase tracking-[0.2em] text-white/70"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            SCROLL TO DISCOVER
          </span>
          <motion.span
            className="block h-8 w-px bg-white/50"
            animate={{ scaleY: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  );
}
