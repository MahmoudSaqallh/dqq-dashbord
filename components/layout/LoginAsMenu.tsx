"use client";

import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LoginAsMenu() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
      >
        <ArrowLeftRight className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">{t("header.loginAs")}</span>
      
      </button>

      {open && (
        <div className="absolute inset-e-0 top-full z-20 mt-2 w-48 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg ">
          <button
            type="button"
            onMouseDown={() => setOpen(false)}
            className="flex w-full items-center px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
          >
            {t("header.loginAsAccount1")}
          </button>
          <button
            type="button"
            onMouseDown={() => setOpen(false)}
            className="flex w-full items-center px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
          >
            {t("header.loginAsAccount2")}
          </button>
        </div>
      )}
    </div>
  );
}
