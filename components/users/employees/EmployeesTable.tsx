import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import { EMPLOYEE_STATUS_TONE } from "@/lib/utils/status-colors";
import type { StatusTone } from "@/lib/utils/status-colors";
import type { EmployeeRow } from "@/lib/mock/types";

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-5 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

const STATUS_BADGE_TONE: Record<StatusTone, string> = {
  info: "bg-info-bg text-info",
  success: "bg-primary-50 text-primary-700",
  warning: "bg-warning-bg text-warning",
  danger: "bg-danger-bg text-danger",
  maroon: "bg-maroon/10 text-maroon",
  neutral: "bg-zinc-100 text-zinc-600",
};

export function EmployeesTable({
  columns,
  rows,
  statusLabels,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  columns: {
    rowNumber: string;
    name: string;
    email: string;
    username: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    action: string;
  };
  rows: EmployeeRow[];
  statusLabels: Record<EmployeeRow["status"], string>;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div>
      <div className="scrollbar-primary overflow-x-auto">
        <table className="w-full min-w-[1100px] table-fixed border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className={cn(HEADER_CLASSES, "w-[5%]")}>
                {columns.rowNumber}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "w-[14%]")}>
                {columns.name}
                {HEADER_DIVIDER}
              </th>
              <th dir="ltr" className={cn(HEADER_CLASSES, "w-[20%] text-start")}>
                {columns.email}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "w-[12%]")}>
                {columns.username}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "w-[12%]")}>
                {columns.status}
                {HEADER_DIVIDER}
              </th>
              <th dir="ltr" className={cn(HEADER_CLASSES, "w-[14%] text-start")}>
                {columns.createdAt}
                {HEADER_DIVIDER}
              </th>
              <th dir="ltr" className={cn(HEADER_CLASSES, "w-[14%] text-start")}>
                {columns.updatedAt}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "w-[9%]")}>{columns.action}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
                <td className={cn(CELL_CLASSES, "text-primary-600")}>{row.rowNumber}</td>
                <td className={cn(CELL_CLASSES, "font-medium text-zinc-800")}>{row.name}</td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {row.email}
                </td>
                <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.username}</td>
                <td className={CELL_CLASSES}>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-lg px-3 py-1 text-xs font-semibold",
                      STATUS_BADGE_TONE[EMPLOYEE_STATUS_TONE[row.status]]
                    )}
                  >
                    {statusLabels[row.status]}
                  </span>
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {row.createdAtDisplay}
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {row.updatedAtDisplay}
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
