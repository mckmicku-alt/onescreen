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
  // Kolejność slajdów (pierwszy = hero)
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
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        // ważne: hero nie “traci” aktywności za szybko, więc nie przeskakuje od razu
        rootMargin: "-5% 0px -55% 0px",
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

  // dół znika na footer
  const showDown = activeId !== "footer";
  // góra ma być na 2 slajdzie i na ostatnim
  const showUp = activeId === "intro" || activeId === "footer";

  // pozycja strzałek: wyżej niż wcześniej (żeby wyglądało premium)
  const bottomPos = "clamp(34px, 6vh, 78px)";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        {/* 1) HERO */}
        <div id="top" />
        <ComingSoonBanner />

        {/* 2) INTRO (2 przyciski: Dołącz / Jak działa) */}
        <div id="intro" />
        <HeroSection />

        {/* 3) PROBLEM */}
        <div id="problem" />
        <ProblemSection />

        {/* 4) HOW */}
        <div id="how" />
        <HowItWorksSection />

        {/* 5) RECOMMEND */}
        <div id="recommend" />
        <RecommendationSection />

        {/* 6) BETA (mail) */}
        <div id="beta" />
        <CTASection />

        {/* 7) FOOTER */}
        <div id="footer" />
      </main>

      <Footer />

      {/* STRZAŁKA W DÓŁ */}
      {showDown && (
        <button
          type="button"
          onClick={scrollNext}
          aria-label="Przewiń w dół"
          className="fixed left-1/2 -translate-x-1/2 z-[9999] transition-transform hover:scale-125 active:scale-110 opacity-95"
          style={{ bottom: bottomPos }}
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

      {/* STRZAŁKA W GÓRĘ (2 slajd i ostatni) */}
      {showUp && (
        <button
          type="button"
          onClick={scrollTop}
          aria-label="Wróć na górę"
          className="fixed left-1/2 -translate-x-1/2 z-[9999] transition-transform hover:scale-125 active:scale-110 opacity-85"
          style={{ bottom: `calc(${bottomPos} + 54px)` }}
        >
          <svg
            width="38"
            height="38"
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: "rotate(180deg)" }}
          >
            <path
              d="M6 9l6 6 6-6"
              stroke="white"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.9"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default Index;
