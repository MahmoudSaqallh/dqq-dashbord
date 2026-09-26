import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import { DelaySystemSummaryBar } from "./DelaySystemSummaryBar";
import { DelaySystemTabsCard } from "./DelaySystemTabsCard";
import type { SelectDropdownOption } from "@/components/ui/SelectDropdown";
import type { DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import type { DelaySystemStat } from "@/lib/mock/types";

export function DelaySystemView({
  breadcrumbRoot,
  breadcrumbCurrent,
  refreshLabel,
  totalOrdersLabel,
  totalOrders,
  totalOrdersDeltaCount,
  totalOrdersDeltaPercent,
  ordersUnit,
  warehousePlaceholder,
  warehouseOptions,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  stats,
  tabs,
  exportLabel,
  searchPlaceholder,
  columns,
  emptyLabel,
  comingSoonLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  refreshLabel: string;
  totalOrdersLabel: string;
  totalOrders: number;
  totalOrdersDeltaCount: number;
  totalOrdersDeltaPercent: number;
  ordersUnit: string;
  warehousePlaceholder: string;
  warehouseOptions: SelectDropdownOption[];
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  stats: DelaySystemStat[];
  tabs: { id: "delayedOrders" | "vacations" | "delayRules" | "analysis"; label: string }[];
  exportLabel: string;
  searchPlaceholder: string;
  columns: {
    rowNumber: string;
    orderNumber: string;
    clients: string;
    customerName: string;
    city: string;
    warehouse: string;
    orderDate: string;
    processingTime: string;
    storeStatus: string;
    delayTime: string;
  };
  emptyLabel: string;
  comingSoonLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
          <Link href="/reports" className="text-info hover:text-info/80">
            {breadcrumbRoot}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
          <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
        </nav>

        <RefreshButton label={refreshLabel} />
      </div>

      <DelaySystemSummaryBar
        totalOrdersLabel={totalOrdersLabel}
        totalOrders={totalOrders}
        totalOrdersDeltaCount={totalOrdersDeltaCount}
        totalOrdersDeltaPercent={totalOrdersDeltaPercent}
        ordersUnit={ordersUnit}
        warehousePlaceholder={warehousePlaceholder}
        warehouseOptions={warehouseOptions}
        dateRangePresetLabels={dateRangePresetLabels}
        dateRangeCancelLabel={dateRangeCancelLabel}
        dateRangeApplyLabel={dateRangeApplyLabel}
        stats={stats}
      />

      <DelaySystemTabsCard
        tabs={tabs}
        exportLabel={exportLabel}
        searchPlaceholder={searchPlaceholder}
        columns={columns}
        emptyLabel={emptyLabel}
        comingSoonLabel={comingSoonLabel}
        showingLabel={showingLabel}
        ofLabel={ofLabel}
        entriesLabel={entriesLabel}
      />
    </div>
  );
}
