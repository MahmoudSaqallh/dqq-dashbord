"use client";

import { useState } from "react";
import { FilterTriggerDropdown, type FilterOption } from "@/components/shared/FilterTriggerDropdown";

export function WalletFilterRow({ filters }: { filters: FilterOption[] }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="mx-5 mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3">
      {filters.map((filter) => (
        <FilterTriggerDropdown
          key={filter.label}
          filter={filter}
          isOpen={openId === filter.label}
          onOpenChange={(open) => setOpenId(open ? filter.label : null)}
          variant="chip"
        />
      ))}
    </div>
  );
}
