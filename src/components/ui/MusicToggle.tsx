"use client";

import { useAudio } from "@/contexts/AudioContext";

type MusicToggleProps = {
  className?: string;
  isDark?: boolean;
};

/**
 * Simple text-based music toggle: "SOUND ON/OFF"
 * Active state (ON or OFF) is highlighted in green.
 */
export default function MusicToggle({
  className = "",
  isDark = true,
}: MusicToggleProps) {
  const { isMuted, toggleMute } = useAudio();

  const baseColor = isDark ? "text-white/90" : "text-zinc-900";
  const activeColor = "text-[#24ff00]";

  return (
    <button
      type="button"
      onClick={toggleMute}
      className={`transition-colors duration-500 ${className}`}
      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
      style={{ fontFamily: "var(--font-geist-mono), monospace" }}
    >
      <span className={`text-xs uppercase tracking-[0.2em] ${baseColor}`}>
        SOUND{" "}
        <span className={`transition-colors duration-500 ${!isMuted ? activeColor : ""}`}>ON</span>
        /
        <span className={`transition-colors duration-500 ${isMuted ? activeColor : ""}`}>OFF</span>
      </span>
    </button>
  );
}
