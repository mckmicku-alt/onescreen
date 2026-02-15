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
  // sekcje do przewijania w dół
  const order = useMemo(
    () => ["top", "intro", "problem", "how", "recommend", "beta"],
    []
  );

  const [activeId, setActiveId] = useState<string>("top");
  const [isFooter, setIsFooter] = useState(false);

  // 1) aktywna sekcja (IntersectionObserver) – tylko do przewijania “w dół”
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
        rootMargin: "-5% 0px -55% 0px",
      }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [order]);

  // 2) WYKRYWANIE DOŁU – pewne na 100% (scroll)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0;
      const vh = window.innerHeight || 0;
      const docH = document.documentElement.scrollHeight || 0;

      // gdy jesteś blisko końca (80px) -> przełącz na tryb “footer”
      const nearBottom = y + vh >= docH - 80;
      setIsFooter(nearBottom);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

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

  const bottomPos = "clamp(34px, 6vh, 78px)";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <div id="top" />
        <ComingSoonBanner />

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

      {/* JEDEN DOCK: normalnie dół, na samym dole zmienia się w górę + label */}
      <div
        className="fixed left-1/2 -translate-x-1/2 z-[9999] flex flex-col items-center gap-3"
        style={{ bottom: bottomPos }}
      >
        {isFooter && (
          <div
            className="px-4 py-2 rounded-full text-sm md:text-[15px] tracking-tight"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              boxShadow:
                "0 14px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.04) inset",
              color: "rgba(255,255,255,0.92)",
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
