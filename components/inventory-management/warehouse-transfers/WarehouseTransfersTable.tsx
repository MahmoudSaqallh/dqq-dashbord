"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Circle, Pencil } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import { TRANSFER_PRIORITY_TONE, TRANSFER_RECEIVER_STATUS_TONE, TRANSFER_SENDER_STATUS_TONE } from "@/lib/utils/status-colors";
import type { WarehouseTransferRow } from "@/lib/mock/types";

const HEADER_CLASSES = "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

const PRIORITY_TEXT_TONE: Record<string, string> = {
  info: "text-info",
  success: "text-primary-600",
  warning: "text-warning",
  danger: "text-danger",
  maroon: "text-maroon",
  neutral: "text-zinc-500",
};

export function WarehouseTransfersTable({
  columns,
  rows,
  fromLabel,
  toLabel,
  senderStatusLabels,
  receiverStatusLabels,
  priorityLabels,
  emptyValue,
  showingLabel,
  ofLabel,
  entriesLabel,
  total,
  onRowClick,
}: {
  columns: {
    rowNumber: string;
    number: string;
    fromToWarehouse: string;
    shippingCompany: string;
    quantity: string;
    priority: string;
    senderStatus: string;
    receiverStatus: string;
    action: string;
  };
  rows: WarehouseTransferRow[];
  fromLabel: string;
  toLabel: string;
  senderStatusLabels: Record<WarehouseTransferRow["senderStatus"], string>;
  receiverStatusLabels: Record<WarehouseTransferRow["receiverStatus"], string>;
  priorityLabels: Record<WarehouseTransferRow["priority"], string>;
  emptyValue: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
  total: number;
  onRowClick?: (id: string) => void;
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected = rows.length > 0 && selected.size === rows.length;

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(rows.map((row) => row.id)));
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const headers = [
    columns.rowNumber,
    columns.number,
    columns.fromToWarehouse,
    columns.shippingCompany,
    columns.quantity,
    columns.priority,
    columns.senderStatus,
    columns.receiverStatus,
    columns.action,
  ];

  return (
    <div>
      <div className="scrollbar-primary overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className="relative w-10 px-3 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-zinc-300 accent-primary focus:ring-primary-100"
                />
                {HEADER_DIVIDER}
              </th>
              {headers.map((label, index) => (
                <th key={label} className={cn("relative", HEADER_CLASSES)}>
                  {label}
                  {index < headers.length - 1 && HEADER_DIVIDER}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              const isSelected = selected.has(row.id);
              return (
                <tr
                  key={row.id}
                  onClick={() => onRowClick?.(row.id)}
                  className={cn(
                    "border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50",
                    onRowClick && "cursor-pointer"
                  )}
                >
                  <td className="px-3 py-3.5" onClick={(event) => event.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(row.id)}
                      className="h-4 w-4 rounded border-zinc-300 accent-primary focus:ring-primary-100"
                    />
                  </td>
                  <td className={cn(CELL_CLASSES, "text-primary-600")}>{row.rowNumber}</td>
                  <td dir="ltr" className={cn(CELL_CLASSES, "text-start font-medium text-zinc-800")}>
                    {row.number}
                  </td>
                  <td className={cn(CELL_CLASSES, "whitespace-normal text-center")}>
                    <div className="relative  w-fit">
                      <div className="absolute inset-s-0 top-2 bottom-2 flex w-2 justify-center">
                        <span className="animate-transfer-line h-full w-px text-primary" />
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <Circle className="h-2 w-2 shrink-0 text-primary" />
                        <span>
                          {fromLabel}-{row.fromWarehouse}
                        </span>
                      </div>
                      <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-600">
                        <span className="h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>
                          {toLabel}-{row.toWarehouse}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.shippingCompany ?? emptyValue}</td>
                  <td className={cn(CELL_CLASSES, "text-zinc-700")}>{row.quantity}</td>
                  <td className={cn(CELL_CLASSES, "font-medium", PRIORITY_TEXT_TONE[TRANSFER_PRIORITY_TONE[row.priority]])}>
                    {priorityLabels[row.priority]}
                  </td>
                  <td className={CELL_CLASSES}>
                    <StatusBadge label={senderStatusLabels[row.senderStatus]} tone={TRANSFER_SENDER_STATUS_TONE[row.senderStatus]} />
                  </td>
                  <td className={CELL_CLASSES}>
                    <StatusBadge
                      label={receiverStatusLabels[row.receiverStatus]}
                      tone={TRANSFER_RECEIVER_STATUS_TONE[row.receiverStatus]}
                    />
                  </td>
                  <td className={CELL_CLASSES} onClick={(event) => event.stopPropagation()}>
                    <Link
                      href={`/inventory-management/warehouse-transfers/${row.id}/edit`}
                      aria-label={columns.action}
                      className="flex h-9 w-9 items-center justify-center rounded-[30%] border border-zinc-200 bg-white text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              );
            })}
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
