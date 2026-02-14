import { motion } from "framer-motion";
import { Sparkles, Film, ThumbsUp } from "lucide-react";

const RecommendationSection = () => {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] rounded-full bg-accent/8 blur-[120px] animate-pulse-glow" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-flex items-center gap-2 text-accent font-display text-sm font-semibold uppercase tracking-wider mb-4">
              <Sparkles className="w-4 h-4" />
              Funkcja wyróżniająca
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              „Nie wiem co{" "}
              <span className="text-accent neon-text-purple">obejrzeć</span>"
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Znamy to uczucie. Dlatego OneScreen analizuje Twoje preferencje i proponuje 
              filmy dopasowane do nastroju, pory dnia i Twoich ulubionych gatunków — 
              z wszystkich platform jednocześnie.
            </p>
            <div className="space-y-4">
              {[
                { icon: Film, text: "Rekomendacje z wszystkich Twoich platform" },
                { icon: ThumbsUp, text: "Ucz się Twoich gustów z każdym wyborem" },
                { icon: Sparkles, text: "Dopasowane do nastroju i pory dnia" },
              ].map((feature) => (
                <div key={feature.text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <feature.icon className="w-4 h-4 text-accent" />
                  </div>
                  <span className="text-foreground/80">{feature.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            {/* Mock UI card */}
            <div className="glass rounded-3xl p-8 relative">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-accent/20 pointer-events-none" />
              <div className="relative space-y-6">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles className="w-5 h-5 text-accent" />
                  <span className="font-display font-semibold text-foreground">Twoje rekomendacje</span>
                </div>
                {[
                  { title: "Dune: Część Druga", platform: "HBO Max", match: "95%" },
                  { title: "Oppenheimer", platform: "Netflix", match: "91%" },
                  { title: "Killers of the Flower Moon", platform: "Apple TV+", match: "87%" },
                ].map((movie, i) => (
                  <div
                    key={movie.title}
                    className="flex items-center justify-between py-3 border-b border-border/50 last:border-0"
                  >
                    <div>
                      <p className="font-display font-medium text-foreground">{movie.title}</p>
                      <p className="text-sm text-muted-foreground">{movie.platform}</p>
                    </div>
                    <span className="text-sm font-semibold text-primary neon-text">{movie.match}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default RecommendationSection;
