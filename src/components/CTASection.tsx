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
      toast.error("Wpisz poprawny adres e-mail.", { position: "top-center" });
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
        toast.info("Ten adres e-mail jest już na naszej liście ✅", { position: "top-center" });
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
    <section className="py-16">
      <div className="mx-auto max-w-3xl px-4 text-center">
        {/* Nagłówek */}
        <h2 className="text-5xl font-extrabold text-white">
          Premiera wkrótce.
        </h2>

        {/* Neonowy napis */}
        <p className="mt-3 text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500">
          Dołącz do pierwszych 1000&nbsp;użytkowników.
        </p>

        {/* Dodatkowy opis */}
        <p className="mt-2 text-muted-foreground">
          Zostaw swój e-mail, a damy znać jako pierwsi.
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
