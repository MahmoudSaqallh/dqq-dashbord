"use client";

import { useState } from "react";
import { Search, Trash2, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { RefreshButton } from "@/components/dashboard/RefreshButton";

type ActiveTab = "active" | "deleted";

export function EmployeesToolbar({
  searchPlaceholder,
  refreshLabel,
  activeLabel,
  activeCount,
  deletedLabel,
}: {
  searchPlaceholder: string;
  refreshLabel: string;
  activeLabel: string;
  activeCount: number;
  deletedLabel: string;
}) {
  const [tab, setTab] = useState<ActiveTab>("active");

  return (
    <div className="flex flex-col gap-4 border-b border-zinc-200 px-5 py-4">
      <div className="inline-flex w-fit items-center rounded-full border border-zinc-200 bg-white p-1">

        <button
          type="button"
          onClick={() => setTab("active")}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-7.5 text-sm font-medium",
            tab === "active" ? "bg-primary text-white" : "text-primary-700 hover:bg-zinc-50"
          )}
        >
          <Users className="h-4 w-4" />
          {activeLabel} {activeCount}
        </button>


                <button
          type="button"
          onClick={() => setTab("deleted")}
          className={cn(
            "inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 text-sm font-medium",
            tab === "deleted" ? "bg-primary text-white" : "text-maroon hover:bg-zinc-50"
          )}
        >
          <Trash2 className="h-4 w-4" />
          {deletedLabel}
        </button>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="relative w-full max-w-xs">
          <Search className="pointer-events-none absolute top-1/2 inset-e-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50 pe-9 ps-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
          />
        </div>
        <RefreshButton label={refreshLabel} />
      </div>
    </div>
  );
}
