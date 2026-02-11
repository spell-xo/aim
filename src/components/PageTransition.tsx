"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type PageTransitionProps = {
  children: React.ReactNode;
};

/** Dramatic easing for fluid, water-like transitions */
const DRAMATIC_EASE = [0.16, 1, 0.3, 1] as const;

const visible = { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" };
const hidden = { opacity: 0, y: 30, scale: 0.98, filter: "blur(8px)" };

const NAVIGATED_FLAG_KEY = "aim:hasNavigated";
const LAST_PATHNAME_KEY = "aim:lastPathname";

/** Page-level transition wrapper with fluid, elegant animations. Skips entrance animation on first load so preloader is visible. */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  // Ensure hydration consistency: only check sessionStorage after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Persist navigation state for subsequent navigations
  useEffect(() => {
    if (!mounted) return;
    const previous = window.sessionStorage.getItem(LAST_PATHNAME_KEY);
    if (previous && previous !== pathname) {
      window.sessionStorage.setItem(NAVIGATED_FLAG_KEY, "1");
    }
    window.sessionStorage.setItem(LAST_PATHNAME_KEY, pathname);
  }, [pathname, mounted]);

  // Only apply navigation animation after hydration to avoid mismatch
  const hasNavigated =
    mounted && window.sessionStorage.getItem(NAVIGATED_FLAG_KEY) === "1";
  const initial = hasNavigated ? hidden : visible;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={initial}
        animate={visible}
        exit={{ opacity: 0, y: -20, scale: 0.98, filter: "blur(6px)" }}
        transition={{
          duration: 0.8,
          ease: DRAMATIC_EASE,
          opacity: { duration: 0.6 },
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
