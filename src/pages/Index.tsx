import Navbar from "@/components/Navbar";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecommendationSection from "@/components/RecommendationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const ScrollArrow = ({ toId, label }: { toId: string; label: string }) => {
  const go = () => {
    const el = document.getElementById(toId);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex justify-center py-8 md:py-10">
      <button
        type="button"
        onClick={go}
        aria-label={label}
        className="transition-transform hover:scale-125 active:scale-110 opacity-85"
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <ComingSoonBanner />

        {/* 1) HERO */}
        <div id="hero" />
        <HeroSection />
        <ScrollArrow toId="problem" label="Przewiń dalej" />

        {/* 2) PROBLEM */}
        <div id="problem" />
        <ProblemSection />
        <ScrollArrow toId="how" label="Przewiń dalej" />

        {/* 3) HOW */}
        <div id="how" />
        <HowItWorksSection />
        <ScrollArrow toId="recommend" label="Przewiń dalej" />

        {/* 4) RECOMMEND */}
        <div id="recommend" />
        <RecommendationSection />
        <ScrollArrow toId="cta" label="Przewiń do zapisu na betę" />

        {/* 5) CTA */}
        <div id="cta" />
        <CTASection />
      </main>

      <div id="footer" />
      <Footer />
    </div>
  );
};

export default Index;
