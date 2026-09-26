"use client";

import { GitMerge, Plus, RotateCw, Search, Warehouse } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export type WarehousesTab = "warehouses" | "merged";

export function WarehousesToolbar({
  warehousesLabel,
  mergedLabel,
  tab,
  onTabChange,
  searchPlaceholder,
  refreshLabel,
  mergeLabel,
  onMergeClick,
  addNewLabel,
  onAddNewClick,
}: {
  warehousesLabel: string;
  mergedLabel: string;
  tab: WarehousesTab;
  onTabChange: (tab: WarehousesTab) => void;
  searchPlaceholder: string;
  refreshLabel: string;
  mergeLabel: string;
  onMergeClick: () => void;
  addNewLabel: string;
  onAddNewClick: () => void;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-zinc-200 px-5 py-4">
      <div className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white p-1">
        <button
          type="button"
          onClick={() => onTabChange("warehouses")}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-sm font-medium",
            tab === "warehouses" ? "bg-primary text-white" : "text-zinc-500 hover:bg-zinc-50"
          )}
        >
          <Warehouse className="h-4 w-4" />
          {warehousesLabel}
        </button>
        <button
          type="button"
          onClick={() => onTabChange("merged")}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-sm font-medium",
            tab === "merged" ? "bg-primary text-white" : "text-zinc-500 hover:bg-zinc-50"
          )}
        >
          <GitMerge className="h-4 w-4" />
          {mergedLabel}
        </button>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative min-w-[220px] max-w-md flex-1">
          <Search className="pointer-events-none absolute top-1/2 inset-s-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 ps-9 pe-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
          />
        </div>

        {tab === "warehouses" && (
          <div className="flex shrink-0 items-center gap-2.5">
            <button
              type="button"
              aria-label={refreshLabel}
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] border border-blue-100 bg-info-bg text-info transition-colors hover:brightness-95"
            >
              <RotateCw className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onMergeClick}
              className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-700"
            >
              <GitMerge className="h-4 w-4" />
              {mergeLabel}
            </button>
            <button
              type="button"
              onClick={onAddNewClick}
              className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
            >
              {addNewLabel}
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
