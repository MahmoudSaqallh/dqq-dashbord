import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, CheckCircle2 } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { CustomerRow } from "@/lib/mock/types";

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-5 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";
const PAGE_SIZE = 10;

export function CustomersTable({
  columns,
  rows,
  total,
  verifiedLabel,
  activeLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  columns: {
    rowNumber: string;
    name: string;
    email: string;
    mobilePhone: string;
    verified: string;
    active: string;
  };
  rows: CustomerRow[];
  total: number;
  verifiedLabel: string;
  activeLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  const pageCount = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <div className="scrollbar-primary overflow-x-auto">
        <table className="w-full min-w-[900px] table-fixed border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className={cn(HEADER_CLASSES, "w-[8%]")}>
                <span className="inline-block translate-x-6">{columns.rowNumber}</span>
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "w-[22%]")}>
                {columns.name}
                {HEADER_DIVIDER}
              </th>
              <th dir="ltr" className={cn(HEADER_CLASSES, "w-[25%] text-start")}>
                {columns.email}
                {HEADER_DIVIDER}
              </th>
              <th dir="ltr" className={cn(HEADER_CLASSES, "w-[17%] text-start")}>
                {columns.mobilePhone}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "w-[15%]")}>
                {columns.verified}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "w-[13%]")}>{columns.active}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
                <td className={cn(CELL_CLASSES, "text-primary-600")}>
                  <span className="inline-block translate-x-6">{row.rowNumber}</span>
                </td>
                <td className={cn(CELL_CLASSES, "font-medium text-zinc-800")}>{row.name}</td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {row.email}
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {row.mobilePhone}
                </td>
                <td className={CELL_CLASSES}>
                  {row.verified && (
                    <span className="inline-flex items-center gap-1.5 font-medium text-primary-700">
                      <CheckCircle2 className="h-4 w-4" />
                      {verifiedLabel}
                    </span>
                  )}
                </td>
                <td className={CELL_CLASSES}>
                  <span
                    className={cn(
                      "inline-flex items-center rounded-md px-3 py-1.5 text-xs font-semibold",
                      row.active ? "bg-primary-50 text-primary-700" : "bg-zinc-100 text-zinc-500"
                    )}
                  >
                    {activeLabel}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="text-sm text-zinc-500">
          {rows.length} {showingLabel} {ofLabel} {total} {entriesLabel}
        </p>
        <div className="flex items-center gap-1">
          <IconButton aria-label="First page" shape="square" className="h-8 w-8" disabled>
            <ChevronsLeft className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton aria-label="Previous page" shape="square" className="h-8 w-8" disabled>
            <ChevronLeft className="h-3.5 w-3.5" />
          </IconButton>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
            <span
              key={page}
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-lg text-sm font-medium",
                page === 1 ? "bg-primary text-white" : "text-zinc-500 hover:bg-zinc-50"
              )}
            >
              {page}
            </span>
          ))}
          <IconButton aria-label="Next page" shape="square" className="h-8 w-8">
            <ChevronRight className="h-3.5 w-3.5" />
          </IconButton>
          <IconButton aria-label="Last page" shape="square" className="h-8 w-8">
            <ChevronsRight className="h-3.5 w-3.5" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
