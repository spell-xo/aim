"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MissionSection from "@/components/MissionSection";
import Preloader from "@/components/Preloader";

/** Home: preloader then hero with AVATR-style header (visible after preloader completes). */
export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <Header visible={preloaderDone} />
      <div className="relative">
        <div className="sticky top-0 z-0 h-screen">
          <Hero visible={preloaderDone} />
        </div>
        <div className="relative z-10">
          <MissionSection />
        </div>
      </div>
    </div>
  );
}
