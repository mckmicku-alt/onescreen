import Navbar from "@/components/Navbar";
import ComingSoonBanner from "@/components/ComingSoonBanner";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import RecommendationSection from "@/components/RecommendationSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <ComingSoonBanner />

        {/* tu scrolluje strzałka */}
        <div id="content" />

        <HeroSection />
        <ProblemSection />
        <HowItWorksSection />
        <RecommendationSection />
        <CTASection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
