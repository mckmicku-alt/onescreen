import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    if (!email) {
      toast.error("Wpisz poprawny adres e-mail.");
      return;
    }
    if (!accepted) {
      toast.error("Musisz zaakceptować regulamin i politykę prywatności.");
      return;
    }

    setLoading(true);

    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, accepted: true }),
      });

      const data = await r.json().catch(() => null);

      if (r.ok) {
        toast.success("Gotowe! Jesteś na liście. Damy znać przed startem 🚀");
        setEmail("");
        setAccepted(false);
        return;
      }

      // duplikat (409)
      if (r.status === 409) {
        toast.info("Ten adres e-mail jest już na naszej liście ✅");
        return;
      }

      toast.error(data?.error || "Ups — nie udało się zapisać. Spróbuj ponownie.");
    } catch {
      toast.error("Błąd sieci. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Premiera wkrótce.
        </motion.h2>

        <p className="mt-3 text-muted-foreground text-lg">
          Dołącz do pierwszych użytkowników. Zostaw e-mail, a damy znać jako pierwsi.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twój@email.com"
              className="bg-muted/50 border-border focus:border-primary h-12 rounded-xl"
              type="email"
            />
            <Button onClick={handleJoin} disabled={loading} className="h-12 rounded-xl">
              {loading ? "Wysyłam..." : "Dołączam"}
            </Button>
          </div>

          <label className="flex items-start gap-3 text-sm text-muted-foreground max-w-xl text-left">
            <input
              type="checkbox"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
              className="mt-1"
            />
            <span>
              Akceptuję{" "}
              <a className="underline" href="/regulamin">
                Regulamin
              </a>{" "}
              oraz{" "}
              <a className="underline" href="/polityka-prywatnosci">
                Politykę prywatności
              </a>
              .
            </span>
          </label>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
