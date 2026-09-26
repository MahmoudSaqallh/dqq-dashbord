"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Link2, MoreVertical, Store } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { cn } from "@/lib/utils/cn";
import type { WarehouseRow } from "@/lib/mock/types";

const HEADER_STICKY: Record<number, string> = {
  0: "sticky inset-s-10 z-10 w-14 bg-white",
  9: "sticky inset-e-0 z-10 bg-white",
};

const HEADER_CLASSES = "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

export function WarehousesTable({
  columns,
  rows,
  selected,
  onToggleAll,
  onToggleOne,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  columns: {
    rowNumber: string;
    name: string;
    countryCity: string;
    address1: string;
    shortAddress: string;
    createdAt: string;
    store: string;
    channel: string;
    enableInventoryLocation: string;
    action: string;
  };
  rows: WarehouseRow[];
  selected: Set<string>;
  onToggleAll: () => void;
  onToggleOne: (id: string) => void;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  const [inventoryEnabled, setInventoryEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(rows.map((row) => [row.id, row.inventoryLocationEnabled]))
  );
  const allSelected = rows.length > 0 && selected.size === rows.length;

  const headers = [
    columns.rowNumber,
    columns.name,
    columns.countryCity,
    columns.address1,
    columns.shortAddress,
    columns.createdAt,
    columns.store,
    columns.channel,
    columns.enableInventoryLocation,
    columns.action,
  ];

  return (
    <div>
      <div className="scrollbar-primary overflow-x-auto">
        <table className="w-full min-w-[1300px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className="sticky inset-s-0 z-10 w-10 bg-white px-3 py-3">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={onToggleAll}
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
                <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
                  <td className="sticky inset-s-0 z-10 bg-white px-3 py-3.5">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => onToggleOne(row.id)}
                      className="h-4 w-4 rounded border-zinc-300 accent-primary focus:ring-primary-100"
                    />
                  </td>
                  <td className="sticky inset-s-10 z-10 w-14 bg-white px-3 py-3.5 text-sm text-primary-600">
                    {row.rowNumber}
                  </td>
                  <td className={cn(CELL_CLASSES, "font-medium")}>
                    {row.isMerged ? (
                      <Link
                        href="#"
                        className="inline-flex items-center gap-1.5 text-orange-600 underline underline-offset-2 hover:text-orange-700"
                      >
                        {row.name}
                        <span className="flex h-5 w-5 items-center justify-center rounded-md bg-orange-50 text-orange-500">
                          <Link2 className="h-3 w-3" />
                        </span>
                      </Link>
                    ) : (
                      <span className="text-zinc-800">{row.name}</span>
                    )}
                  </td>
                  <td className={CELL_CLASSES}>
                    <p className="font-medium text-zinc-700">{row.country}</p>
                    <p className="text-xs text-zinc-400">{row.city}</p>
                  </td>
                  <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.address1}</td>
                  <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.shortAddress}</td>
                  <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                    {row.createdAtDisplay}
                  </td>
                  <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.storeName}</td>
                  <td className={CELL_CLASSES}>
                    {row.channel === "zid" ? (
                      <span dir="ltr" className="rounded-md bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold text-violet-500">
                        +zid
                      </span>
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 text-teal-600">
                        <Store className="h-3.5 w-3.5" />
                      </span>
                    )}
                  </td>
                  <td className={cn(CELL_CLASSES, "text-center")}>
                    <ToggleSwitch
                      checked={inventoryEnabled[row.id] ?? false}
                      onChange={(checked) => setInventoryEnabled((prev) => ({ ...prev, [row.id]: checked }))}
                    />
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
