import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { ReportsFiltersBar, type ReportsQuickPreset } from "@/components/reports/ReportsFiltersBar";
import type { DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { StockIncreaseRecordToolbar } from "./StockIncreaseRecordToolbar";
import { StockIncreaseRecordTable } from "./StockIncreaseRecordTable";

export function StockIncreaseRecordView({
  breadcrumbRoot,
  breadcrumbCurrent,
  filtersLabel,
  quickPresets,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  searchPlaceholder,
  refreshLabel,
  clientPlaceholder,
  exportImportLabel,
  columns,
  emptyLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  filtersLabel: string;
  quickPresets: ReportsQuickPreset[];
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  searchPlaceholder: string;
  refreshLabel: string;
  clientPlaceholder: string;
  exportImportLabel: string;
  columns: {
    rowNumber: string;
    image: string;
    productName: string;
    sku: string;
    barcode: string;
    clientName: string;
    warehouseName: string;
    quantity: string;
    employeeName: string;
    createdAt: string;
  };
  emptyLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-2 text-sm text-zinc-500">
        <Link
          href="/reports"
          aria-label={breadcrumbRoot}
          className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-50 text-primary-600 hover:bg-primary-100"
        >
          <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
        </Link>
        <Link href="/reports" className="text-zinc-400 hover:text-zinc-600">
          {breadcrumbRoot}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
      </nav>

      <ReportsFiltersBar
        filtersLabel={filtersLabel}
        quickPresets={quickPresets}
        dateRangePresetLabels={dateRangePresetLabels}
        dateRangeCancelLabel={dateRangeCancelLabel}
        dateRangeApplyLabel={dateRangeApplyLabel}
      />

      <Card>
        <StockIncreaseRecordToolbar
          searchPlaceholder={searchPlaceholder}
          refreshLabel={refreshLabel}
          clientPlaceholder={clientPlaceholder}
          exportImportLabel={exportImportLabel}
        />
        <StockIncreaseRecordTable
          columns={columns}
          emptyLabel={emptyLabel}
          showingLabel={showingLabel}
          ofLabel={ofLabel}
          entriesLabel={entriesLabel}
        />
      </Card>
    </div>
  );
}
