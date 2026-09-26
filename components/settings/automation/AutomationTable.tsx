"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, MoreVertical } from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { cn } from "@/lib/utils/cn";
import type { AutomationRow } from "@/lib/mock/types";

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

function StoreStatusBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 whitespace-nowrap rounded-md bg-primary-50 px-2.5 py-1.5 text-xs">
      <span className="text-primary-500">{label}:</span>
      <span className="font-bold text-primary-700">{value}</span>
    </span>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-0.5">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-1.5 text-sm font-medium text-primary-700">
          <span className="h-1 w-1 shrink-0 rounded-full bg-primary-700" />
          {item}
        </li>
      ))}
    </ul>
  );
}

function AutomationStatusToggle({ defaultChecked }: { defaultChecked: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return <ToggleSwitch checked={checked} onChange={setChecked} />;
}

export function AutomationTable({
  columns,
  storeStatusPillLabel,
  rows,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  columns: {
    rowNumber: string;
    automation: string;
    status: string;
    restrictions: string;
    events: string;
    createdAt: string;
    automationStatus: string;
    action: string;
  };
  storeStatusPillLabel: string;
  rows: AutomationRow[];
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div>
      <div className="scrollbar-primary overflow-x-auto px-5">
        <table className="w-full min-w-[1100px] border-collapse">
          <thead>
            <tr className="border-b border-zinc-300 ">
              <th className={HEADER_CLASSES}>
                {columns.rowNumber}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.automation}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.status}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.restrictions}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.events}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>
                {columns.createdAt}
                {HEADER_DIVIDER}
              </th>
              <th className={cn(HEADER_CLASSES, "text-center")}>
                {columns.automationStatus}
                {HEADER_DIVIDER}
              </th>
              <th className={HEADER_CLASSES}>{columns.action}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-zinc-300 transition-colors last:border-0 hover:bg-primary-50">
                <td className={cn(CELL_CLASSES, "text-zinc-500")}>{row.rowNumber}</td>
                <td className={cn(CELL_CLASSES, "font-medium text-zinc-800")}>{row.name}</td>
                <td className={CELL_CLASSES}>
                  <StoreStatusBadge label={storeStatusPillLabel} value={row.storeStatusLabel} />
                </td>
                <td className={CELL_CLASSES}>
                  <BulletList items={row.restrictions} />
                </td>
                <td className={CELL_CLASSES}>
                  <BulletList items={row.events} />
                </td>
                <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                  {row.createdAtDisplay}
                </td>
                <td className={cn(CELL_CLASSES, "text-center")}>
                  <AutomationStatusToggle defaultChecked={row.enabled} />
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
