import Navbar from "@/components/Navbar";
import { useDebounce } from "@/hooks/use-debounce";
import { useUserPrefs } from "@/lib/prefs";
import { tmdb, tmdbImage } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Settings() {
  const { prefs, toggleProvider, clearProviders } = useUserPrefs();
  const [q, setQ] = useState("");
  const dq = useDebounce(q, 250);

  const movieProviders = useQuery({
    queryKey: ["providerList", "movie", tmdb.region],
    queryFn: () => tmdb.providerList("movie"),
  });
  const tvProviders = useQuery({
    queryKey: ["providerList", "tv", tmdb.region],
    queryFn: () => tmdb.providerList("tv"),
  });

  const allProviders = useMemo(() => {
    const map = new Map<number, { provider_id: number; provider_name: string; logo_path: string }>();
    for (const p of movieProviders.data?.results ?? []) map.set(p.provider_id, p);
    for (const p of tvProviders.data?.results ?? []) map.set(p.provider_id, p);
    return [...map.values()].sort((a, b) => a.provider_name.localeCompare(b.provider_name));
  }, [movieProviders.data, tvProviders.data]);

  const filtered = useMemo(() => {
    const s = dq.trim().toLowerCase();
    if (!s) return allProviders;
    return allProviders.filter((p) => p.provider_name.toLowerCase().includes(s));
  }, [allProviders, dq]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-10 max-w-5xl mx-auto px-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Ustawienia</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Wybierz platformy, które masz. Potem feed w <Link className="underline" to="/browse">Przeglądaj</Link> będzie filtrowany.
            </p>
          </div>
          <Link
            to="/browse"
            className="rounded-xl border px-4 py-2 text-sm hover:bg-accent transition-colors"
          >
            Wróć
          </Link>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Szukaj platformy…"
            className="w-full sm:w-[360px] rounded-xl border bg-background px-4 py-2 text-sm"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Wybrane: {prefs.providers.length}</span>
            <button
              onClick={clearProviders}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              Wyczyść
            </button>
          </div>
        </div>

        {(movieProviders.isLoading || tvProviders.isLoading) && (
          <div className="mt-8 text-sm text-muted-foreground">Ładowanie listy platform…</div>
        )}
        {(movieProviders.error || tvProviders.error) && (
          <div className="mt-8 text-sm text-destructive">
            {String((movieProviders.error ?? tvProviders.error) as Error)}
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((p) => {
            const checked = prefs.providers.includes(p.provider_id);
            const logo = tmdbImage(p.logo_path, "w342");
            return (
              <button
                key={p.provider_id}
                onClick={() => toggleProvider(p.provider_id)}
                className={`flex items-center gap-3 rounded-2xl border p-3 text-left hover:bg-accent/40 transition-colors ${checked ? "bg-accent" : ""}`}
              >
                <div className="h-10 w-10 rounded-xl bg-muted overflow-hidden flex items-center justify-center shrink-0">
                  {logo ? (
                    <img src={logo} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs text-muted-foreground">logo</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium leading-snug">{p.provider_name}</div>
                  <div className="text-xs text-muted-foreground">ID: {p.provider_id}</div>
                </div>
                <div className="text-sm">{checked ? "✅" : "⬜"}</div>
              </button>
            );
          })}
        </div>

        <div className="mt-10 rounded-2xl border p-4 text-sm text-muted-foreground">
          <div className="font-medium text-foreground">Tip</div>
          <p className="mt-1">
            Jeśli chcesz „Netflix + Max + Prime” – zaznacz je tutaj. Potem w <b>Przeglądaj</b> zobaczysz tylko tytuły,
            które TMDB oznacza jako dostępne w Twoim regionie na tych platformach.
          </p>
        </div>
      </main>
    </div>
  );
}
