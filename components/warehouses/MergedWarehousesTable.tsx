"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronUp,
  GitMerge,
  MoreVertical,
  Store,
  Warehouse,
} from "lucide-react";
import { IconButton } from "@/components/ui/IconButton";
import { cn } from "@/lib/utils/cn";
import type { MergedWarehouseGroup } from "@/lib/mock/types";

const HEADER_CLASSES = "whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const CELL_CLASSES = "whitespace-nowrap px-3 py-3.5 text-sm";

export function MergedWarehousesTable({
  columns,
  groupColumns,
  groups,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  columns: {
    rowNumber: string;
    warehouse: string;
    store: string;
    countryCity: string;
    address1: string;
    createdAt: string;
    channel: string;
  };
  groupColumns: {
    action: string;
    toggle: string;
  };
  groups: MergedWarehouseGroup[];
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex flex-col gap-3 px-5 py-4">
        {groups.map((group) => {
          const isExpanded = expandedId === group.id;
          return (
            <div
              key={group.id}
              className={cn(
                "overflow-hidden rounded-xl border",
                isExpanded ? "border-primary-100" : "border-zinc-200 bg-zinc-50"
              )}
            >
              <div
                className={cn(
                  "flex items-center justify-between gap-3 px-4 py-3",
                  isExpanded && "bg-primary-100/70"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <GitMerge className="h-4 w-4 text-zinc-500" />
                  <span className="text-sm font-semibold text-zinc-800">{group.name}</span>
                  <span className="inline-flex items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium text-zinc-500">
                    <Warehouse className="h-3.5 w-3.5" />
                    {group.members.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <IconButton aria-label={groupColumns.action} shape="square" className="h-8 w-8">
                    <MoreVertical className="h-4 w-4" />
                  </IconButton>
                  <IconButton
                    aria-label={groupColumns.toggle}
                    shape="square"
                    className="h-8 w-8"
                    onClick={() => setExpandedId(isExpanded ? null : group.id)}
                  >
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </IconButton>
                </div>
              </div>

              {isExpanded && (
                <div className="scrollbar-primary overflow-x-auto border-t border-primary-100 bg-primary-50/30">
                  <table className="w-full min-w-[900px] border-collapse">
                    <thead>
                      <tr className="border-b border-zinc-200">
                        <th className={HEADER_CLASSES}>{columns.rowNumber}</th>
                        <th className={HEADER_CLASSES}>{columns.warehouse}</th>
                        <th className={HEADER_CLASSES}>{columns.store}</th>
                        <th className={HEADER_CLASSES}>{columns.countryCity}</th>
                        <th className={HEADER_CLASSES}>{columns.address1}</th>
                        <th dir="ltr" className={cn(HEADER_CLASSES, "text-start")}>
                          {columns.createdAt}
                        </th>
                        <th className={HEADER_CLASSES}>{columns.channel}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {group.members.map((member) => (
                        <tr key={member.id} className="border-b border-zinc-100 last:border-0">
                          <td className={cn(CELL_CLASSES, "text-primary-600")}>{member.rowNumber}</td>
                          <td className={cn(CELL_CLASSES, "font-medium text-zinc-800")}>{member.warehouseName}</td>
                          <td className={cn(CELL_CLASSES, "text-zinc-500")}>{member.storeName}</td>
                          <td className={CELL_CLASSES}>
                            <p className="font-medium text-zinc-700">{member.country}</p>
                            <p className="text-xs text-zinc-400">{member.city}</p>
                          </td>
                          <td className={cn(CELL_CLASSES, "text-zinc-600")}>{member.address1}</td>
                          <td dir="ltr" className={cn(CELL_CLASSES, "text-start text-zinc-500")}>
                            {member.createdAtDisplay}
                          </td>
                          <td className={cn(CELL_CLASSES, "text-zinc-500")}>
                            {member.channel === "zid" ? (
                              <span dir="ltr" className="rounded-md bg-violet-50 px-1.5 py-0.5 text-[10px] font-semibold text-violet-500">
                                +zid
                              </span>
                            ) : member.channel === "storefront" ? (
                              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-teal-50 text-teal-600">
                                <Store className="h-3.5 w-3.5" />
                              </span>
                            ) : (
                              "-"
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
        <p className="text-sm text-zinc-500">
          {groups.length} {showingLabel} {ofLabel} {groups.length} {entriesLabel}
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
