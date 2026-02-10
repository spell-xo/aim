"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

type AudioContextValue = {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMute: () => void;
  startPlayback: () => void;
};

const AudioContext = createContext<AudioContextValue | null>(null);

const AUDIO_SRC = "/Audio/AIMBgMusic.mp3";
const VOLUME = 0.15; // Low background volume

/**
 * Provides global audio state and controls for background music.
 * Audio starts only after startPlayback() is called (after preloader).
 */
export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element on mount
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.volume = VOLUME;
    audio.loop = true;
    audio.preload = "auto";
    audioRef.current = audio;

    // Track play/pause state
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.pause();
      audio.src = "";
    };
  }, []);

  // Start playback (called after preloader completes)
  const startPlayback = useCallback(() => {
    if (isReady) return;
    setIsReady(true);

    const audio = audioRef.current;
    if (!audio) return;

    // Attempt autoplay - browsers may block this without user interaction
    audio.play().catch(() => {
      // Autoplay blocked - will play on first user interaction
      const playOnInteraction = () => {
        audio.play().catch(() => {});
        document.removeEventListener("click", playOnInteraction);
        document.removeEventListener("touchstart", playOnInteraction);
      };
      document.addEventListener("click", playOnInteraction);
      document.addEventListener("touchstart", playOnInteraction);
    });
  }, [isReady]);

  // Toggle mute state
  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      // Unmute - resume playback
      audio.play().catch(() => {});
      setIsMuted(false);
    } else {
      // Mute - pause playback
      audio.pause();
      setIsMuted(true);
    }
  }, [isMuted]);

  return (
    <AudioContext.Provider
      value={{ isPlaying, isMuted, toggleMute, startPlayback }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio(): AudioContextValue {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within AudioProvider");
  }
  return ctx;
}
