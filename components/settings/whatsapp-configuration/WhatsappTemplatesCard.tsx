"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Filter,
  MoreVertical,
  Plus,
  RefreshCw,
  Search,
} from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { FilterTriggerDropdown } from "@/components/shared/FilterTriggerDropdown";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

export interface ResolvedWhatsappTemplateRow {
  id: string;
  rowNumber: number;
  name: string;
  category: string;
  language: string;
  createdAtDisplay: string;
  status: { label: string; tone: StatusTone };
}

type TabId = "templates" | "messagesLog" | "analytics";

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

export function WhatsappTemplatesCard({
  tabs,
  searchPlaceholder,
  filtersLabel,
  statusFilterLabel,
  statusFilterOptions,
  syncLabel,
  createNewLabel,
  columns,
  rows,
  emptyLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  tabs: { id: TabId; label: string; count?: number }[];
  searchPlaceholder: string;
  filtersLabel: string;
  statusFilterLabel: string;
  statusFilterOptions: string[];
  syncLabel: string;
  createNewLabel: string;
  columns: {
    rowNumber: string;
    name: string;
    category: string;
    language: string;
    createdAt: string;
    status: string;
    action: string;
  };
  rows: ResolvedWhatsappTemplateRow[];
  emptyLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("templates");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [statusFilterOpen, setStatusFilterOpen] = useState(false);

  return (
    <Card className="py-4">
      <div className="flex items-center gap-5 border-b border-zinc-100 px-5">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-1.5 border-b-2 py-4 text-sm font-medium whitespace-nowrap transition-colors",
                isActive ? "border-primary text-primary" : "border-transparent text-zinc-500 hover:text-zinc-700"
              )}
            >
              {tab.label}
              {typeof tab.count === "number" && (
                <span
                  dir="ltr"
                  className="inline-flex h-5 min-w-5 items-center justify-center rounded-pill bg-primary-50 px-1.5 text-xs font-semibold text-primary-600"
                >
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === "templates" ? (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              <div className="relative min-w-[220px] max-w-sm flex-1">
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

            <div className="flex shrink-0 items-center gap-2.5">
              <button
                type="button"
                className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-[10px]  border-primary-600 px-4 text-sm font-medium text-primary-500 bg-white border "
              >
                <RefreshCw className="h-3.5 w-3.5" />
                {syncLabel}
              </button>
              <button
                type="button"
                className="inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
              >
                <Plus className="h-4 w-4" />
                {createNewLabel}
              </button>
            </div>
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

          <div className="scrollbar-primary overflow-x-auto px-5">
            <table className="w-full min-w-[900px] border-collapse">
              <thead>
                <tr className="border-b border-zinc-300">
                  <th className={HEADER_CLASSES}>
                    {columns.rowNumber}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.name}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.category}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.language}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.createdAt}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.status}
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
                    <td className={cn(CELL_CLASSES, "text-zinc-600")}>{row.category}</td>
                    <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                      {row.language}
                    </td>
                    <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-600")}>
                      {row.createdAtDisplay}
                    </td>
                    <td className={CELL_CLASSES}>
                      <StatusBadge label={row.status.label} tone={row.status.tone} />
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
        </>
      ) : (
        <p className="py-14 text-center text-sm text-zinc-400">{emptyLabel}</p>
      )}
    </Card>
  );
}
