"use client";

import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import { SelectDropdown } from "@/components/ui/SelectDropdown";

export function StockIncreaseRecordToolbar({
  searchPlaceholder,
  refreshLabel,
  clientPlaceholder,
  exportImportLabel,
}: {
  searchPlaceholder: string;
  refreshLabel: string;
  clientPlaceholder: string;
  exportImportLabel: string;
}) {
  const [client, setClient] = useState("");
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <div className="relative min-w-[200px] max-w-sm flex-1">
        <Search className="pointer-events-none absolute top-1/2 inset-s-3 h-4 w-4 -translate-y-1/2 text-primary-700" />
        <input
          type="text"
          placeholder={searchPlaceholder}
          className="h-10 w-full rounded-xl border border-primary-100 bg-primary-50 ps-9 pe-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
        />
      </div>

      <div className="flex shrink-0 items-center gap-2.5">
        <RefreshButton label={refreshLabel} />

        <div className="w-56">
          <SelectDropdown
            value={client}
            onChange={setClient}
            options={[]}
            placeholder={clientPlaceholder}
            triggerClassName="border-zinc-200 bg-zinc-50 text-zinc-400"
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setExportOpen((v) => !v)}
            onBlur={() => setTimeout(() => setExportOpen(false), 100)}
            className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            {exportImportLabel}
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
          </button>
          {exportOpen && (
            <div className="absolute inset-e-0 top-full z-20 mt-2 w-36 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onMouseDown={() => setExportOpen(false)}
                className="flex w-full items-center px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
              >
                Export
              </button>
              <button
                type="button"
                onMouseDown={() => setExportOpen(false)}
                className="flex w-full items-center px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
              >
                Import
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
