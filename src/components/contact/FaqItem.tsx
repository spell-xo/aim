"use client";

import { motion, AnimatePresence } from "framer-motion";

/** Fluid animation easing per workspace animation principles */
const DRAMATIC_EASE = [0.16, 1, 0.3, 1] as const;
const ANIMATION_DURATION = 0.7;

type FaqItemProps = {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

/**
 * Single FAQ accordion item with fluid expand/collapse animation.
 * Full-width border lines for dramatic visual effect.
 */
export default function FaqItem({
  question,
  answer,
  isOpen,
  onToggle,
}: FaqItemProps) {
  return (
    <div className="w-full border-b border-white">
      {/* Question row */}
      <button
        onClick={onToggle}
        className="group flex w-full items-center justify-between px-6 py-6 text-left transition-colors hover:bg-white/5"
        aria-expanded={isOpen}
      >
        <span className="pr-8 text-lg uppercase text-white md:text-2xl">
          {question}
        </span>

        {/* Animated plus/minus icon */}
        <motion.span
          className="relative flex h-6 w-6 shrink-0 items-center justify-center"
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: ANIMATION_DURATION, ease: DRAMATIC_EASE }}
        >
          <span className="absolute h-[2px] w-4 bg-white" />
          <motion.span
            className="absolute h-4 w-[2px] bg-white"
            animate={{ scaleY: isOpen ? 0 : 1 }}
            transition={{ duration: 0.3, ease: DRAMATIC_EASE }}
          />
        </motion.span>
      </button>

      {/* Answer content with fluid height animation */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: ANIMATION_DURATION, ease: DRAMATIC_EASE },
              opacity: { duration: 0.4, ease: DRAMATIC_EASE },
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              exit={{ y: -10 }}
              transition={{ duration: 0.5, ease: DRAMATIC_EASE }}
              className="px-6 pb-8"
            >
              <p
                className="max-w-3xl text-base leading-relaxed text-white/70"
                style={{ fontFamily: "var(--font-geist-mono), monospace" }}
              >
                {answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
