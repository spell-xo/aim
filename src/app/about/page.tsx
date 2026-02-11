"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AboutHero from "@/components/about/AboutHero";
import GoalSection from "@/components/about/GoalSection";
import StatsSection from "@/components/about/StatsSection";
import VideoSection from "@/components/about/VideoSection";
import GallerySection from "@/components/about/GallerySection";

/**
 * About page with hero, goal, stats, video, and gallery sections.
 */
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      <Header visible />
      <AboutHero />
      <GoalSection />
      <StatsSection />
      <VideoSection />
      <GallerySection />
      <Footer />
    </main>
  );
}
