"use client";

import { Search, Plus } from "lucide-react";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import { DateRangeDropdown, type DateRangePresetKey } from "@/components/shared/DateRangeDropdown";

export function WaybillsToolbar({
  searchPlaceholder,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  refreshLabel,
  exportLabel,
  addNewLabel,
}: {
  searchPlaceholder: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  refreshLabel: string;
  exportLabel: string;
  addNewLabel: string;
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
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <RefreshButton label={refreshLabel} />
        <button
          type="button"
          className="inline-flex h-9 items-center whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          {exportLabel}
        </button>
        <button
          type="button"
          className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
        >
          <Plus className="h-4 w-4" />
          {addNewLabel}
        </button>
      </div>
    </div>
  );
}
