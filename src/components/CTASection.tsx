import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("EMAIL", email);
    formData.append("locale", "en");
    formData.append("html_type", "simple");

    try {
      await fetch(
        "https://6a28c124.sibforms.com/serve/MUIFAPimLc05Jg9cgb23z5p-_sefOcx4-pebBJMpM85Zpeft8zgXgT2LbuHtvRcw9dDFkzLCfw0i-TfT0r75B1gkSMwQq-EhyRTsvRKQE5MuNcdbUQgzYr6Qml7Gn1AcVt6YPT0pAVZXSqQzy6xZepklUbLURl-KDCnnbEpJrJFHtWl3MQoqFCV7zOu1952e0nnslmszC_uAee-_PA==",
        {
          method: "POST",
          mode: "no-cors",
          body: formData,
        }
      );

      toast.success("Sprawdź maila 📩 Potwierdź zapis!");
      setEmail("");
    } catch (err) {
      toast.error("Coś poszło nie tak. Spróbuj ponownie.");
    }

    setLoading(false);
  };

  return (
    <section id="signup" className="py-32 px-6 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full bg-primary/8 blur-[120px] animate-pulse-glow" />
      </div>

      <motion.div
        initial={{ y: 40, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto text-center relative z-10"
      >
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
          Premiera wkrótce.{" "}
          <span className="text-primary neon-text">
            Dołącz do pierwszych 1000 użytkowników.
          </span>
        </h2>

        <p className="text-muted-foreground text-lg mb-10">
          Zostaw swój email, a powiadomimy Cię jako pierwszego.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="twoj@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
            className="bg-muted/50 border-border focus:border-primary h-12 rounded-xl"
          />

          <Button
            type="submit"
            size="lg"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 h-12 px-8 rounded-xl"
          >
            {loading ? "Wysyłanie..." : "Dołączam"}
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default CTASection;
