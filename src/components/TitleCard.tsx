import { Link } from "react-router-dom";
import { MediaType, TmdbTitle, tmdbImage } from "@/lib/tmdb";

function inferType(t: TmdbTitle): MediaType | null {
  if (t.media_type === "movie" || t.media_type === "tv") return t.media_type;
  // For discover endpoints, media_type is not returned.
  // We pass type via prop in those lists.
  return null;
}

export default function TitleCard({ title, type }: { title: TmdbTitle; type?: MediaType }) {
  const effectiveType = type ?? inferType(title);
  if (!effectiveType) return null;

  const name = title.title ?? title.name ?? "(brak tytułu)";
  const date = title.release_date ?? title.first_air_date ?? "";
  const poster = tmdbImage(title.poster_path, "w342");

  return (
    <Link
      to={`/title/${effectiveType}/${title.id}`}
      className="group rounded-2xl overflow-hidden border bg-card hover:shadow-md transition-shadow"
    >
      <div className="aspect-[2/3] bg-muted">
        {poster ? (
          <img
            src={poster}
            alt={name}
            loading="lazy"
            className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
            Brak plakatu
          </div>
        )}
      </div>
      <div className="p-3">
        <div className="font-medium leading-snug line-clamp-2">{name}</div>
        <div className="mt-1 text-xs text-muted-foreground flex items-center justify-between">
          <span>{date}</span>
          <span>{title.vote_average ? title.vote_average.toFixed(1) : "—"}</span>
        </div>
      </div>
    </Link>
  );
}
