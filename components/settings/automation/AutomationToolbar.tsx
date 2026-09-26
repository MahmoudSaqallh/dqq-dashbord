"use client";

import Link from "next/link";
import { Plus, Search } from "lucide-react";
import { RefreshButton } from "@/components/dashboard/RefreshButton";

export function AutomationToolbar({
  searchPlaceholder,
  refreshLabel,
  addNewLabel,
}: {
  searchPlaceholder: string;
  refreshLabel: string;
  addNewLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <div className="relative w-full min-w-210 max-w-xs">
        <Search className="pointer-events-none absolute top-1/2 inset-s-3 h-4 w-4 -translate-y-1/2 text-primary-700" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-xl border border-primary-100 bg-primary-50 ps-9 pe-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <RefreshButton label={refreshLabel} />
        <Link
          href="/add/automation"
          className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
        >
          <Plus className="h-4 w-4" />
          {addNewLabel}
        </Link>
      </div>
    </div>
  );
}
