"use client";

import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { DateRangeDropdown, type DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { OrdersFilterRow, type OrdersFilterOption } from "./OrdersFilterRow";

export function OrdersFiltersSection({
  searchPlaceholder,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  filtersLabel,
  filters,
}: {
  searchPlaceholder: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  filtersLabel: string;
  filters: OrdersFilterOption[];
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <div className="flex flex-wrap items-center gap-3 ps-5 pe-20 py-4 2xl:pe-[40%]">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute top-1/2 inset-s-3 h-5 w-5 -translate-y-1/2 text-primary" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-xl border border-primary-100 bg-primary-50 ps-10 pe-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
          />
        </div>

        <DateRangeDropdown
          presetLabels={dateRangePresetLabels}
          cancelLabel={dateRangeCancelLabel}
          applyLabel={dateRangeApplyLabel}
          defaultPreset="allDays"
        />

        <button
          type="button"
          onClick={() => setFiltersOpen((v) => !v)}
          className={cn(
            "inline-flex h-10 w-full items-center gap-2 whitespace-nowrap rounded-xl border bg-white px-3 text-sm hover:bg-zinc-50 sm:w-auto",
            filtersOpen ? "border-primary-500 text-primary-700" : "border-zinc-200 text-black"
          )}
        >
          <Filter className={cn("h-4 w-4", filtersOpen ? "text-primary" : "text-black")} />
          {filtersLabel}
        </button>
      </div>

      {filtersOpen && <OrdersFilterRow filters={filters} />}
    </>
  );
}
