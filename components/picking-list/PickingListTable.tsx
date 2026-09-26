"use client";

import { useState } from "react";
import { MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

export interface ResolvedPickingListRow {
  id: string;
  rowNumber: number;
  pickedId: string;
  employee: string;
  createDateDisplay: string;
  pickedDateDisplay: string;
  warehouse: string;
  ordersCount: number;
  productsCount: number;
  qtyOfProducts: number;
  status: { label: string; tone: StatusTone };
}

// A short, vertically-centered divider between header titles only — an inner
// absolutely-positioned tick mark rather than a full-height cell border, so
// it doesn't continue down through the body rows as a long column rule.
const HEADER_BASE = "whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_CLASSES = cn("relative", HEADER_BASE);
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

// Frozen columns while the table scrolls horizontally: checkbox (0px), then
// # (offset by the checkbox's w-10).
// These replace (not extend) the `relative` positioning above — an element
// can't be both `position: relative` and `position: sticky`.
const STICKY_CHECKBOX = "sticky inset-s-0 z-10 bg-white";
const STICKY_ROW_NUMBER = cn("sticky inset-s-10 z-10 w-14 bg-white", HEADER_BASE);
const STICKY_ACTION = "sticky inset-e-0 z-10 bg-white";
const CELL_STICKY_ROW_NUMBER = cn("sticky inset-s-10 z-10 w-14 bg-white", CELL_CLASSES);

export function PickingListTable({
  columns,
  rows,
}: {
  columns: {
    rowNumber: string;
    pickedId: string;
    employee: string;
    createDate: string;
    pickedDate: string;
    warehouse: string;
    orders: string;
    products: string;
    qtyOfProducts: string;
    status: string;
    action: string;
  };
  rows: ResolvedPickingListRow[];
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected = rows.length > 0 && selected.size === rows.length;

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(rows.map((r) => r.id)));
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="scrollbar-primary overflow-x-auto px-5 pb-4">
      <table className="w-full min-w-[1200px] border-collapse">
        <thead>
          <tr className="border-b border-zinc-300">
            <th className={cn(STICKY_CHECKBOX, "w-10 px-3 py-3")}>
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 rounded border-zinc-300 accent-primary focus:ring-primary-100"
              />
              {HEADER_DIVIDER}
            </th>
            <th className={STICKY_ROW_NUMBER}>
              {columns.rowNumber}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.pickedId}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.employee}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.createDate}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.pickedDate}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.warehouse}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.orders}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.products}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.qtyOfProducts}
              {HEADER_DIVIDER}
            </th>
            <th className={HEADER_CLASSES}>
              {columns.status}
              {HEADER_DIVIDER}
            </th>
            <th className={STICKY_ACTION}>{columns.action}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
              <td className={cn(STICKY_CHECKBOX, "px-3 py-3.5")}>
                <input
                  type="checkbox"
                  checked={selected.has(row.id)}
                  onChange={() => toggleOne(row.id)}
                  className="h-4 w-4 rounded border-zinc-300 accent-primary focus:ring-primary-100"
                />
              </td>
              <td className={cn(CELL_STICKY_ROW_NUMBER, "text-zinc-500")}>{row.rowNumber}</td>
              <td className={cn(CELL_CLASSES, "text-start text-zinc-700")}>
                <span dir="ltr">{row.pickedId}</span>
              </td>
              <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.employee}</td>
              <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                {row.createDateDisplay}
              </td>
              <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                {row.pickedDateDisplay}
              </td>
              <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.warehouse}</td>
              <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.ordersCount}</td>
              <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.productsCount}</td>
              <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.qtyOfProducts}</td>
              <td className={CELL_CLASSES}>
                <StatusBadge label={row.status.label} tone={row.status.tone} />
              </td>
              <td className={cn(STICKY_ACTION, CELL_CLASSES)}>
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
