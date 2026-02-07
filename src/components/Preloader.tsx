"use client";

import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import CtaButton from "@/components/CtaButton";

const TAGLINE_FADE_DELAY = 0.1;
const TAGLINE_DURATION = 1.2;
const TAGLINE_HOLD_MS = 3000;
const LOADER_DELAY_MS = 4300; // 100 + 1200 + 3000
const LOAD_DURATION_MS = 5000;
const DRAMATIC_EASE = [0.16, 1, 0.3, 1] as const;
const EXIT_EASE = [0.4, 0, 1, 1] as const;

const EPIC_PHRASE =
  "Every legend was once unknown. This is where they begin.";

const fromBelow = { opacity: 0, y: 30 };
const visible = { opacity: 1, y: 0 };
const pushTransition = { type: "tween" as const, duration: 0.65, ease: DRAMATIC_EASE };
const taglineTransition = {
  type: "tween" as const,
  duration: TAGLINE_DURATION,
  delay: TAGLINE_FADE_DELAY,
  ease: DRAMATIC_EASE,
};

type PreloaderProps = {
  onComplete?: () => void;
};

/** Preloader: AIM always visible, tagline fades in, holds 3s, loader/CTA push from below. */
export default function Preloader({ onComplete }: PreloaderProps) {
  const [showLoader, setShowLoader] = useState(false);
  const [showCta, setShowCta] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowLoader(true), LOADER_DELAY_MS);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!showLoader) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(100, (elapsed / LOAD_DURATION_MS) * 100);
      setProgress(p);
      if (p < 100) requestAnimationFrame(tick);
      else setShowCta(true);
    };
    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [showLoader]);

  const handleEnter = useCallback(() => setIsExiting(true), []);
  const handleExitComplete = useCallback(() => {
    setIsDone(true);
    onComplete?.();
  }, [onComplete]);

  // Lock body scroll while preloader is visible
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  if (isDone) return null;
  if (isExiting) {
    return (
      <PortalExit onComplete={handleExitComplete} phrase={EPIC_PHRASE} />
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex h-[100dvh] flex-col overflow-hidden bg-black text-white"
      style={{ height: "100dvh" }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <LayoutGroup>
        <motion.div
          layout
          className="flex h-full flex-col items-center justify-center gap-8 overflow-hidden px-6 py-12"
        >
          <p
            className="font-mono text-xs uppercase tracking-[0.4em] text-white/60 sm:text-sm"
            style={{ fontFamily: "var(--font-geist-mono), monospace" }}
          >
            AIM
          </p>
          <motion.p
            layout
            className="max-w-xl text-center text-lg font-light leading-relaxed text-white/90 sm:text-xl"
            style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={taglineTransition}
          >
            {EPIC_PHRASE}
          </motion.p>
          <AnimatePresence>
            {showLoader && (
              <motion.div
                layout
                className="w-full max-w-md"
                initial={fromBelow}
                animate={visible}
                exit={{ opacity: 0 }}
                transition={pushTransition}
              >
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="font-mono text-sm tabular-nums text-white/70"
                    style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                  >
                    {Math.round(progress)}%
                  </span>
                  <div className="h-px flex-1 overflow-hidden bg-white/30">
                    <motion.div
                      className="h-full bg-white"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.15, ease: "linear" }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {showCta && (
              <motion.div
                layout
                initial={fromBelow}
                animate={visible}
                exit={{ opacity: 0 }}
                transition={pushTransition}
              >
                <CtaButton onClick={handleEnter}>Enter the Experience</CtaButton>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </LayoutGroup>
    </motion.div>
  );
}

/** Exit: tagline fades out with scale + blur, subtle overlay, then onComplete. */
function PortalExit({
  onComplete,
  phrase,
}: {
  onComplete: () => void;
  phrase: string;
}) {
  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-hidden bg-black"
      style={{ height: "100dvh" }}
    >
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-white pointer-events-none"
        initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        animate={{
          opacity: 0,
          scale: 1.06,
          filter: "blur(6px)",
        }}
        transition={{
          type: "tween",
          duration: 1,
          ease: EXIT_EASE,
        }}
      >
        <p
          className="max-w-xl text-lg font-light leading-relaxed text-white/90 sm:text-xl"
          style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
        >
          {phrase}
        </p>
      </motion.div>
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{
          type: "tween",
          duration: 0.6,
          times: [0, 0.5, 1],
          ease: EXIT_EASE,
        }}
        onAnimationComplete={onComplete}
      />
    </div>
  );
}
