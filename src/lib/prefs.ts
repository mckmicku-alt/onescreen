import { useCallback, useEffect, useMemo, useState } from "react";

const KEY = "onescreen:prefs:v1";

export type UserPrefs = {
  // provider ids from TMDB watch provider list
  providers: number[];
};

const defaultPrefs: UserPrefs = { providers: [] };

function safeParse(json: string | null): UserPrefs {
  if (!json) return defaultPrefs;
  try {
    const v = JSON.parse(json) as Partial<UserPrefs>;
    return {
      providers: Array.isArray(v.providers) ? v.providers.filter((x) => Number.isFinite(x)) as number[] : [],
    };
  } catch {
    return defaultPrefs;
  }
}

export function useUserPrefs() {
  const [prefs, setPrefs] = useState<UserPrefs>(() => safeParse(localStorage.getItem(KEY)));

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(prefs));
  }, [prefs]);

  const toggleProvider = useCallback((id: number) => {
    setPrefs((p) => {
      const exists = p.providers.includes(id);
      return {
        ...p,
        providers: exists ? p.providers.filter((x) => x !== id) : [...p.providers, id],
      };
    });
  }, []);

  const clearProviders = useCallback(() => setPrefs((p) => ({ ...p, providers: [] })), []);

  const value = useMemo(
    () => ({ prefs, setPrefs, toggleProvider, clearProviders }),
    [prefs, toggleProvider, clearProviders]
  );

  return value;
}
