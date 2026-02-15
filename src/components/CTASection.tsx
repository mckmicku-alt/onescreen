"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Podaj adres e-mail");
      return;
    }

    if (!accepted) {
      toast.error("Musisz zaakceptować politykę prywatności");
      return;
    }

    try {
      setLoading(true);

      const r = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, accepted }),
      });

      const data = await r.json().catch(() => null);

      if (!r.ok) {
        toast.error(data?.error || "Coś poszło nie tak. Spróbuj ponownie.");
        return;
      }

      toast.success("Gotowe! Jesteś na liście. Damy znać przed startem 🚀");
      setEmail("");
      setAccepted(false);
    } catch (err) {
      toast.error("Błąd połączenia z serwerem.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="w-full py-16 px-4 flex flex-col items-center justify-center text-center">
      <h2 className="text-3xl md:text-4xl font-bold mb-6">
        Dołącz do listy oczekujących
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-md"
      >
        <input
          type="email"
          placeholder="Twój e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-black"
          required
        />

        <label className="flex items-start gap-2 text-sm text-gray-600 text-left">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
            className="mt-1"
          />
          Akceptuję politykę prywatności i zgadzam się na kontakt.
        </label>

        <button
          type="submit"
          disabled={loading}
          className="bg-black text-white py-3 rounded-xl hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Zapisywanie..." : "Dołącz"}
        </button>
      </form>
    </section>
  );
}
