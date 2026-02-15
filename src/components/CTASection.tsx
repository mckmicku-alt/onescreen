import { useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [status, setStatus] = useState<null | { type: "success" | "error"; message: string }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(null);

    if (!email) {
      setStatus({ type: "error", message: "Podaj adres e-mail." });
      return;
    }
    if (!accepted) {
      setStatus({ type: "error", message: "Musisz zaakceptować politykę prywatności." });
      return;
    }

    try {
      setLoading(true);

      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, accepted }),
      });

      const data = await r.json().catch(() => null);

      if (!r.ok) {
        setStatus({
          type: "error",
          message: data?.error || "Coś poszło nie tak. Spróbuj ponownie.",
        });
        return;
      }

      setStatus({
        type: "success",
        message: "Gotowe! Jesteś na liście. Damy znać przed startem 🚀",
      });

      setEmail("");
      setAccepted(false);
    } catch {
      setStatus({ type: "error", message: "Błąd połączenia z serwerem." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">Dołącz do listy oczekujących</h2>

      <form onSubmit={hand
