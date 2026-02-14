import { motion } from "framer-motion";
import { ArrowLeftRight, Search, CreditCard, Frown } from "lucide-react";

const problems = [
  {
    icon: ArrowLeftRight,
    title: "Ciągłe przeskakiwanie",
    description: "Otwierasz Netflix, HBO, Disney+... i wciąż nie wiesz, gdzie jest ten film.",
  },
  {
    icon: Search,
    title: "Szukanie w nieskończoność",
    description: "Spędzasz więcej czasu na szukaniu co obejrzeć niż na samym oglądaniu.",
  },
  {
    icon: CreditCard,
    title: "Za dużo subskrypcji",
    description: "Płacisz za platformy, z których ledwo korzystasz, bo nie masz nad nimi kontroli.",
  },
  {
    icon: Frown,
    title: "Zmęczenie wyborem",
    description: "Przeglądasz katalogi godzinami, a na koniec i tak włączasz coś, co już widziałeś.",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item = {
  hidden: { y: 30, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.6 } },
};

const ProblemSection = () => {
  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Streaming nie powinien być <span className="text-accent neon-text-purple">frustrujący</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Brzmi znajomo? Nie jesteś sam.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {problems.map((problem) => (
            <motion.div
              key={problem.title}
              variants={item}
              className="glass rounded-2xl p-8 hover:border-primary/30 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:neon-glow transition-shadow">
                <problem.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{problem.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
