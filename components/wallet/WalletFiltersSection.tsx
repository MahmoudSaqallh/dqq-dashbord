"use client";

import { useState } from "react";
import type { FilterOption } from "@/components/shared/FilterTriggerDropdown";
import type { DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { WalletToolbar } from "./WalletToolbar";
import { WalletFilterRow } from "./WalletFilterRow";

export function WalletFiltersSection({
  searchPlaceholder,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  filtersLabel,
  exportLabel,
  filters,
}: {
  searchPlaceholder: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  filtersLabel: string;
  exportLabel: string;
  filters: FilterOption[];
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <WalletToolbar
        searchPlaceholder={searchPlaceholder}
        dateRangePresetLabels={dateRangePresetLabels}
        dateRangeCancelLabel={dateRangeCancelLabel}
        dateRangeApplyLabel={dateRangeApplyLabel}
        filtersLabel={filtersLabel}
        filtersOpen={filtersOpen}
        onToggleFilters={() => setFiltersOpen((v) => !v)}
        exportLabel={exportLabel}
      />
      {filtersOpen && <WalletFilterRow filters={filters} />}
    </>
  );
}
