"use client";

import { cn } from "@/lib/utils";

type CtaButtonBaseProps = {
  className?: string;
  children: React.ReactNode;
};

type CtaButtonAsLinkProps = CtaButtonBaseProps &
  Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    "className" | "children" | "href"
  > & {
    /** Link destination; renders an anchor element when set. */
    href: string;
  };

type CtaButtonAsButtonProps = CtaButtonBaseProps &
  Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "className" | "children"
  > & {
    /** Button type; defaults to "button". */
    type?: "button" | "submit" | "reset";
  };

export type CtaButtonProps = CtaButtonAsLinkProps | CtaButtonAsButtonProps;

/**
 * Primary CTA used across the site.
 *
 * Style: minimal outline with left-to-right green fill on hover (`.btn-fill-hover`).
 */
export default function CtaButton(props: CtaButtonProps) {
  const baseClassName =
    "btn-fill-hover inline-flex items-center gap-2 rounded-sm border border-white bg-transparent px-8 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.25em] text-white";

  if ("href" in props) {
    const { href, className, children, style, ...rest } = props;
    return (
      <a
        href={href}
        className={cn(baseClassName, className)}
        style={{
          fontFamily: "var(--font-geist-mono), monospace",
          ...style,
        }}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { className, children, style, type = "button", ...rest } = props;
  return (
    <button
      type={type}
      className={cn(baseClassName, className)}
      style={{
        fontFamily: "var(--font-geist-mono), monospace",
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

