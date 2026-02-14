import { motion } from "framer-motion";
import { Tv, Search, Play } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Tv,
    title: "Wybierz swoje platformy",
    description: "Podłącz Netflix, HBO Max, Disney+, Amazon Prime i inne serwisy, z których korzystasz.",
  },
  {
    number: "02",
    icon: Search,
    title: "Wpisz film",
    description: "Wpisz tytuł lub po prostu powiedz, na co masz ochotę — my znajdziemy to za Ciebie.",
  },
  {
    number: "03",
    icon: Play,
    title: "Oglądaj jednym kliknięciem",
    description: "OneScreen przeniesie Cię prosto do filmu — bez zbędnego szukania i przełączania.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-32 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Jak to <span className="text-primary neon-text">działa?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Trzy proste kroki do Twojego idealnego wieczoru filmowego.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="glass rounded-2xl p-8 text-center relative group hover:border-primary/30 transition-colors"
            >
              <span className="font-display text-6xl font-bold text-primary/10 absolute top-4 right-6 group-hover:text-primary/20 transition-colors">
                {step.number}
              </span>
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-6 group-hover:neon-glow transition-shadow">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
