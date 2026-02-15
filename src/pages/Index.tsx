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
  // kolejność slajdów w dół (bez footer — footer wykrywamy scroll-em)
  const order = useMemo(
    () => ["top", "intro", "problem", "how", "recommend", "beta"],
    []
  );

  const [isFooter, setIsFooter] = useState(false);

  // 1) wykrycie dołu strony (pewne)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const vh = window.innerHeight || 0;
      const docH = document.documentElement.scrollHeight || 0;
      setIsFooter(y + vh >= docH - 80);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // helper: znajdź “aktualną” sekcję po pozycji na ekranie
  const getCurrentSectionIndex = () => {
    const offset = 96; // bezpieczny offset pod navbar / sticky
    const els = order
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return 0;

    // wybierz sekcję, której top jest najbliżej offsetu (z góry)
    let bestIdx = 0;
    let bestDist = Number.POSITIVE_INFINITY;

    els.forEach((el, idx) => {
      const top = el.getBoundingClientRect().top;
      const dist = Math.abs(top - offset);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = idx;
      }
    });

    return bestIdx;
  };

  const scrollNext = () => {
    const idx = getCurrentSectionIndex();
    const nextIdx = Math.min(idx + 1, order.length - 1);
    const nextId = order[nextIdx];
    const el = document.getElementById(nextId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const scrollTop = () => {
    const el = document.getElementById("top");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const bottomPos = "clamp(34px, 6vh, 78px)";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <div id="top" />
        <ComingSoonBanner />

        {/* 2 slajd — to MUSI być HeroSection */}
        <div id="intro" />
        <HeroSection />

        <div id="problem" />
        <ProblemSection />

        <div id="how" />
        <HowItWorksSection />

        <div id="recommend" />
        <RecommendationSection />

        <div id="beta" />
        <CTASection />
      </main>

      <Footer />

      {/* JEDEN DOCK */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-2"
        style={{ bottom: bottomPos }}
      >
        {/* napis tylko na dole, bez obrysów, lekki glow */}
        {isFooter && (
          <div
            className="text-sm md:text-[15px] tracking-tight"
            style={{
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 0 18px rgba(120,170,255,0.30)",
            }}
          >
            Wróć do strony głównej
          </div>
        )}

        <button
          type="button"
          onClick={isFooter ? scrollTop : scrollNext}
          aria-label={isFooter ? "Wróć na górę strony" : "Przewiń w dół"}
          className="transition-transform hover:scale-125 active:scale-110 opacity-95"
          style={{
            filter: isFooter
              ? "drop-shadow(0 0 18px rgba(120,170,255,0.55)) drop-shadow(0 10px 40px rgba(0,0,0,0.55))"
              : "drop-shadow(0 10px 40px rgba(0,0,0,0.55))",
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            style={{ transform: isFooter ? "rotate(180deg)" : "none" }}
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
      </div>
    </div>
  );
};

export default Index;
