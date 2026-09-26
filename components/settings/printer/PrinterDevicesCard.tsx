"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  MoreVertical,
  RefreshCw,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { FilterTriggerDropdown } from "@/components/shared/FilterTriggerDropdown";
import { cn } from "@/lib/utils/cn";
import type { PrinterDeviceStatus } from "@/lib/mock/types";
import { PRINTER_DEVICE_STATUS_TONE } from "@/lib/utils/status-colors";

export interface ResolvedPrinterDeviceRow {
  id: string;
  rowNumber: number;
  computerId: string;
  name: string;
  hostName: string;
  status: { label: string; code: PrinterDeviceStatus };
  version: string;
  printersLabel: string;
}

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

const STATUS_DOT: Record<PrinterDeviceStatus, string> = {
  connected: "bg-primary",
  disconnected: "bg-danger",
};

function DeviceStatus({ label, code }: { label: string; code: PrinterDeviceStatus }) {
  const tone = PRINTER_DEVICE_STATUS_TONE[code];
  return (
    <span className={cn("inline-flex items-center gap-1.5 text-sm font-medium", tone === "danger" ? "text-danger" : "text-primary-700")}>
      <span className={cn("h-1.5 w-1.5 shrink-0 rounded-full", STATUS_DOT[code])} />
      {label}
    </span>
  );
}

export function PrinterDevicesCard({
  title,
  searchPlaceholder,
  filtersLabel,
  statusFilterLabel,
  statusFilterOptions,
  syncLabel,
  columns,
  rows,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  title: string;
  searchPlaceholder: string;
  filtersLabel: string;
  statusFilterLabel: string;
  statusFilterOptions: string[];
  syncLabel: string;
  columns: {
    rowNumber: string;
    computerId: string;
    name: string;
    hostName: string;
    status: string;
    version: string;
    printers: string;
    action: string;
  };
  rows: ResolvedPrinterDeviceRow[];
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);

  return (
    <Card>
      <div className="px-5 py-4">
        <p className="text-base font-semibold text-zinc-900">{title}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 pb-4">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="relative min-w-[200px] max-w-sm flex-1">
            <Search className="pointer-events-none absolute top-1/2 inset-s-3 h-4 w-4 -translate-y-1/2 text-primary-700" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              className="h-10 w-full rounded-xl border border-primary-100 bg-primary-50 ps-9 pe-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
            />
          </div>

          <button
            type="button"
            onClick={() => setFiltersOpen((v) => !v)}
            className={cn(
              "inline-flex h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-xl border bg-white px-3 text-sm hover:bg-zinc-50",
              filtersOpen ? "border-primary-500 text-primary-700" : "border-zinc-200 text-black"
            )}
          >
            <Filter className={cn("h-4 w-4", filtersOpen ? "text-primary" : "text-black")} />
            {filtersLabel}
          </button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-[10px] border border-green-500 bg-white px-6 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
        >
          <RefreshCw className="h-3.5 w-3.5 text-primary" />
          {syncLabel}
        </button>
      </div>

      {filtersOpen && (
        <div className="mx-5 mb-4 flex flex-wrap items-center gap-3 rounded-xl bg-zinc-50 px-4 py-3">
          <FilterTriggerDropdown
            filter={{ label: statusFilterLabel, options: statusFilterOptions }}
            isOpen={statusFilterOpen}
            onOpenChange={setStatusFilterOpen}
            variant="chip"
          />
        </div>
      )}

      <div className="overflow-x-auto px-5">
        <table className="w-full min-w-[900px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300">
              <th className={HEADER_CLASSES}>
                {columns.rowNumber}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.computerId}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.name}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.hostName}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.status}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.version}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.printers}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>{columns.action}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
                <td className={cn(CELL_CLASSES, "text-zinc-500")}>{row.rowNumber}</td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {row.computerId}
                </td>
                <td className={cn(CELL_CLASSES, "font-medium text-zinc-800")}>{row.name}</td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-500")}>
                  {row.hostName}
                </td>
                <td className={CELL_CLASSES}>
                  <DeviceStatus label={row.status.label} code={row.status.code} />
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {row.version}
                </td>
                <td className={CELL_CLASSES}>
                  <span className="font-medium text-primary-600">{row.printersLabel}</span>
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
    </Card>
  );
}
