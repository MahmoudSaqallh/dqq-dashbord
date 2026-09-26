"use client";

import { Filter, Search } from "lucide-react";
import { DateRangeDropdown, type DateRangePresetKey } from "@/components/shared/DateRangeDropdown";

export function WarehouseTransfersToolbar({
  tableTitle,
  searchPlaceholder,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  filtersLabel,
  exportLabel,
}: {
  tableTitle: string;
  searchPlaceholder: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  filtersLabel: string;
  exportLabel: string;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-zinc-200 px-5 py-4">
      <p className="text-sm font-semibold text-zinc-900">{tableTitle}</p>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] max-w-md flex-1">
            <Search className="pointer-events-none absolute top-1/2 inset-s-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 ps-9 pe-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
            />
          </div>

          <DateRangeDropdown
            presetLabels={dateRangePresetLabels}
            cancelLabel={dateRangeCancelLabel}
            applyLabel={dateRangeApplyLabel}
            defaultPreset="thisYear"
          />

          <button
            type="button"
            className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-3.5 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            <Filter className="h-4 w-4" />
            {filtersLabel}
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
        >
          {exportLabel}
        </button>
      </div>
    </div>
  );
}
