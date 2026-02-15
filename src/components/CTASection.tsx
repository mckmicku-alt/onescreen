import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTASection = () => {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState<"idle" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [debugBlock, setDebugBlock] = useState("");

  async function handleJoin() {
    if (!accepted) {
      toast.error("Musisz zaakceptować regulamin i politykę prywatności.");
      return;
    }
    if (!email) {
      toast.error("Wpisz poprawny adres e-mail.");
      return;
    }

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

        const dbg = {
          status: r.status,
          statusText: r.statusText,
          data,
          rawText,
        };
        setDebugBlock(JSON.stringify(dbg, null, 2));

        toast.error("Ups — nie udało się zapisać.");
        return;
      }

      setSubmitted("ok");
      toast.success("Gotowe! Jesteś na liście. Damy znać przed startem 🚀");
      setEmail("");
      setAccepted(false);
    } catch (e: any) {
      setSubmitted("error");
      setErrorMsg("Błąd sieci. Spróbuj ponownie.");
      setDebugBlock(JSON.stringify({ networkError: String(e?.message || e) }, null, 2));
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
          Dołącz do pierwszych 1000 użytkowników. Zostaw swój email, a powiadomimy Cię jako pierwszego.
        </p>

        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="w-full max-w-xl flex flex-col sm:flex-row gap-3">
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="twój@email.com"
              required
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

          <AnimatePresence>
            {submitted === "ok" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 text-sm text-green-700"
              >
                Gotowe. Jesteś na liście oczekujących.
              </motion.div>
            )}

            {submitted === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-4 w-full max-w-xl rounded-xl border border-red-200 bg-red-50 p-4 text-left"
              >
                <div className="font-semibold">Ups.</div>
                <div className="text-sm text-red-700">{errorMsg}</div>

                {debugBlock && (
                  <pre classN
