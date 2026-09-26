"use client";

import { useState } from "react";
import Link from "next/link";
import { Copy, MoreVertical } from "lucide-react";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

// Frozen columns while the table scrolls horizontally: checkbox (0px), then
// # (offset by the checkbox's w-10).
const HEADER_STICKY: Record<number, string> = {
  0: "sticky inset-s-10 z-10 w-14 bg-white",
  9: "sticky inset-e-0 z-10 bg-white",
};

export interface ResolvedOrdersListRow {
  id: string;
  rowNumber: number;
  orderNumber: string;
  clientName: string;
  shippingCompany: string;
  dqqStatus: { label: string; tone: StatusTone };
  storeStatus: { label: string; tone: StatusTone };
  payment: { label: string; tone: StatusTone };
  hasIntegrationBadge?: boolean;
  totalDisplay: string;
}

export function OrdersTable({
  columns,
  addTagLabel,
  rows,
}: {
  columns: {
    rowNumber: string;
    orderNumber: string;
    clients: string;
    shippingCompany: string;
    dqqStatus: string;
    storeStatus: string;
    tags: string;
    payment: string;
    total: string;
    action: string;
  };
  addTagLabel: string;
  rows: ResolvedOrdersListRow[];
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

  const headers = [
    columns.rowNumber,
    columns.orderNumber,
    columns.clients,
    columns.shippingCompany,
    columns.dqqStatus,
    columns.storeStatus,
    columns.tags,
    columns.payment,
    columns.total,
    columns.action,
  ];

  // Short, vertically-centered divider between header titles only — an
  // inner absolutely-positioned tick mark rather than a full-height cell
  // border, so it doesn't continue down through the body rows.
  const headerDivider = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;

  return (
    <div className="scrollbar-primary overflow-x-auto">
      <table className="w-full min-w-[1100px] border-collapse">
        <thead>
          <tr className="border-b border-zinc-300">
            <th className="sticky inset-s-0 z-10 w-10 bg-white px-3 py-3">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 rounded border-zinc-300 accent-primary focus:ring-primary-100"
              />
              {headerDivider}
            </th>
            {headers.map((label, index) => (
              <th
                key={label}
                className={cn(
                  HEADER_STICKY[index] ?? "relative",
                  "whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase"
                )}
              >
                {label}
                {index < headers.length - 1 && headerDivider}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const isSelected = selected.has(row.id);
            return (
              <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
                <td className="sticky inset-s-0 z-10 bg-white px-3 py-3.5">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleOne(row.id)}
                    className="h-4 w-4 rounded border-zinc-300 accent-primary focus:ring-primary-100"
                  />
                </td>
                <td className="sticky inset-s-10 z-10 w-14 whitespace-nowrap bg-white px-3 py-3.5 text-sm text-zinc-500">
                  {row.rowNumber}
                </td>
                <td className="whitespace-nowrap px-3 py-3.5 text-start text-sm">
                  <Link
                    href={`/orders/${row.id}`}
                    dir="ltr"
                    className="inline-flex items-center gap-1.5 font-medium text-primary-600 hover:underline"
                  >
                    {row.orderNumber}
                    <Copy className="h-3.5 w-3.5 text-zinc-300" />
                  </Link>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5 text-sm text-zinc-600">{row.clientName}</td>
                <td className="whitespace-nowrap px-3 py-3.5 text-sm text-zinc-600">
                  <span className="inline-flex items-center gap-1.5">
                    {row.shippingCompany}
                    {row.hasIntegrationBadge && (
                      <span
                        dir="ltr"
                        className="rounded-md bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold text-violet-500"
                      >
                        +zid
                      </span>
                    )}
                  </span>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <StatusBadge label={row.dqqStatus.label} tone={row.dqqStatus.tone} />
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <StatusBadge label={row.storeStatus.label} tone={row.storeStatus.tone} />
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <button
                    type="button"
                    className="rounded-lg border border-dashed border-zinc-200 px-2.5 py-1 text-xs text-zinc-400 hover:border-zinc-300 hover:text-zinc-500"
                  >
                    {addTagLabel}
                  </button>
                </td>
                <td className="whitespace-nowrap px-3 py-3.5">
                  <StatusBadge label={row.payment.label} tone={row.payment.tone} />
                </td>
                <td
                  dir="ltr"
                  className="whitespace-nowrap px-3 py-3.5 text-start text-sm font-semibold text-primary-600"
                >
                  {row.totalDisplay}
                </td>
                <td className="sticky inset-e-0 z-10 bg-white whitespace-nowrap px-3 py-3.5">
                  <IconButton aria-label={columns.action}>
                    <MoreVertical className="h-4 w-4" />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
