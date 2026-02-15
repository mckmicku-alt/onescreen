import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Efekty tła */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/3 w-[400px] h-[400px] rounded-full bg-accent/10 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6"
        >
          Wszystkie Twoje streamingi.{" "}
          <span className="text-primary neon-text">Jeden ekran.</span>
        </motion.h1>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          Nie szukaj gdzie jest film. OneScreen pokaże Ci od razu.
        </motion.p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          {/* Przycisk z linkiem do sekcji CTA */}
          <a href="#cta">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground neon-glow px-8 py-6 text-base font-display font-semibold rounded-xl"
            >
              Dołącz do beta testów
            </Button>
          </a>
          <Button
            size="lg"
            variant="outline"
            className="border-border hover:border-primary/50 text-foreground px-8 py-6 text-base font-display font-semibold rounded-xl hover:bg-primary/5"
            onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
          >
            Zobacz jak to działa
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
