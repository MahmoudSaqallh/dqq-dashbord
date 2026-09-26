import { DateRangeDropdown, type DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { RefreshButton } from "./RefreshButton";

export function PageHeader({
  title,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  refreshLabel,
}: {
  title: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  refreshLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>
      <div className="flex items-center gap-2.5">
        <DateRangeDropdown
          presetLabels={dateRangePresetLabels}
          cancelLabel={dateRangeCancelLabel}
          applyLabel={dateRangeApplyLabel}
          defaultPreset="last7Days"
        />
        <RefreshButton label={refreshLabel} />
      </div>
    </div>
  );
}
