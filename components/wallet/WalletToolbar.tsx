"use client";

import { Search, Filter } from "lucide-react";
import { DateRangeDropdown, type DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { cn } from "@/lib/utils/cn";

export function WalletToolbar({
  searchPlaceholder,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  filtersLabel,
  filtersOpen,
  onToggleFilters,
  exportLabel,
}: {
  searchPlaceholder: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  filtersLabel: string;
  filtersOpen: boolean;
  onToggleFilters: () => void;
  exportLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] max-w-sm flex-1">
          <Search className="pointer-events-none absolute top-1/2 inset-s-3 h-4 w-4 -translate-y-1/2 text-primary-700" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-xl border border-primary-100 bg-primary-50 ps-9 pe-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
          />
        </div>

        <DateRangeDropdown
          presetLabels={dateRangePresetLabels}
          cancelLabel={dateRangeCancelLabel}
          applyLabel={dateRangeApplyLabel}
          defaultPreset="last7Days"
        />

        <button
          type="button"
          onClick={onToggleFilters}
          className={cn(
            "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border bg-white px-3 text-sm hover:bg-zinc-50",
            filtersOpen ? "border-primary-500 text-primary-700" : "border-zinc-200 text-black"
          )}
        >
          <Filter className={cn("h-4 w-4", filtersOpen ? "text-primary" : "text-black")} />
          {filtersLabel}
        </button>
      </div>

      <button
        type="button"
        className="inline-flex h-9 items-center whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
      >
        {exportLabel}
      </button>
    </div>
  );
}
