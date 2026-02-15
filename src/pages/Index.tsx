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
  // KOLEJNOŚĆ MA BYĆ:
  // Hero (kurtyna) -> Intro (2 przyciski) -> Problem -> How -> Recommend -> Beta (email) -> Footer
  const order = useMemo(
    () => ["top", "intro", "problem", "how", "recommend", "beta", "footer"],
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
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        threshold: [0.25, 0.4, 0.55, 0.7],
        rootMargin: "-10% 0px -55% 0px",
      }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [order]);

  const nextId = useMemo(() => {
    const idx = order.indexOf(activeId);
    if (idx === -1) return "intro";
    return order[Math.min(idx + 1, order.length - 1)];
  }, [activeId, order]);

  const scrollNext = () => {
    const id = activeId === "top" ? "intro" : nextId;
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollTop = () => {
    const el = document.getElementById("top");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const showDown = activeId !== "footer";
  const showUp = activeId === "footer";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <div id="top" />

        <ComingSoonBanner />

        {/* 2. ekran: ma być Hero z 2 przyciskami */}
        <div id="intro" />
        <HeroSection />

        <div id="problem" />
        <ProblemSection />

        <div id="how" />
        <HowItWorksSection />

        <div id="recommend" />
        <RecommendationSection />

        {/* Beta / mail dopiero bliżej końca */}
        <div id="beta" />
        <CTASection />

        <div id="footer" />
      </main>

      <Footer />

      {/* GLOBALNE STRZAŁKI */}
      {showDown && (
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Przewiń do kolejnej sekcji"
          className="fixed left-1/2 -translate-x-1/2 z-[9999] transition-transform hover:scale-125 active:scale-110 opacity-95"
          style={{ bottom: "clamp(20px, 4.2vh, 56px)" }}
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

      {showUp && (
        <button
          type="button"
          onClick={scrollTop}
          aria-label="Wróć na górę"
          className="fixed left-1/2 -translate-x-1/2 z-[9999] transition-transform hover:scale-125 active:scale-110 opacity-95"
          style={{ bottom: "clamp(20px, 4.2vh, 56px)" }}
        >
          <svg
            width="42"
            height="42"
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: "rotate(180deg)" }}
          >
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
