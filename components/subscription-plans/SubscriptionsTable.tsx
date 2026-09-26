import { Mail, Phone, MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

export interface ResolvedSubscriptionRow {
  id: string;
  rowNumber: number;
  clientName: string;
  contactEmail: string;
  contactPhone: string;
  planName: string;
  startDate: string;
  endDate: string;
  paidDisplay: string;
  status: { label: string; tone: StatusTone };
}

const HEADER_CLASSES = "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

export function SubscriptionsTable({
  columns,
  rows,
}: {
  columns: {
    rowNumber: string;
    client: string;
    contact: string;
    plan: string;
    startDate: string;
    endDate: string;
    paid: string;
    status: string;
    action: string;
  };
  rows: ResolvedSubscriptionRow[];
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
              {columns.client}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.contact}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.plan}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.startDate}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.endDate}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.paid}
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
              <td className={cn(CELL_CLASSES, "text-primary-600")}>{row.rowNumber}</td>
              <td className={cn(CELL_CLASSES, "text-zinc-700")}>{row.clientName}</td>
              <td className={CELL_CLASSES}>
                <div dir="ltr" className="flex items-center gap-1.5 text-xs text-zinc-500">
                  <Mail className="h-3 w-3 shrink-0 text-primary" />
                  {row.contactEmail}
                </div>
                <div dir="ltr" className="mt-0.5 flex items-center gap-1.5 text-xs text-zinc-500">
                  <Phone className="h-3 w-3 shrink-0 text-zinc-400" />
                  {row.contactPhone}
                </div>
              </td>
              <td className={CELL_CLASSES}>
                <button type="button" className="font-medium text-primary-600 underline">
                  {row.planName}
                </button>
              </td>
              <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                {row.startDate}
              </td>
              <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                {row.endDate}
              </td>
              <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-700")}>
                {row.paidDisplay}
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
  );
}
