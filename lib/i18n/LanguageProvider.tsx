"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { isLocale, LOCALE_COOKIE, localeToDir, type Locale } from "./config";
import { getDictionary } from "./dictionaries";
import { translate } from "./translate";

type LanguageContextValue = {
  locale: Locale;
  dir: "ltr" | "rtl";
  t: (key: string) => string;
  setLocale: (next: Locale) => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale;
  children: ReactNode;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const router = useRouter();

  const applyLocale = useCallback((next: Locale) => {
    document.cookie = `${LOCALE_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
    try {
      window.localStorage.setItem(LOCALE_COOKIE, next);
    } catch {
      // localStorage unavailable (private mode, etc.) — cookie already persists the choice
    }
    document.documentElement.lang = next;
    document.documentElement.dir = localeToDir(next);
  }, []);

  const setLocale = useCallback(
    (next: Locale) => {
      if (next === locale) return;
      applyLocale(next);
      setLocaleState(next);
      router.refresh();
    },
    [applyLocale, locale, router]
  );

  // Post-mount reconciliation: if a stored preference disagrees with the
  // cookie-derived initial locale (e.g. cookie expired/cleared), adopt it.
  // Runs after hydration only, so it can never cause a hydration mismatch.
  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(LOCALE_COOKIE);
    } catch {
      stored = null;
    }
    if (stored && isLocale(stored) && stored !== initialLocale) {
      // Syncing from an external system (localStorage) discovered post-mount,
      // not deriving state from props/state already available during render.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocale(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dict = useMemo(() => getDictionary(locale), [locale]);
  const dir = localeToDir(locale);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      dir,
      t: (key: string) => translate(dict, key),
      setLocale,
    }),
    [locale, dir, dict, setLocale]
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
}
