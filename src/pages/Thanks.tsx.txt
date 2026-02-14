import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function Thanks() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="font-display text-3xl sm:text-4xl font-bold">
          Jesteś na liście ✅
        </h1>
        <p className="text-muted-foreground text-lg">
          Dzięki! Jeśli włączyłeś double opt-in w Brevo, to teraz potwierdź zapis w mailu.
          Gdy beta ruszy — damy Ci znać jako pierwszemu.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Button asChild size="lg" className="rounded-xl">
            <Link to="/">Wróć na stronę</Link>
          </Button>
        </div>

        <p className="text-xs text-muted-foreground">
          Jeśli nie widzisz maila, sprawdź SPAM / Oferty i dodaj nas do zaufanych.
        </p>
      </div>
    </div>
  );
}
