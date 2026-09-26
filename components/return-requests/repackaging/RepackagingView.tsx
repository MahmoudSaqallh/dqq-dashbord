import { Card } from "@/components/ui/Card";
import { RepackagingSummaryBar, type RepackagingSummaryItem } from "./RepackagingSummaryBar";
import { RepackagingToolbar } from "./RepackagingToolbar";
import { RepackagingTable, type ResolvedRepackagingTicketRow } from "./RepackagingTable";
import type { SelectDropdownOption } from "@/components/ui/SelectDropdown";

export function RepackagingView({
  title,
  allTicketsLabel,
  total,
  summaryItems,
  searchPlaceholder,
  statusPlaceholder,
  statusOptions,
  refreshLabel,
  exportLabel,
  columns,
  rows,
  emptyValueLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  title: string;
  allTicketsLabel: string;
  total: number;
  summaryItems: RepackagingSummaryItem[];
  searchPlaceholder: string;
  statusPlaceholder: string;
  statusOptions: SelectDropdownOption[];
  refreshLabel: string;
  exportLabel: string;
  columns: {
    ticketNo: string;
    product: string;
    order: string;
    returnRequest: string;
    warehouse: string;
    assignee: string;
    startedAt: string;
    finishedAt: string;
    status: string;
    action: string;
  };
  rows: ResolvedRepackagingTicketRow[];
  emptyValueLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>

      <RepackagingSummaryBar allTicketsLabel={allTicketsLabel} total={total} items={summaryItems} />

      <Card>
        <RepackagingToolbar
          searchPlaceholder={searchPlaceholder}
          statusPlaceholder={statusPlaceholder}
          statusOptions={statusOptions}
          refreshLabel={refreshLabel}
          exportLabel={exportLabel}
        />
        <RepackagingTable
          columns={columns}
          rows={rows}
          emptyValueLabel={emptyValueLabel}
          showingLabel={showingLabel}
          ofLabel={ofLabel}
          entriesLabel={entriesLabel}
        />
      </Card>
    </div>
  );
}
