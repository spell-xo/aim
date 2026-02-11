"use client";

import ContactHero from "@/components/contact/ContactHero";
import FaqSection from "@/components/contact/FaqSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

/**
 * Contact page with hero section, FAQ, and footer.
 */
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black" data-header-theme="dark">
      <Header />
      <ContactHero />
      <FaqSection />
      <Footer />
    </main>
  );
}
