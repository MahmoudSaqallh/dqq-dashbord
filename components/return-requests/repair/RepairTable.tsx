import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Coins, MoreVertical } from "lucide-react";
import Link from "next/link";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

export interface ResolvedRepairTicketRow {
  id: string;
  ticketNo: string;
  productName: string;
  productSku: string;
  orderNo: string;
  returnRequestId: string;
  warehouse: string;
  assignee: string;
  startedAtDisplay: string | null;
  finishedAtDisplay: string | null;
  costDisplay: string | null;
  status: { label: string; tone: StatusTone; suffix?: string };
}

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

const DOT_COLOR: Record<StatusTone, string> = {
  info: "bg-info",
  success: "bg-primary",
  warning: "bg-warning",
  danger: "bg-danger",
  maroon: "bg-maroon",
  neutral: "bg-neutral",
};

const TEXT_COLOR: Record<StatusTone, string> = {
  info: "text-info",
  success: "text-primary-700",
  warning: "text-warning",
  danger: "text-danger",
  maroon: "text-maroon",
  neutral: "text-zinc-600",
};

function RepairStatusBadge({ label, tone, suffix }: { label: string; tone: StatusTone; suffix?: string }) {
  return (
    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-[10px] border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700">
      <span className={cn("h-2 w-2 shrink-0 rounded-full", DOT_COLOR[tone])} />
      {label}
      {suffix && <span className={cn("font-bold", TEXT_COLOR[tone])}>({suffix})</span>}
    </span>
  );
}

export function RepairTable({
  columns,
  rows,
  emptyValueLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
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
    <div>
      <div className="scrollbar-primary overflow-x-auto px-5">
        <table className="w-full min-w-[1400px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className={HEADER_CLASSES}>
                {columns.ticketNo}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.product}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.order}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.returnRequest}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.warehouse}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.assignee}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.startedAt}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.finishedAt}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.cost}
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
                <td className={cn(CELL_CLASSES, "font-medium text-zinc-800")}>{row.ticketNo}</td>
                <td className="px-3 py-3.5 text-xs">
                  <p className="font-medium text-zinc-800">{row.productName}</p>
                  <p dir="ltr" className="text-[11px] text-zinc-400">
                    SKU: {row.productSku}
                  </p>
                </td>
                <td dir="ltr" className="whitespace-nowrap px-3 py-3.5 text-start text-xs">
                  <Link href="#" className="font-medium text-primary-600 underline">
                    {row.orderNo}
                  </Link>
                </td>
                <td dir="ltr" className="whitespace-nowrap px-3 py-3.5 text-start text-xs">
                  <Link href="/return-requests" className="font-medium text-primary-600 underline">
                    {row.returnRequestId}
                  </Link>
                </td>
                <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.warehouse}</td>
                <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.assignee}</td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-500")}>
                  {row.startedAtDisplay ?? emptyValueLabel}
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-500")}>
                  {row.finishedAtDisplay ?? emptyValueLabel}
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-700")}>
                  {row.costDisplay ? (
                    <span className="inline-flex items-center gap-1">
                      <Coins className="h-3.5 w-3.5 text-zinc-400" />
                      {row.costDisplay}
                    </span>
                  ) : (
                    emptyValueLabel
                  )}
                </td>
                <td className={CELL_CLASSES}>
                  <RepairStatusBadge label={row.status.label} tone={row.status.tone} suffix={row.status.suffix} />
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
