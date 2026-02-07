"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type HeaderTheme = "dark" | "light";

type HeaderThemeContextValue = {
  isDark: boolean;
};

const HeaderThemeContext = createContext<HeaderThemeContextValue | null>(null);

const THEME_ATTR = "data-header-theme";
/** Top 5% of viewport = header zone; observer uses negative bottom margin so only that zone counts. */
const ROOT_MARGIN = "0px 0px -95% 0px";

/** Provides isDark based on which section is under the header (Intersection Observer on data-header-theme). */
export function HeaderThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const nodes = document.querySelectorAll(`[${THEME_ATTR}]`);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const topmost = intersecting.sort(
          (a, b) => a.boundingClientRect.top - b.boundingClientRect.top
        )[0];
        const theme = (topmost.target.getAttribute(THEME_ATTR) ?? "dark") as HeaderTheme;
        setIsDark(theme === "dark");
      },
      { root: null, rootMargin: ROOT_MARGIN, threshold: 0 }
    );

    nodes.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return (
    <HeaderThemeContext.Provider value={{ isDark }}>
      {children}
    </HeaderThemeContext.Provider>
  );
}

export function useHeaderTheme(): HeaderThemeContextValue {
  const ctx = useContext(HeaderThemeContext);
  if (!ctx) {
    return { isDark: true };
  }
  return ctx;
}
