"use client";

import { Search } from "lucide-react";
import { RefreshButton } from "@/components/dashboard/RefreshButton";

export function CustomersToolbar({
  searchPlaceholder,
  refreshLabel,
}: {
  searchPlaceholder: string;
  refreshLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 px-5 py-4">
      <RefreshButton label={refreshLabel} />

      <div className="relative min-w-[220px] max-w-md flex-1">
        <Search className="pointer-events-none absolute top-1/2 inset-e-3 h-4 w-4 -translate-y-1/2 text-primary-700" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-xl border border-primary-100 bg-primary-50 pe-9 ps-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
        />
      </div>
    </div>
  );
}
