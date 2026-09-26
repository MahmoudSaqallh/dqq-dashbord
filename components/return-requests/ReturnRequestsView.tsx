import { Card } from "@/components/ui/Card";
import { ReturnRequestsSummaryBar, type ReturnRequestsSummaryItem } from "./ReturnRequestsSummaryBar";
import { ReturnRequestsToolbar } from "./ReturnRequestsToolbar";
import { ReturnRequestsTable, type ResolvedReturnRequestRow } from "./ReturnRequestsTable";

export function ReturnRequestsView({
  title,
  allReturnsLabel,
  total,
  summaryItems,
  searchPlaceholder,
  filtersLabel,
  statusFilterLabel,
  statusFilterOptions,
  refreshLabel,
  exportLabel,
  columns,
  rows,
  emptyDateLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  title: string;
  allReturnsLabel: string;
  total: number;
  summaryItems: ReturnRequestsSummaryItem[];
  searchPlaceholder: string;
  filtersLabel: string;
  statusFilterLabel: string;
  statusFilterOptions: string[];
  refreshLabel: string;
  exportLabel: string;
  columns: {
    returnId: string;
    orderNo: string;
    customer: string;
    products: string;
    returnDate: string;
    totalReturn: string;
    status: string;
    action: string;
  };
  rows: ResolvedReturnRequestRow[];
  emptyDateLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>

      <ReturnRequestsSummaryBar allReturnsLabel={allReturnsLabel} total={total} items={summaryItems} />

      <Card>
        <ReturnRequestsToolbar
          searchPlaceholder={searchPlaceholder}
          filtersLabel={filtersLabel}
          statusFilterLabel={statusFilterLabel}
          statusFilterOptions={statusFilterOptions}
          refreshLabel={refreshLabel}
          exportLabel={exportLabel}
        />
        <ReturnRequestsTable
          columns={columns}
          rows={rows}
          emptyDateLabel={emptyDateLabel}
          showingLabel={showingLabel}
          ofLabel={ofLabel}
          entriesLabel={entriesLabel}
        />
      </Card>
    </div>
  );
}
