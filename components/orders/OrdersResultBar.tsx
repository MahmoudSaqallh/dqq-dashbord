"use client";

import { useState } from "react";
import {
  ListChecks,
  ChevronDown,
  ArrowDownUp,
  Printer,
  PauseCircle,
  RefreshCcw,
  Layers,
  UserPlus,
  ClipboardList,
  Tag,
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils/cn";

const ACTION_ITEMS = [
  { key: "actionsPrint", icon: Printer },
  { key: "actionsHold", icon: PauseCircle },
  { key: "actionsChangeStatus", icon: RefreshCcw },
  { key: "actionsBulkUpdate", icon: Layers },
  { key: "actionsAssignEmployee", icon: UserPlus, disabled: true },
  { key: "actionsAddToPickingList", icon: ClipboardList, disabled: true },
  { key: "actionsAddTags", icon: Tag },
] as const;

const PAGE_SIZES = [10, 25, 50, 100];

export function OrdersResultBar({ resultCount }: { resultCount: number }) {
  const { t } = useLanguage();
  const [actionsOpen, setActionsOpen] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);
  const [pageSizeOpen, setPageSizeOpen] = useState(false);
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);

  const ordersUnit = t("ordersPage.ordersUnit");

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
      <div className="flex items-center gap-2 text-sm font-semibold text-zinc-900">
        {t("ordersPage.result")}
        <span className="text-primary-600">{resultCount.toLocaleString("en-US")}</span>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="relative">
          <button
            type="button"
            onClick={() => setActionsOpen((v) => !v)}
            onBlur={() => setTimeout(() => setActionsOpen(false), 100)}
            className="inline-flex h-9 items-center gap-1.5 rounded-pill border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            <ListChecks className="h-4 w-4 text-zinc-400" />
            {t("ordersPage.actions")}
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
          </button>
          {actionsOpen && (
            <div className="absolute inset-e-0 top-full z-20 mt-2 w-56 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
              {ACTION_ITEMS.map((item) => (
                <button
                  key={item.key}
                  type="button"
                  disabled={"disabled" in item && item.disabled}
                  onMouseDown={() => setActionsOpen(false)}
                  className={cn(
                    "flex w-full items-center gap-2 px-3 py-2 text-start text-sm",
                    "disabled" in item && item.disabled
                      ? "cursor-not-allowed text-zinc-300"
                      : "text-zinc-600 hover:bg-zinc-50"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {t(`ordersPage.${item.key}`)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setExportOpen((v) => !v)}
            onBlur={() => setTimeout(() => setExportOpen(false), 100)}
            className="inline-flex h-9 items-center gap-1.5 rounded-pill border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            <ArrowDownUp className="h-4 w-4 text-zinc-400" />
            {t("ordersPage.exportImport")}
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
          </button>
          {exportOpen && (
            <div className="absolute inset-e-0 top-full z-20 mt-2 w-40 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onMouseDown={() => setExportOpen(false)}
                className="flex w-full items-center px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
              >
                Export
              </button>
              <button
                type="button"
                onMouseDown={() => setExportOpen(false)}
                className="flex w-full items-center px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
              >
                Import
              </button>
            </div>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setPageSizeOpen((v) => !v)}
            onBlur={() => setTimeout(() => setPageSizeOpen(false), 100)}
            className="inline-flex h-9 items-center gap-1.5 rounded-pill border border-zinc-200 bg-white px-3 text-sm font-medium text-zinc-600 hover:bg-zinc-50"
          >
            {pageSize} {ordersUnit}
            <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
          </button>
          {pageSizeOpen && (
            <div className="absolute inset-e-0 top-full z-20 mt-2 w-32 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
              {PAGE_SIZES.map((option) => (
                <button
                  key={option}
                  type="button"
                  onMouseDown={() => {
                    setPageSize(option);
                    setPageSizeOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center px-3 py-2 text-start text-sm hover:bg-zinc-50",
                    option === pageSize ? "font-medium text-primary" : "text-zinc-600"
                  )}
                >
                  {option} {ordersUnit}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
