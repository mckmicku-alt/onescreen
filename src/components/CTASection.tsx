import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleJoin() {
    const e = email.trim();

    if (!e) {
      toast.error("Wpisz poprawny adres e‑mail.", { position: "top-center" });
      return;
    }
    if (!accepted) {
      toast.error("Musisz zaakceptować regulamin i politykę prywatności.", { position: "top-center" });
      return;
    }

    setLoading(true);

    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: e, accepted: true }),
      });

      const data = await r.json().catch(() => ({} as any));

      if (r.ok) {
        toast.success("Gotowe! Jesteś na liście. Damy znać przed startem 🚀", { position: "top-center" });
        setEmail("");
        setAccepted(false);
        return;
      }

      if (r.status === 409) {
        toast.info("Ten adres e‑mail jest już na naszej liście ✅", { position: "top-center" });
        return;
      }

      toast.error(data?.error || "Ups — nie udało się zapisać. Spróbuj ponownie.", { position: "top-center" });
    } catch {
      toast.error("Błąd sieci. Spróbuj ponownie.", { position: "top-center" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="cta" className="py-20">
      <div className="mx-auto max-w-3xl px-4">
        {/* Bańka z półprzezroczystym tłem */}
        <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-10 shadow-lg">
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Premiera wkrótce.
          </h2>
          <p className="mt-4 text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
            Dołącz do pierwszych 1000 użytkowników.
          </p>
          <p className="mt-2 text-lg text-muted-foreground">
            Zostaw e‑mail, jeśli jesteś zainteresowany!
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3">
              <Input
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
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
                onChange={(ev) => setAccepted(ev.target.checked)}
                className="mt-1"
              />
              <span>
                Akceptuję{" "}
                <a className="underline" href="/regulamin">Regulamin</a> oraz{" "}
                <a className="underline" href="/polityka-prywatnosci">Politykę prywatności</a>.
              </span>
            </label>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
