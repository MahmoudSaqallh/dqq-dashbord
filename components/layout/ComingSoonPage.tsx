"use client";

import { Construction } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function ComingSoonPage() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-card border border-dashed border-zinc-200 bg-white py-24 text-center">
      <Construction className="h-8 w-8 text-zinc-300" />
      <p className="text-base font-semibold text-zinc-700">{t("common.comingSoonTitle")}</p>
      <p className="text-sm text-zinc-400">{t("common.comingSoonBody")}</p>
    </div>
  );
}
