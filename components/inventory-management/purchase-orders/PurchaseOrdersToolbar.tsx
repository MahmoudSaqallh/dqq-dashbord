"use client";

import { useState } from "react";
import { Filter, Search, Sparkles } from "lucide-react";
import { DateRangeDropdown, type DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { cn } from "@/lib/utils/cn";

type Tab = "all" | "aiSuggested";

export function PurchaseOrdersToolbar({
  allOrdersLabel,
  totalOrders,
  aiSuggestedLabel,
  searchPlaceholder,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  filtersLabel,
  exportLabel,
}: {
  allOrdersLabel: string;
  totalOrders: number;
  aiSuggestedLabel: string;
  searchPlaceholder: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  filtersLabel: string;
  exportLabel: string;
}) {
  const [tab, setTab] = useState<Tab>("all");

  return (
    <div className="flex flex-col gap-4 border-b border-zinc-200 px-5 py-4">
      <div className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white p-1">
        <button
          type="button"
          onClick={() => setTab("all")}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-sm font-medium",
            tab === "all" ? "bg-primary text-white" : "text-zinc-500 hover:bg-zinc-50"
          )}
        >
          {allOrdersLabel}
          <span
            className={cn(
              "inline-flex h-5 min-w-5 items-center justify-center rounded-pill px-1.5 text-xs font-semibold",
              tab === "all" ? "bg-white/20 text-white" : "bg-primary-50 text-primary-600"
            )}
          >
            {totalOrders}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setTab("aiSuggested")}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-sm font-medium",
            tab === "aiSuggested" ? "bg-primary text-white" : "text-zinc-500 hover:bg-zinc-50"
          )}
        >
          <Sparkles className="h-4 w-4" />
          {aiSuggestedLabel}
        </button>
      </div>

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
            defaultPreset="allDays"
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
