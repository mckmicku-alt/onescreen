import { useState } from "react";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [consent, setConsent] = useState(false);

  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("idle");
    setMessage("");

    if (!email.trim()) {
      setStatus("error");
      setMessage("Wpisz adres e-mail.");
      return;
    }
    if (!consent) {
      setStatus("error");
      setMessage("Zaznacz zgodę, aby dołączyć do bety.");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data?.error || "Coś poszło nie tak. Spróbuj ponownie.");
        return;
      }

      setStatus("ok");
      setMessage("Gotowe! Jesteś na liście bety. 🚀");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setMessage("Błąd sieci. Spróbuj ponownie za chwilę.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="signup" className="relative w-full py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl">
          {/* subtle glow */}
          <div
            aria-hidden="true"
            className="absolute -top-24 left-1/2 h-56 w-[42rem] -translate-x-1/2 blur-3xl opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(90,160,255,0.55) 0%, rgba(0,0,0,0) 70%)",
            }}
          />

          <div className="relative grid gap-10 p-8 md:grid-cols-2 md:p-12">
            {/* Left */}
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Dołącz do bety OneScreen
              </h2>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                Wczesny dostęp, roadmapa i pierwsze funkcje. Zero spamu — tylko
                konkretne informacje o starcie.
              </p>

              <ul className="mt-6 space-y-3 text-sm md:text-base">
                <li className="flex gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                  <span>Powiadomienie o starcie bety</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                  <span>Priorytetowy dostęp do nowych funkcji</span>
                </li>
                <li className="flex gap-3">
                  <span className="mt-1 inline-block h-2 w-2 rounded-full bg-primary" />
                  <span>Wpływ na rozwój produktu (feedback)</span>
                </li>
              </ul>
            </div>

            {/* Right */}
            <div>
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Adres e-mail</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="np. michal@email.com"
                    className="h-12 w-full rounded-xl border border-white/10 bg-black/30 px-4 text-sm outline-none focus:border-white/25 focus:ring-2 focus:ring-white/10"
                  />
                </div>

                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-white/20 bg-black/30"
                  />
                  <span>
                    Wyrażam zgodę na przetwarzanie mojego adresu e-mail w celu
                    otrzymania informacji o becie i starcie OneScreen.
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="h-12 w-full rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:opacity-95 transition disabled:opacity-60"
                >
                  {isLoading ? "Zapisywanie..." : "Zapisz mnie do bety"}
                </button>

                {status !== "idle" && (
                  <div
                    className={[
                      "rounded-xl border p-3 text-sm",
                      status === "ok"
                        ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                        : "border-red-500/30 bg-red-500/10 text-red-200",
                    ].join(" ")}
                  >
                    {message}
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Klikając przycisk, akceptujesz{" "}
                  <a className="underline underline-offset-4" href="/privacy">
                    Politykę prywatności
                  </a>{" "}
                  i{" "}
                  <a className="underline underline-offset-4" href="/terms">
                    Regulamin
                  </a>
                  .
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
