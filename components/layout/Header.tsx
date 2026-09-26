"use client";

import { Menu, Upload } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LoginAsMenu } from "./LoginAsMenu";
import { UserMenu } from "./UserMenu";

export function Header({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { t } = useLanguage();

  return (
    <header className="flex h-16 shrink-0 items-center gap-1.5 rounded-[10px] border border-zinc-200 bg-white px-4 pt-2 shadow-md sm:gap-2.5 sm:px-6">
      <button
        type="button"
        aria-label={t("header.openMenu")}
        onClick={onOpenMenu}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[35%] border border-zinc-200 bg-white text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700 md:hidden"
      >
        <Menu className="h-4 w-4" />
      </button>

      <div className="flex flex-1 items-center justify-end gap-1.5 sm:gap-2.5">
        <button
          type="button"
          aria-label={t("header.uploadExport")}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[25%] border border-zinc-200 bg-zinc-100 text-zinc-500 transition-colors hover:bg-zinc-200 hover:text-zinc-700"
        >
          <Upload className="h-4 w-4" />
        </button>
        <LoginAsMenu />
        <LanguageSwitcher />
        <UserMenu />
      </div>
    </header>
  );
}
