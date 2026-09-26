"use client";

import { useState } from "react";
import { CircleUserRound, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { MOCK_USER } from "@/lib/mock/user";

export function UserMenu() {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        onBlur={() => setTimeout(() => setOpen(false), 100)}
        className="inline-flex h-9 items-center gap-2 rounded-xl border border-zinc-200 bg-white ps-2 pe-3 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
      >
        <CircleUserRound className="h-5 w-5 text-zinc-400" />
        <span className="hidden sm:inline">{MOCK_USER.displayName}</span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </button>

      {open && (
        <div className="absolute inset-e-0 top-full z-20 mt-2 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
          <button
            type="button"
            onMouseDown={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
          >
            <User className="h-4 w-4 text-zinc-400" />
            {t("header.profile")}
          </button>
          <button
            type="button"
            onMouseDown={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
          >
            <Settings className="h-4 w-4 text-zinc-400" />
            {t("header.settings")}
          </button>
          <button
            type="button"
            onMouseDown={() => setOpen(false)}
            className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm text-danger hover:bg-danger-bg"
          >
            <LogOut className="h-4 w-4" />
            {t("header.logout")}
          </button>
        </div>
      )}
    </div>
  );
}
