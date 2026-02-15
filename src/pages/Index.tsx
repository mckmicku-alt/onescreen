import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/Navbar";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecommendationSection from "@/components/RecommendationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  // kolejność “slajdów”
  const order = useMemo(
    () => ["top", "hero", "problem", "how", "recommend", "cta"],
    []
  );

  const [activeId, setActiveId] = useState<string>("top");

  useEffect(() => {
    const elements = order
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!elements.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        // bierzemy najbardziej “widoczny” element
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        threshold: [0.25, 0.4, 0.55, 0.7],
        // lekko przesuwamy “aktywny obszar” ku górze, żeby działało naturalnie
        rootMargin: "-10% 0px -55% 0px",
      }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [order]);

  const nextId = useMemo(() => {
    const idx = order.indexOf(activeId);
    if (idx === -1) return "hero";
    return order[Math.min(idx + 1, order.length - 1)];
  }, [activeId, order]);

  const showArrow = activeId !== "cta";

  const scrollNext = () => {
    const id = activeId === "top" ? "hero" : nextId;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* sentinel dla hero start */}
        <div id="top" />

        <ComingSoonBanner />

        <div id="hero" />
        <HeroSection />

        <div id="problem" />
        <ProblemSection />

        <div id="how" />
        <HowItWorksSection />

        <div id="recommend" />
        <RecommendationSection />

        {/* CTA na końcu */}
        <div id="cta" />
        <CTASection />
      </main>

      <Footer />

      {/* GLOBALNA STRZAŁKA: zawsze w dole ekranu (PC/telefon) */}
      {showArrow && (
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Przewiń do kolejnej sekcji"
          className="fixed left-1/2 -translate-x-1/2 z-[9999] transition-transform hover:scale-125 active:scale-110 opacity-95"
          style={{
            // zawsze widoczna, nigdy nie “wpadnie” pod kadr
            bottom: "clamp(20px, 4.2vh, 56px)",
          }}
        >
          <svg width="42" height="42" viewBox="0 0 24 24" fill="none">
            <path
              d="M6 9l6 6 6-6"
              stroke="white"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Index;
