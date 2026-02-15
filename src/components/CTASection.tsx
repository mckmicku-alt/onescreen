import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<"idle" | "ok" | "error">("idle");

  const [errorMsg, setErrorMsg] = useState<string>("");
  const [debugBlock, setDebugBlock] = useState<string>("");

  async function handleJoin() {
    if (!accepted) return;

    setLoading(true);
    setSubmitted("idle");
    setErrorMsg("");
    setDebugBlock("");

    try {
      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, accepted: true }),
      });

      // Spróbujmy odczytać JSON, a jak nie wyjdzie — tekst
      let data: any = null;
      let rawText = "";

      try {
        data = await r.json();
      } catch {
        try {
          rawText = await r.text();
        } catch {
          rawText = "";
        }
      }

      if (!r.ok) {
        setSubmitted("error");
        setErrorMsg((data && data.error) || "Nie udało się zapisać. Spróbuj ponownie.");

        // Debug: pokaż WSZYSTKO co przyszło z backendu + status
        const dbg = {
          status: r.status,
          statusText: r.statusText,
          data,
          rawText,
        };
        setDebugBlock(JSON.stringify(dbg, null, 2));
        return;
      }

      setSubmitted("ok");
    } catch (e: any) {
      setSubmitted("error");
      setErrorMsg("Błąd sieci. Spróbuj ponownie.");
      setDebugBlock(JSON.stringify({ networkError: String(e?.message || e) }, null, 2));
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="signup" className="py-24">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass neon-glow rounded-3xl p-8 md:p-12 text-center"
        >
          <div className="mb-10 md:mb-12 text-center">
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight">
              <span className="text-white">Premiera wkrótce.</span>
              <br />
              <span className="text-primary neon-text">
                Dołącz do pierwszych 1000 użytkowników
              </span>
            </h1>
          </div>

          <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Zostaw swój email, a powiadomimy Cię jako pierwszego.
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="twój@email.com"
                required
                className="bg-muted/50 border-border focus:border-primary h-12 rounded-xl"
              />

              <Button
                type="button"
                className="h-12 rounded-xl px-10 transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                disabled={!accepted || loading || !email}
                onClick={handleJoin}
              >
                {loading ? "Wysyłam..." : "Dołączam"}
              </Button>
            </div>

            <label className="mt-4 flex items-start gap-3 text-sm text-muted-foreground text-left">
              <input
                type="checkbox"
                required
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="mt-1"
              />
              <span>
                Akceptuję{" "}
                <a className="underline hover:text-foreground" href="/terms">
                  Regulamin
                </a>{" "}
                oraz{" "}
                <a className="underline hover:text-foreground" href="/privacy">
                  Politykę prywatności
                </a>
                .
              </span>
            </label>

            <AnimatePresence>
              {submitted === "ok" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="mt-5 mx-auto max-w-xl rounded-2xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-foreground"
                >
                  <span className="text-primary font-semibold">Gotowe.</span>{" "}
                  Sprawdź maila i potwierdź zapis (double opt-in).
                </motion.div>
              )}

              {submitted === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="mt-5 mx-auto max-w-xl rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-foreground text-left"
                >
                  <div className="font-semibold mb-1">Ups.</div>
                  <div>{errorMsg}</div>

                  {debugBlock && (
                    <pre className="mt-3 max-h-56 overflow-auto whitespace-pre-wrap text-xs opacity-80">
                      {debugBlock}
                    </pre>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <p className="text-xs text-muted-foreground mt-3">
              Double opt-in jest włączony — po zapisie potwierdzisz klikając link w mailu.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
