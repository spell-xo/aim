"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useHeaderTheme } from "@/contexts/HeaderThemeContext";
import ScrollProgressBar from "@/components/ui/ScrollProgressBar";

const PREMIUM_EASE = [0.22, 1, 0.36, 1] as const;

type HeaderProps = {
  visible?: boolean;
};

const textLight =
  "text-xs font-light uppercase tracking-[0.2em] text-white/90 md:block transition-colors duration-500";
const textLightNav =
  "text-xs font-medium uppercase tracking-[0.2em] text-white/90 transition-colors hover:text-white duration-500";
const textDark =
  "text-xs font-light uppercase tracking-[0.2em] text-zinc-900 md:block transition-colors duration-500";
const textDarkNav =
  "text-xs font-medium uppercase tracking-[0.2em] text-zinc-900 transition-colors hover:text-black duration-500";

/** Renders progress bar + main header; fixed to viewport. Used inside portal. */
function HeaderContent({
  visible,
  soundOn,
  setSoundOn,
  isDark,
}: {
  visible: boolean;
  soundOn: boolean;
  setSoundOn: React.Dispatch<React.SetStateAction<boolean>>;
  isDark: boolean;
}) {
  return (
    <>
      <div className="fixed left-0 right-0 top-0 z-[9999] pointer-events-none flex h-5 items-center px-6">
        <ScrollProgressBar />
      </div>
      <motion.header
        className="fixed left-0 right-0 top-5 z-[9998] flex flex-col"
        initial={{ opacity: 0, y: -16 }}
        animate={{
          opacity: visible ? 1 : 0,
          y: visible ? 0 : -16,
        }}
        transition={{ duration: 0.5, ease: PREMIUM_EASE }}
      >
        <div className="flex h-16 items-center justify-between px-6 md:px-8 lg:px-10">
          <Link
            href="/"
            className="relative flex items-center transition-opacity hover:opacity-80"
            aria-label="AIM home"
          >
            <span
              className={`inline-block transition-[filter] duration-500 ${!isDark ? "invert" : ""}`}
            >
              <Image
                src="/Hero/Logotype.svg"
                alt="AIM"
                width={23}
                height={26}
                className="h-7 w-auto"
              />
            </span>
          </Link>

          <p
            className={`absolute left-1/2 hidden -translate-x-1/2 ${isDark ? textLight : textDark}`}
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            Creating Tomorrow&apos;s Champions
          </p>

          <div className="flex items-center gap-6">
            <nav className="flex items-center gap-6" aria-label="Main">
              <Link
                href="#about"
                className={isDark ? textLightNav : textDarkNav}
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                About
              </Link>
              <Link
                href="#team"
                className={isDark ? textLightNav : textDarkNav}
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                Team
              </Link>
              <Link
                href="#aimfc"
                className={isDark ? textLightNav : textDarkNav}
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                AIMFC
              </Link>
            </nav>
            <span
              className={`h-4 w-px transition-colors duration-500 ${isDark ? "bg-white/40" : "bg-zinc-400"}`}
              aria-hidden
            />
            <button
              type="button"
              onClick={() => setSoundOn((o) => !o)}
              className={`flex items-center justify-center transition-colors duration-500 ${isDark ? "text-white/90 hover:text-white" : "text-zinc-900 hover:text-black"}`}
              aria-label={soundOn ? "Mute sound" : "Unmute sound"}
            >
              {soundOn ? (
                <SoundOnIcon className="h-5 w-5" />
              ) : (
                <SoundOffLine className="h-4 w-8" />
              )}
            </button>
          </div>
        </div>
      </motion.header>
    </>
  );
}

/** Minimal header per Figma: progress bar top, logo left, tagline center, nav tabs + sound toggle right. Portals to body so fixed positioning is relative to viewport (avoids PageTransition transform). */
export default function Header({ visible = true }: HeaderProps) {
  const [soundOn, setSoundOn] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isDark } = useHeaderTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <HeaderContent
      visible={visible}
      soundOn={soundOn}
      setSoundOn={setSoundOn}
      isDark={isDark}
    />,
    document.body
  );
}

/** Sound on: four vertical bars. */
function SoundOnIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden
    >
      <rect x="4" y="16" width="2" height="6" rx="0.5" />
      <rect x="9" y="12" width="2" height="10" rx="0.5" />
      <rect x="14" y="8" width="2" height="14" rx="0.5" />
      <rect x="19" y="4" width="2" height="18" rx="0.5" />
    </svg>
  );
}

/** Sound off: minimal 32px horizontal line per Figma. */
function SoundOffLine({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 32 16"
      strokeWidth={2}
      strokeLinecap="round"
      aria-hidden
    >
      <line x1="0" y1="8" x2="32" y2="8" />
    </svg>
  );
}
