"use client";

import { useEffect } from "react";
import Lenis from "lenis";

type SmoothScrollProps = {
  children: React.ReactNode;
};

const LENIS_STOP_EVENT = "aim:lenis-stop";
const LENIS_START_EVENT = "aim:lenis-start";

// Smooth scrolling wrapper using Lenis.
export default function SmoothScroll({ children }: SmoothScrollProps) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let rafId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    /** Stops Lenis (preloader lock). */
    const stop = () => lenis.stop();
    /** Starts Lenis (unlock after preloader). */
    const start = () => lenis.start();

    window.addEventListener(LENIS_STOP_EVENT, stop);
    window.addEventListener(LENIS_START_EVENT, start);

    // If something mounted before SmoothScroll and already locked, honor it.
    if (document.documentElement.classList.contains("lenis-stopped")) {
      lenis.stop();
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      window.removeEventListener(LENIS_STOP_EVENT, stop);
      window.removeEventListener(LENIS_START_EVENT, start);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return children;
}
