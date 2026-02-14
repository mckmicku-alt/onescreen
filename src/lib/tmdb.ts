export type MediaType = "movie" | "tv";

const TMDB_BASE = "https://api.themoviedb.org/3";

const apiKey = import.meta.env.VITE_TMDB_API_KEY as string | undefined;
const region = (import.meta.env.VITE_REGION as string | undefined) ?? "PL";

function assertApiKey(): string {
  if (!apiKey) {
    throw new Error(
      "Missing VITE_TMDB_API_KEY. Add it to .env (see comments in that file)."
    );
  }
  return apiKey;
}

async function tmdbFetch<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  const key = assertApiKey();

  const url = new URL(TMDB_BASE + path);
  url.searchParams.set("api_key", key);
  url.searchParams.set("language", "pl-PL");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const res = await fetch(url.toString(), {
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`TMDB error ${res.status}: ${text}`);
  }

  return (await res.json()) as T;
}

export type TmdbPaged<T> = {
  page: number;
  total_pages: number;
  total_results: number;
  results: T[];
};

export type TmdbTitle = {
  id: number;
  media_type?: MediaType;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  vote_average: number;
  vote_count: number;
};

export type TmdbTitleDetails = {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  genres: { id: number; name: string }[];
  runtime?: number;
  episode_run_time?: number[];
  number_of_seasons?: number;
  number_of_episodes?: number;
  vote_average: number;
};

export type TmdbProvidersResponse = {
  id: number;
  results: Record<
    string,
    {
      link?: string;
      flatrate?: { provider_id: number; provider_name: string; logo_path: string }[];
      rent?: { provider_id: number; provider_name: string; logo_path: string }[];
      buy?: { provider_id: number; provider_name: string; logo_path: string }[];
    }
  >;
};

export function tmdbImage(path: string | null, size: "w342" | "w500" | "original" = "w342") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

export const tmdb = {
  region,

  trending: (timeWindow: "day" | "week" = "week") =>
    tmdbFetch<TmdbPaged<TmdbTitle>>(`/trending/all/${timeWindow}`),

  searchMulti: (query: string, page = 1) =>
    tmdbFetch<TmdbPaged<TmdbTitle>>("/search/multi", {
      query,
      page: String(page),
      include_adult: "false",
    }),

  details: (type: MediaType, id: number) =>
    tmdbFetch<TmdbTitleDetails>(`/${type}/${id}`),

  providers: (type: MediaType, id: number) =>
    tmdbFetch<TmdbProvidersResponse>(`/${type}/${id}/watch/providers`),

  providerList: (type: MediaType) =>
    tmdbFetch<{ results: { provider_id: number; provider_name: string; logo_path: string }[] }>(
      `/watch/providers/${type}`,
      { watch_region: region }
    ),

  discover: (type: MediaType, opts: {
    page?: number;
    withWatchProviders?: number[];
    monetizationTypes?: ("flatrate" | "free" | "ads" | "rent" | "buy")[];
  } = {}) => {
    const params: Record<string, string> = {
      page: String(opts.page ?? 1),
      watch_region: region,
      include_adult: "false",
    };

    if (opts.withWatchProviders?.length) {
      // Comma-separated IDs. Combine with watch_region to filter by region.
      params.with_watch_providers = opts.withWatchProviders.join(",");
    }
    if (opts.monetizationTypes?.length) {
      params.with_watch_monetization_types = opts.monetizationTypes.join(",");
    }

    return tmdbFetch<TmdbPaged<TmdbTitle>>(`/discover/${type}`, params);
  },
};
