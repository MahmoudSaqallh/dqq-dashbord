import { Card } from "@/components/ui/Card";
import { RepairInfoBanner } from "./RepairInfoBanner";
import { RepairSummaryBar, type RepairSummaryItem } from "./RepairSummaryBar";
import { RepairToolbar } from "./RepairToolbar";
import { RepairTable, type ResolvedRepairTicketRow } from "./RepairTable";
import type { SelectDropdownOption } from "@/components/ui/SelectDropdown";

export function RepairView({
  title,
  infoMessage,
  infoLinkLabel,
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
  infoMessage: string;
  infoLinkLabel: string;
  allTicketsLabel: string;
  total: number;
  summaryItems: RepairSummaryItem[];
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
    cost: string;
    status: string;
    action: string;
  };
  rows: ResolvedRepairTicketRow[];
  emptyValueLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900">{title}</h1>

      <RepairInfoBanner message={infoMessage} linkLabel={infoLinkLabel} />

      <RepairSummaryBar allTicketsLabel={allTicketsLabel} total={total} items={summaryItems} />

      <Card>
        <RepairToolbar
          searchPlaceholder={searchPlaceholder}
          statusPlaceholder={statusPlaceholder}
          statusOptions={statusOptions}
          refreshLabel={refreshLabel}
          exportLabel={exportLabel}
        />
        <RepairTable
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
