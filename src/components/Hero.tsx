"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import CtaButton from "@/components/CtaButton";

const HERO_VIDEO_LOCAL = "/HeroVideoBG.mp4";
const HERO_VIDEO_FALLBACK =
  "https://assets.mixkit.co/videos/preview/mixkit-man-playing-soccer-502-large.mp4";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

type HeroProps = { visible?: boolean };

/** Full-viewport hero: video background, Anton headlines, green accent. Animates in when visible. */
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
      <div className="relative flex h-full flex-col p-6 md:p-12 lg:p-16">
        {/* Main content: vertical stack — h1, full-width divider, subtext right */}
        <div className="flex flex-1 flex-col justify-center gap-6 pt-16">
          <motion.div
            className="max-w-4xl text-left"
            initial={{ opacity: 0, y: 24 }}
            animate={
              visible
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 24 }
            }
            transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: visible ? 0.2 : 0 }}
          >
            <h1
              className="text-5xl uppercase leading-[1.1] tracking-tight text-white sm:text-6xl lg:text-[72px]"
              style={{ fontFamily: "var(--font-anton), sans-serif" }}
            >
              <span className="block">It&apos;s Time. To Rise.</span>
              <span className="block whitespace-nowrap text-[#24ff00]">
                From Streets To Stadiums.
              </span>
            </h1>
          </motion.div>
          <motion.div
            className="-mx-6 w-[calc(100%+3rem)] md:-mx-12 md:w-[calc(100%+6rem)] lg:-mx-16 lg:w-[calc(100%+8rem)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: visible ? 1 : 0 }}
            transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: visible ? 0.3 : 0 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-divider.svg"
              alt=""
              className="h-6 w-full"
              style={{ objectFit: "fill" }}
              aria-hidden
            />
          </motion.div>
          <motion.p
            className="max-w-sm self-end text-left text-lg font-normal uppercase leading-[1.25] tracking-wide text-white/90"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            initial={{ opacity: 0, x: 16 }}
            animate={
              visible
                ? { opacity: 1, x: 0 }
                : { opacity: 0, x: 16 }
            }
            transition={{ duration: 0.65, ease: PREMIUM_EASE, delay: visible ? 0.35 : 0 }}
          >
            WHERE TALENT MEETS OPPORTUNITY.
            <br />
            TRAIN SMARTER, PERFORM BETTER, AND RISE TO THE NEXT LEVEL.
          </motion.p>
        </div>

        {/* Bottom row: CTA left, scroll indicator right - aligned on same baseline */}
        <motion.div
          className="flex items-end justify-between px-0 pb-2 md:pb-0"
          initial={{ opacity: 0, y: 12 }}
          animate={
            visible
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 12 }
          }
          transition={{ duration: 0.5, ease: PREMIUM_EASE, delay: visible ? 0.4 : 0 }}
        >
          <CtaButton href="#join">GET STARTED</CtaButton>
          <span
            className="text-xs font-light uppercase tracking-[0.2em] text-white/70"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            SCROLL TO DISCOVER
          </span>
        </motion.div>
      </div>
    </section>
  );
}
