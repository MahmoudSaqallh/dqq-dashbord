import { MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

export interface ResolvedWaybillRow {
  id: string;
  rowNumber: number;
  trackingNumber: string;
  clientName: string;
  connectService: string;
  orderNumber: string;
  createdBy: string;
  type: { label: string; tone: StatusTone };
  createdAtDisplay: string;
}

const HEADER_CLASSES = "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

export function WaybillsTable({
  columns,
  rows,
}: {
  columns: {
    rowNumber: string;
    trackingNumber: string;
    clientName: string;
    connectService: string;
    orderNumber: string;
    createdBy: string;
    type: string;
    createdAt: string;
    action: string;
  };
  rows: ResolvedWaybillRow[];
}) {
  return (
    <div className="overflow-x-auto px-5 pb-4">
      <table className="w-full min-w-[1100px] border-collapse">
        <thead>
          <tr className="border-b border-zinc-300">
            <th className={HEADER_CLASSES}>
              {columns.rowNumber}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.trackingNumber}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.clientName}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.connectService}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.orderNumber}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.createdBy}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.type}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.createdAt}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>{columns.action}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
              <td className={cn(CELL_CLASSES, "text-zinc-500")}>{row.rowNumber}</td>
              <td dir="ltr" className={cn(CELL_CLASSES, "text-start font-medium text-primary-600")}>
                {row.trackingNumber}
              </td>
              <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.clientName}</td>
              <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.connectService}</td>
              <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                {row.orderNumber}
              </td>
              <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.createdBy}</td>
              <td className={CELL_CLASSES}>
                <StatusBadge label={row.type.label} tone={row.type.tone} />
              </td>
              <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                {row.createdAtDisplay}
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
  );
}
