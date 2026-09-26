"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical, Pencil, RotateCw } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import { PURCHASE_ORDER_STATUS_TONE } from "@/lib/utils/status-colors";
import type { PurchaseOrderRow } from "@/lib/mock/types";

function RowActionsMenu({
  orderId,
  editLabel,
  changeStatusLabel,
  actionLabel,
  onChangeStatusClick,
}: {
  orderId: string;
  editLabel: string;
  changeStatusLabel: string;
  actionLabel: string;
  onChangeStatusClick?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <IconButton aria-label={actionLabel} onClick={() => setOpen((v) => !v)}>
        <MoreVertical className="h-4 w-4" />
      </IconButton>

      {open && (
        <div className="animate-dropdown-in absolute inset-e-0 top-full z-20 mt-1.5 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
          <Link
            href={`/inventory-management/purchase-orders/${orderId}/edit`}
            className="flex items-center gap-2 px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
          >
            <Pencil className="h-3.5 w-3.5" />
            {editLabel}
          </Link>
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              onChangeStatusClick?.(orderId);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
          >
            <RotateCw className="h-3.5 w-3.5" />
            {changeStatusLabel}
          </button>
        </div>
      )}
    </div>
  );
}

const HEADER_STICKY: Record<number, string> = {
  0: "sticky inset-s-10 z-10 w-14 bg-white",
  9: "sticky inset-e-0 z-10 bg-white",
};

const HEADER_CLASSES = "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

export function PurchaseOrdersTable({
  columns,
  rows,
  statusLabels,
  emptyValue,
  showingLabel,
  ofLabel,
  entriesLabel,
  total,
  editLabel,
  changeStatusLabel,
  onRowClick,
  onChangeStatusClick,
}: {
  columns: {
    rowNumber: string;
    serialNumber: string;
    supplier: string;
    warehouse: string;
    products: string;
    totalAmount: string;
    deliveryDate: string;
    status: string;
    approvedBy: string;
    action: string;
  };
  rows: PurchaseOrderRow[];
  statusLabels: Record<PurchaseOrderRow["status"], string>;
  emptyValue: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
  total: number;
  editLabel: string;
  changeStatusLabel: string;
  onRowClick?: (id: string) => void;
  onChangeStatusClick?: (id: string) => void;
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
    columns.serialNumber,
    columns.supplier,
    columns.warehouse,
    columns.products,
    columns.totalAmount,
    columns.deliveryDate,
    columns.status,
    columns.approvedBy,
    columns.action,
  ];

  return (
    <div>
      <div className="scrollbar-primary overflow-x-auto">
        <table className="w-full min-w-[1200px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className="sticky inset-s-0 z-10 w-10 bg-white px-3 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  className="h-4 w-4 rounded border-zinc-300 accent-primary focus:ring-primary-100"
                />
                {HEADER_DIVIDER}
              </th>
              {headers.map((label, index) => (
                <th key={label} className={cn(HEADER_STICKY[index] ?? "relative", HEADER_CLASSES)}>
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
                  <td className="sticky inset-s-0 z-10 bg-white px-3 py-3.5" onClick={(event) => event.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleOne(row.id)}
                      className="h-4 w-4 rounded border-zinc-300 accent-primary focus:ring-primary-100"
                    />
                  </td>
                  <td className="sticky inset-s-10 z-10 w-14 bg-white px-3 py-3.5 text-sm text-primary-600">
                    {row.rowNumber}
                  </td>
                  <td dir="ltr" className={cn(CELL_CLASSES, "text-start font-medium text-zinc-800")}>
                    {row.serialNumber}
                  </td>
                  <td className={CELL_CLASSES}>
                    <p className="font-medium text-zinc-700">{row.supplierName}</p>
                    {row.supplierEmail && <p className="text-xs text-zinc-400">{row.supplierEmail}</p>}
                  </td>
                  <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.warehouseName}</td>
                  <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.productsCount}</td>
                  <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                    {row.totalAmountDisplay ?? emptyValue}
                  </td>
                  <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                    {row.deliveryDateDisplay ?? emptyValue}
                  </td>
                  <td className={CELL_CLASSES}>
                    <StatusBadge label={statusLabels[row.status]} tone={PURCHASE_ORDER_STATUS_TONE[row.status]} />
                  </td>
                  <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.approvedBy ?? emptyValue}</td>
                  <td
                    className="sticky inset-e-0 z-10 bg-white whitespace-nowrap px-3 py-3.5"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <RowActionsMenu
                      orderId={row.id}
                      editLabel={editLabel}
                      changeStatusLabel={changeStatusLabel}
                      actionLabel={columns.action}
                      onChangeStatusClick={onChangeStatusClick}
                    />
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
