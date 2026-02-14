# OneScreen Vision

MVP agregatora „co obejrzeć” z filtrowaniem po platformach streamingowych (region PL domyślnie).

## Co już działa

- `/` – landing (Twoja obecna strona)
- `/settings` – wybór platform (pobierane dynamicznie z TMDB Watch Providers)
- `/browse` – feed filmów/seriali filtrowany po wybranych platformach
- `/title/:type/:id` – karta tytułu + lista „Gdzie obejrzeć”

## Wymagania

- Node.js 18+
- Klucz API TMDB

## Start lokalnie

1. Skopiuj zmienne środowiskowe:

```bash
cp .env.example .env
```

2. W `.env` ustaw:

- `VITE_TMDB_API_KEY`
- (opcjonalnie) `VITE_REGION` (np. `PL`)

3. Zainstaluj zależności i uruchom:

```bash
npm install
npm run dev
```

## Deploy

Najprościej: Vercel / Netlify (to czysty frontend Vite).

> Uwaga: Vite wystawia `VITE_*` do przeglądarki. Na MVP ok, ale docelowo klucz TMDB warto schować za backendem (proxy + cache), żeby nie palić limitów.

## Następne kroki (proponowane)

1. Cache i proxy (Edge / Cloudflare / Supabase Functions)
2. „OneScreen mode”: feed łączony filmy+seriale + sort „najlepsze na dziś”
3. Deep-linki do platform (gdzie możliwe) + własne mapowanie
4. Konto użytkownika + synchronizacja preferencji (Supabase)
