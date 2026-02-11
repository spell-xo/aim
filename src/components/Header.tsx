"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useHeaderTheme } from "@/contexts/HeaderThemeContext";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";
import MusicToggle from "@/components/ui/MusicToggle";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;
const SMOOTH_EASE = [0.4, 0, 0.2, 1] as const;

/** Minimum scroll delta before direction change triggers hide/show */
const SCROLL_THRESHOLD = 10;

type HeaderProps = {
  visible?: boolean;
};

const textLight =
  "text-xs font-light uppercase tracking-[0.2em] text-white/90 md:block transition-colors duration-500";
const textLightNav =
  "text-xs font-medium uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-[#24ff00] duration-500";
const textDark =
  "text-xs font-light uppercase tracking-[0.2em] text-zinc-900 md:block transition-colors duration-500";
const textDarkNav =
  "text-xs font-medium uppercase tracking-[0.2em] text-zinc-900 transition-colors hover:text-[#24ff00] duration-500";

/** Hook for tracking scroll direction and position */
function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up");
  const [scrollY, setScrollY] = useState(0);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const updateScrollDirection = useCallback(() => {
    const currentY = window.scrollY;
    const delta = currentY - lastScrollY.current;

    // Only change direction if scroll delta exceeds threshold
    if (Math.abs(delta) > SCROLL_THRESHOLD) {
      setScrollDirection(delta > 0 ? "down" : "up");
      lastScrollY.current = currentY;
    }

    setScrollY(currentY);
    ticking.current = false;
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [updateScrollDirection]);

  return { scrollDirection, scrollY };
}

/** Renders progress bar + main header; fixed to viewport. Used inside portal. */
function HeaderContent({
  visible,
  isDark,
}: {
  visible: boolean;
  isDark: boolean;
}) {
  const { scrollDirection, scrollY } = useScrollDirection();
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    setViewportHeight(window.innerHeight);
    const handleResize = () => setViewportHeight(window.innerHeight);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Header visible when: in hero section OR scrolling up (after leaving hero)
  const isScrolledUp = scrollDirection === "up";
  const isInHero = scrollY < viewportHeight;
  const headerVisible = visible && (isInHero || isScrolledUp);

  // Show black background when scrolled past ~80% of hero (viewport height)
  const showBackground = scrollY > viewportHeight * 0.8;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999]">
      <motion.header
        className="pointer-events-auto fixed left-0 right-0 top-0 flex flex-col"
        initial={{ opacity: 0, y: -16 }}
        animate={{
          opacity: headerVisible ? 1 : 0,
          y: headerVisible ? 0 : -24,
        }}
        transition={{ duration: 0.5, ease: PREMIUM_EASE }}
      >
        {/* Animated black background layer */}
        <motion.div
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: showBackground ? 1 : 0 }}
          transition={{ duration: 0.4, ease: SMOOTH_EASE }}
          aria-hidden
        />

        {/* Progress bar at top, inside header */}
        <div className="relative flex h-5 items-center px-6">
          <ScrollProgressBar />
        </div>

        <div className="relative flex h-16 items-center justify-between px-6 md:px-8 lg:px-10">
          {/* Logo + Tagline grouped together per Figma design */}
          <div className="flex items-center gap-3">
            <Link
              href="/home"
              className="relative flex items-center transition-opacity hover:opacity-80"
              aria-label="AIM home"
            >
              <span
                className={`inline-block transition-[filter] duration-500 ${!isDark && !showBackground ? "invert" : ""}`}
              >
                <Image
                  src="/Logotype.svg"
                  alt="AIM"
                  width={23}
                  height={26}
                  className="h-7 w-auto"
                />
              </span>
            </Link>

            <p
              className={`hidden ${isDark || showBackground ? textLight : textDark}`}
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              Creating Tomorrow&apos;s Champions
            </p>
          </div>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6" aria-label="Main">
              <Link
                href="/home"
                className={isDark || showBackground ? textLightNav : textDarkNav}
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={isDark || showBackground ? textLightNav : textDarkNav}
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Mission
              </Link>
              <Link
                href="/contact"
                className={isDark || showBackground ? textLightNav : textDarkNav}
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Contact
              </Link>
              <Link
                href="/download"
                className={isDark || showBackground ? textLightNav : textDarkNav}
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Download
              </Link>
            </nav>
            <span
              className={`h-4 w-px transition-colors duration-500 ${isDark || showBackground ? "bg-white/40" : "bg-zinc-400"}`}
              aria-hidden
            />
            <MusicToggle isDark={isDark || showBackground} />
          </div>
        </div>
      </motion.header>
    </div>
  );
}

/** Minimal header per Figma: progress bar top, logo + tagline left, nav tabs + sound toggle right. Portals to body so fixed positioning is relative to viewport (avoids PageTransition transform). */
export default function Header({ visible = true }: HeaderProps) {
  const [mounted, setMounted] = useState(false);
  const { isDark } = useHeaderTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <HeaderContent visible={visible} isDark={isDark} />,
    document.body
  );
}
