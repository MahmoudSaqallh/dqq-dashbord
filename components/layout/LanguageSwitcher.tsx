"use client";

import { useState } from "react";
import { Globe, Check } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LOCALES, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils/cn";

const LOCALE_LABEL: Record<Locale, string> = { en: "EN", ar: "AR" };

export function LanguageSwitcher() {
  const { locale, setLocale } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-zinc-200 bg-zinc-100 px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-200"
      >
        <Globe className="h-4 w-4 text-zinc-400" />
        {LOCALE_LABEL[locale]}
      </button>
      {open && (
        <div className="absolute end-0 top-full z-20 mt-2 w-32 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
          {LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              onMouseDown={() => {
                setLocale(code);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center justify-between px-3 py-2 text-start text-sm hover:bg-zinc-50",
                code === locale ? "font-medium text-primary" : "text-zinc-600"
              )}
            >
              {LOCALE_LABEL[code]}
              {code === locale && <Check className="h-3.5 w-3.5" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
