"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type PageTransitionProps = {
  children: React.ReactNode;
};

const visible = { opacity: 1, y: 0, filter: "blur(0px)" };
const hidden = { opacity: 0, y: 20, filter: "blur(6px)" };

const NAVIGATED_FLAG_KEY = "aim:hasNavigated";
const LAST_PATHNAME_KEY = "aim:lastPathname";

/** Page-level transition wrapper; skips entrance animation on first load so preloader is visible. */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();

  // Persist navigation state without refs/state (keeps render pure and satisfies strict hook lint rules).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const previous = window.sessionStorage.getItem(LAST_PATHNAME_KEY);
    if (previous && previous !== pathname) {
      window.sessionStorage.setItem(NAVIGATED_FLAG_KEY, "1");
    }
    window.sessionStorage.setItem(LAST_PATHNAME_KEY, pathname);
  }, [pathname]);

  const hasNavigated =
    typeof window !== "undefined" &&
    window.sessionStorage.getItem(NAVIGATED_FLAG_KEY) === "1";
  const initial = hasNavigated ? hidden : visible;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={initial}
        animate={visible}
        exit={{ opacity: 0, y: -12, filter: "blur(4px)" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
