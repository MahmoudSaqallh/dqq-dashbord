import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Coins, MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

export interface ResolvedReturnRequestRow {
  id: string;
  returnId: string;
  orderNo: string;
  customerName: string;
  customerPhone: string;
  productsCount: number;
  returnDateDisplay: string | null;
  totalReturnDisplay: string;
  status: { label: string; tone: StatusTone };
}

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

export function ReturnRequestsTable({
  columns,
  rows,
  emptyDateLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
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
    <div>
      <div className="scrollbar-primary overflow-x-auto px-5">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className={HEADER_CLASSES}>
                {columns.returnId}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.orderNo}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.customer}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.products}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.returnDate}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.totalReturn}
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
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start font-medium text-primary-600")}>
                  {row.returnId}
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {row.orderNo}
                </td>
                <td className={CELL_CLASSES}>
                  <p className="font-medium text-zinc-800">{row.customerName}</p>
                  <p dir="ltr" className="text-xs text-zinc-400">
                    {row.customerPhone}
                  </p>
                </td>
                <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.productsCount}</td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-500")}>
                  {row.returnDateDisplay ?? emptyDateLabel}
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-700")}>
                  <span className="inline-flex items-center gap-1">
                    <Coins className="h-3.5 w-3.5 text-zinc-400" />
                    {row.totalReturnDisplay}
                  </span>
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
