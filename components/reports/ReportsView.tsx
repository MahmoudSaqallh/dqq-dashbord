import { ReportsFiltersBar, type ReportsQuickPreset } from "./ReportsFiltersBar";
import { SystemReportsGrid } from "./SystemReportsGrid";
import type { ReportCardItem } from "./ReportCard";
import type { DateRangePresetKey } from "@/components/shared/DateRangeDropdown";

export function ReportsView({
  title,
  filtersLabel,
  quickPresets,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  systemReportsTitle,
  systemReports,
}: {
  title: string;
  filtersLabel: string;
  quickPresets: ReportsQuickPreset[];
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  systemReportsTitle: string;
  systemReports: ReportCardItem[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>

      <ReportsFiltersBar
        filtersLabel={filtersLabel}
        quickPresets={quickPresets}
        dateRangePresetLabels={dateRangePresetLabels}
        dateRangeCancelLabel={dateRangeCancelLabel}
        dateRangeApplyLabel={dateRangeApplyLabel}
      />

      <SystemReportsGrid title={systemReportsTitle} items={systemReports} />
    </div>
  );
}
