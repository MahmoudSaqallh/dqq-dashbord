import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

export interface ResolvedWalletRow {
  id: string;
  rowNumber: number;
  customerName: string;
  customerSubtitle: string;
  availableBalanceDisplay: string;
  onHoldBalanceDisplay: string;
  totalBalanceDisplay: string;
  autoTopUp: { label: string; tone: StatusTone };
  lastTransactionLabel: string;
  lastTransactionDisplay: string;
  status: { label: string; tone: StatusTone };
}

const HEADER_CLASSES = "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

function AutoTopUpBadge({ label, enabled }: { label: string; enabled: boolean }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-pill px-3 py-1.5 text-xs font-medium",
        enabled ? "bg-primary text-primary-50" : "bg-zinc-100 text-zinc-500"
      )}
    >
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", enabled ? "bg-primary-50" : "bg-zinc-400")} />
      {label}
    </span>
  );
}

export function WalletTable({
  columns,
  rows,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  columns: {
    rowNumber: string;
    customer: string;
    availableBalance: string;
    onHold: string;
    totalBalance: string;
    autoTopUp: string;
    lastTransaction: string;
    status: string;
    action: string;
  };
  rows: ResolvedWalletRow[];
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div>
      <div className="overflow-x-auto px-5">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className={HEADER_CLASSES}>
                {columns.rowNumber}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.customer}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "text-end")}>
                {columns.availableBalance}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "text-end")}>
                {columns.onHold}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "text-end")}>
                {columns.totalBalance}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.autoTopUp}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.lastTransaction}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.status}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>{columns.action}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
                <td className={cn(CELL_CLASSES, "text-zinc-500")}>{row.rowNumber}</td>
                <td className={CELL_CLASSES}>
                  <p className="font-medium text-zinc-800">{row.customerName}</p>
                  <p className="text-xs text-zinc-400">{row.customerSubtitle}</p>
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-end text-zinc-700")}>
                  {row.availableBalanceDisplay}
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-end text-zinc-700")}>
                  {row.onHoldBalanceDisplay}
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-end font-semibold text-primary-600")}>
                  {row.totalBalanceDisplay}
                </td>
                <td className={CELL_CLASSES}>
                  <AutoTopUpBadge label={row.autoTopUp.label} enabled={row.autoTopUp.tone === "success"} />
                </td>
                <td className={CELL_CLASSES}>
                  <p className="text-zinc-700">{row.lastTransactionLabel}</p>
                  <p dir="ltr" className="text-xs text-zinc-400">
                    {row.lastTransactionDisplay}
                  </p>
                </td>
                <td className={CELL_CLASSES}>
                  <StatusBadge label={row.status.label} tone={row.status.tone} />
                </td>
                <td className={CELL_CLASSES}>
                  <IconButton aria-label={columns.action}>
                    <MoreVertical className="h-4 w-4" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="text-sm text-zinc-500">
          {rows.length} {showingLabel} {ofLabel} {rows.length} {entriesLabel}
        </p>
        <div className="flex items-center gap-1">
          <IconButton aria-label="First page" shape="square" className="h-8 w-8" disabled>
            <ChevronsLeft className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton aria-label="Previous page" shape="square" className="h-8 w-8" disabled>
            <ChevronLeft className="h-3.5 w-3.5" />
          </IconButton>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-medium text-white">
            1
          </span>
          <IconButton aria-label="Next page" shape="square" className="h-8 w-8" disabled>
            <ChevronRight className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton aria-label="Last page" shape="square" className="h-8 w-8" disabled>
            <ChevronsRight className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
