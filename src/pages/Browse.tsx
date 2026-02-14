import Navbar from "@/components/Navbar";
import TitleCard from "@/components/TitleCard";
import { useDebounce } from "@/hooks/use-debounce";
import { useUserPrefs } from "@/lib/prefs";
import { MediaType, tmdb } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

export default function Browse() {
  const { prefs } = useUserPrefs();
  const [tab, setTab] = useState<MediaType>("movie");
  const [q, setQ] = useState("");
  const dq = useDebounce(q, 350);

  const hasProviders = prefs.providers.length > 0;
  const monetization = useMemo(() => ["flatrate"] as const, []);

  const discoverQuery = useQuery({
    queryKey: ["discover", tab, prefs.providers.join(",")],
    queryFn: () =>
      tmdb.discover(tab, {
        withWatchProviders: prefs.providers.length ? prefs.providers : undefined,
        monetizationTypes: monetization as unknown as ("flatrate")[],
      }),
    enabled: dq.trim().length === 0,
  });

  const searchQuery = useQuery({
    queryKey: ["search", dq],
    queryFn: () => tmdb.searchMulti(dq.trim(), 1),
    enabled: dq.trim().length > 0,
  });

  const results = dq.trim().length > 0 ? searchQuery.data?.results ?? [] : discoverQuery.data?.results ?? [];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main className="pt-24 pb-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Przeglądaj</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Region: <span className="font-medium">{tmdb.region}</span> ·{" "}
              {hasProviders ? (
                <>
                  Filtr platform: <span className="font-medium">{prefs.providers.length}</span>
                </>
              ) : (
                <>
                  Nie masz ustawionych platform – <Link className="underline" to="/settings">ustaw je</Link>, żeby feed pokazywał tylko rzeczy „u Ciebie”.
                </>
              )}
            </p>
          </div>

          <div className="flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Szukaj filmu/serialu…"
              className="w-full md:w-[360px] rounded-xl border bg-background px-4 py-2 text-sm"
            />
            <Link
              to="/settings"
              className="rounded-xl border px-4 py-2 text-sm hover:bg-accent transition-colors"
            >
              Ustawienia
            </Link>
          </div>
        </div>

        {dq.trim().length === 0 && (
          <div className="mt-6 inline-flex rounded-xl border overflow-hidden">
            <button
              onClick={() => setTab("movie")}
              className={`px-4 py-2 text-sm ${tab === "movie" ? "bg-accent" : "hover:bg-accent/50"}`}
            >
              Filmy
            </button>
            <button
              onClick={() => setTab("tv")}
              className={`px-4 py-2 text-sm ${tab === "tv" ? "bg-accent" : "hover:bg-accent/50"}`}
            >
              Seriale
            </button>
          </div>
        )}

        {(discoverQuery.isLoading || searchQuery.isLoading) && (
          <div className="mt-10 text-sm text-muted-foreground">Ładowanie…</div>
        )}
        {(discoverQuery.error || searchQuery.error) && (
          <div className="mt-10 text-sm text-destructive">
            {String((discoverQuery.error ?? searchQuery.error) as Error)}
          </div>
        )}

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {results
            .filter((t) => (dq.trim().length ? t.media_type === "movie" || t.media_type === "tv" : true))
            .slice(0, 48)
            .map((t) => (
              <TitleCard key={`${t.id}-${t.media_type ?? tab}`} title={t} type={dq.trim().length ? undefined : tab} />
            ))}
        </div>

        {results.length === 0 && !discoverQuery.isLoading && !searchQuery.isLoading && (
          <div className="mt-10 text-sm text-muted-foreground">Brak wyników.</div>
        )}
      </main>
    </div>
  );
}
