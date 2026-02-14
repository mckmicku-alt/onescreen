import Navbar from "@/components/Navbar";
import { useUserPrefs } from "@/lib/prefs";
import { MediaType, tmdb, tmdbImage } from "@/lib/tmdb";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

function asMediaType(x: string | undefined): MediaType | null {
  if (x === "movie" || x === "tv") return x;
  return null;
}

export default function Title() {
  const params = useParams();
  const type = asMediaType(params.type);
  const id = Number(params.id);
  const { prefs } = useUserPrefs();

  const details = useQuery({
    queryKey: ["details", type, id],
    queryFn: () => tmdb.details(type!, id),
    enabled: Boolean(type && Number.isFinite(id)),
  });

  const providers = useQuery({
    queryKey: ["providers", type, id],
    queryFn: () => tmdb.providers(type!, id),
    enabled: Boolean(type && Number.isFinite(id)),
  });

  if (!type || !Number.isFinite(id)) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Navbar />
        <main className="pt-24 max-w-3xl mx-auto px-6">
          <p className="text-sm text-muted-foreground">Nieprawidłowy link.</p>
          <Link className="underline" to="/browse">Wróć</Link>
        </main>
      </div>
    );
  }

  const d = details.data;
  const bg = tmdbImage(d?.backdrop_path ?? null, "original");
  const poster = tmdbImage(d?.poster_path ?? null, "w500");

  const regionData = providers.data?.results?.[tmdb.region];
  const flatrate = regionData?.flatrate ?? [];
  const availableOnSelected = prefs.providers.length
    ? flatrate.some((p) => prefs.providers.includes(p.provider_id))
    : false;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-20">
        <div className="relative">
          {bg && (
            <div className="absolute inset-0 -z-10">
              <img src={bg} alt="" className="h-[320px] w-full object-cover opacity-40" />
              <div className="absolute inset-0 bg-gradient-to-b from-background/10 to-background" />
            </div>
          )}
          <div className="max-w-6xl mx-auto px-6 pt-10 pb-6 flex gap-6">
            <div className="hidden sm:block w-[220px] shrink-0">
              <div className="rounded-2xl overflow-hidden border bg-muted aspect-[2/3]">
                {poster ? (
                  <img src={poster} alt={d?.title ?? d?.name ?? ""} className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
                    Brak plakatu
                  </div>
                )}
              </div>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between gap-3">
                <h1 className="text-3xl font-bold tracking-tight">
                  {d?.title ?? d?.name ?? "Ładowanie…"}
                </h1>
                <Link
                  to="/browse"
                  className="rounded-xl border px-4 py-2 text-sm hover:bg-accent transition-colors"
                >
                  Wróć
                </Link>
              </div>

              <div className="mt-2 text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-2">
                <span>Ocena: {d?.vote_average ? d.vote_average.toFixed(1) : "—"}</span>
                {d?.genres?.length ? <span>{d.genres.map((g) => g.name).join(" · ")}</span> : null}
              </div>

              {details.isError && (
                <div className="mt-6 text-sm text-destructive">{String(details.error as Error)}</div>
              )}

              <p className="mt-6 text-base leading-relaxed max-w-3xl">
                {d?.overview || "Brak opisu."}
              </p>

              <section className="mt-10">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold">Gdzie obejrzeć</h2>
                  <Link to="/settings" className="text-sm underline">
                    Ustaw platformy
                  </Link>
                </div>

                {providers.isLoading && (
                  <div className="mt-3 text-sm text-muted-foreground">Ładowanie dostępności…</div>
                )}
                {providers.isError && (
                  <div className="mt-3 text-sm text-destructive">{String(providers.error as Error)}</div>
                )}

                {regionData ? (
                  <>
                    {prefs.providers.length > 0 && (
                      <div className={`mt-3 text-sm ${availableOnSelected ? "text-emerald-500" : "text-muted-foreground"}`}>
                        {availableOnSelected
                          ? "✅ Dostępne na co najmniej jednej z Twoich platform"
                          : "⚠️ Nie widać tego na Twoich platformach (wg danych TMDB)"}
                      </div>
                    )}

                    <div className="mt-4 flex flex-wrap gap-2">
                      {flatrate.length ? (
                        flatrate.map((p) => (
                          <span key={p.provider_id} className="rounded-full border px-3 py-1 text-sm">
                            {p.provider_name}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground">
                          Brak danych o streamingu (flatrate) dla regionu {tmdb.region}.
                        </span>
                      )}
                    </div>

                    {regionData.link && (
                      <div className="mt-4">
                        <a
                          href={regionData.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex rounded-xl bg-primary text-primary-foreground px-4 py-2 text-sm font-medium"
                        >
                          Otwórz na TMDB (lista serwisów)
                        </a>
                      </div>
                    )}
                  </>
                ) : (
                  !providers.isLoading && (
                    <div className="mt-3 text-sm text-muted-foreground">
                      Brak danych o dostępności dla regionu {tmdb.region}.
                    </div>
                  )
                )}
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
