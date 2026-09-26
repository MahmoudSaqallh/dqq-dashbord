"use client";

import { useState } from "react";
import type { FilterOption } from "@/components/shared/FilterTriggerDropdown";
import type { DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { PickingListToolbar } from "./PickingListToolbar";
import { PickingListFilterRow } from "./PickingListFilterRow";

export function PickingListFiltersSection({
  searchPlaceholder,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  filtersLabel,
  refreshLabel,
  exportLabel,
  filters,
}: {
  searchPlaceholder: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  filtersLabel: string;
  refreshLabel: string;
  exportLabel: string;
  filters: FilterOption[];
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);

  return (
    <>
      <PickingListToolbar
        searchPlaceholder={searchPlaceholder}
        dateRangePresetLabels={dateRangePresetLabels}
        dateRangeCancelLabel={dateRangeCancelLabel}
        dateRangeApplyLabel={dateRangeApplyLabel}
        filtersLabel={filtersLabel}
        filtersOpen={filtersOpen}
        onToggleFilters={() => setFiltersOpen((v) => !v)}
        refreshLabel={refreshLabel}
        exportLabel={exportLabel}
      />
      {filtersOpen && <PickingListFilterRow filters={filters} />}
    </>
  );
}
