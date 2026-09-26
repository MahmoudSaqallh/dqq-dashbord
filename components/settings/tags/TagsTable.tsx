import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical, Tag } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

export interface ResolvedTagRow {
  id: string;
  rowNumber: number;
  nameEn: string;
  nameAr: string;
  colorHex: string;
  status: { label: string; tone: StatusTone };
}

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-4 text-start text-[12px] font-semibold tracking-wide text-zinc-400 uppercase sm:px-6 sm:py-5 lg:px-10";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

export function TagsTable({
  columns,
  rows,
  emptyTitle,
  emptySubtitle,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  columns: {
    rowNumber: string;
    nameEn: string;
    nameAr: string;
    color: string;
    status: string;
    action: string;
  };
  rows: ResolvedTagRow[];
  emptyTitle: string;
  emptySubtitle: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div>
      <div className="scrollbar-primary overflow-x-auto">
        <table className="w-full min-w-[1000px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300 ">
              <th className={cn(HEADER_CLASSES, "w-20 ")}>
                {columns.rowNumber}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.nameEn}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.nameAr}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "ps-5")}>
                {columns.color}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, " ")}>
                {columns.status}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "pl-28")}>{columns.action}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
                <td className={cn(CELL_CLASSES, "pr-6 text-zinc-500")}>{row.rowNumber}</td>
                <td className={cn(CELL_CLASSES, "font-medium text-zinc-800")}>{row.nameEn}</td>
                <td dir="rtl" className={cn(CELL_CLASSES, "text-end font-medium text-zinc-800")}>
                  {row.nameAr}
                </td>
                <td className={cn(CELL_CLASSES, "ps-10")}>
                  <span className="inline-flex items-center gap-2">
                    <span
                      className="h-3.5 w-3.5 shrink-0 rounded-full border border-zinc-200"
                      style={{ backgroundColor: row.colorHex }}
                    />
                    <span dir="ltr" className="text-zinc-500">
                      {row.colorHex}
                    </span>
                  </span>
                </td>
                <td className={cn(CELL_CLASSES, "ps-40 pr-6")}>
                  <StatusBadge label={row.status.label} tone={row.status.tone} />
                </td>
                <td className={cn(CELL_CLASSES, "ps-10")}>
                  <IconButton aria-label={columns.action}>
                    <MoreVertical className="h-4 w-4" />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {rows.length === 0 && (
          <div className="flex min-w-[1000px] flex-col items-center justify-center gap-2 bg-primary-100 px-4 py-10 text-center sm:py-14">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-zinc-200 text-zinc-500 sm:h-19 sm:w-19">
              <Tag className="h-6 w-6" />
            </span>
            <p className="mt-1 text-base font-semibold text-zinc-900 sm:text-xl">{emptyTitle}</p>
            <p className="text-xs text-zinc-400">{emptySubtitle}</p>
          </div>
        )}
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
