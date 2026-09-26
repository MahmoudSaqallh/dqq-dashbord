"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { BarChart3, CalendarDays, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Clock, Search, SlidersHorizontal } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { IconButton } from "@/components/ui/IconButton";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils/cn";

type TabId = "delayedOrders" | "vacations" | "delayRules" | "analysis";

const TAB_ICONS: Record<TabId, typeof Clock> = {
  delayedOrders: Clock,
  vacations: CalendarDays,
  delayRules: SlidersHorizontal,
  analysis: BarChart3,
};

const SCROLL_AMOUNT = 160;

const HEADER_CLASSES =
  "relative whitespace-nowrap px-3 py-3 text-start text-xs font-semibold tracking-wide text-zinc-400 uppercase";
const HEADER_DIVIDER = <span className="absolute inset-e-0 top-1/2 h-3 w-px -translate-y-1/2 bg-zinc-300" />;

export function DelaySystemTabsCard({
  tabs,
  exportLabel,
  searchPlaceholder,
  columns,
  emptyLabel,
  comingSoonLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  tabs: { id: TabId; label: string }[];
  exportLabel: string;
  searchPlaceholder: string;
  columns: {
    rowNumber: string;
    orderNumber: string;
    clients: string;
    customerName: string;
    city: string;
    warehouse: string;
    orderDate: string;
    processingTime: string;
    storeStatus: string;
    delayTime: string;
  };
  emptyLabel: string;
  comingSoonLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  const { dir } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabId>("delayedOrders");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScroll, setCanScroll] = useState(false);

  useLayoutEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    function checkOverflow() {
      if (!container) return;
      setCanScroll(container.scrollWidth > container.clientWidth + 1);
    }

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(container);
    return () => observer.disconnect();
  }, [tabs]);

  function scrollByDirection(directionSign: 1 | -1) {
    const container = scrollRef.current;
    if (!container) return;
    const effectiveSign = dir === "rtl" ? -directionSign : directionSign;
    container.scrollBy({ left: effectiveSign * SCROLL_AMOUNT, behavior: "smooth" });
  }

  return (
    <Card className="p-3 sm:p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-1">
          {canScroll && (
            <button
              type="button"
              onClick={() => scrollByDirection(-1)}
              aria-label="Scroll tabs backward"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
            >
              <ChevronLeft className="h-3.5 w-3.5 rtl:rotate-180" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="scrollbar-none flex max-w-full items-center gap-1 overflow-x-auto scroll-smooth rounded-pill bg-zinc-100 p-1"
          >
            {tabs.map((tab) => {
              const Icon = TAB_ICONS[tab.id];
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={(event) => {
                    setActiveTab(tab.id);
                    event.currentTarget.scrollIntoView({
                      behavior: "smooth",
                      inline: "center",
                      block: "nearest",
                    });
                  }}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-pill px-3 py-2 text-xs font-medium whitespace-nowrap transition-colors sm:px-3.5 sm:text-sm",
                    isActive ? "bg-white text-zinc-900 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
                  )}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {canScroll && (
            <button
              type="button"
              onClick={() => scrollByDirection(1)}
              aria-label="Scroll tabs forward"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
            >
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
            </button>
          )}
        </div>

        {activeTab === "delayedOrders" && (
          <button
            type="button"
            className="inline-flex h-9 items-center whitespace-nowrap rounded-md border border-zinc-200 bg-white px-4 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
          >
            {exportLabel}
          </button>
        )}
      </div>

      {activeTab === "delayedOrders" ? (
        <div className="mt-4">
          <div className="flex justify-end border-y border-zinc-100 py-4 ">
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 inset-s-3 h-4 w-4 -translate-y-1/2 text-green-500" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="h-10 w-full rounded-xl border border-zinc-200 bg-white ps-9 pe-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none"
              />
            </div>
          </div>

          <div className="scrollbar-primary mt-4 overflow-x-auto">
            <table className="w-full min-w-[1200px] border-collapse">
              <thead>
                <tr className="border-b border-zinc-300">
                  <th className={HEADER_CLASSES}>
                    {columns.rowNumber}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.orderNumber}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.clients}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.customerName}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.city}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.warehouse}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.orderDate}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.processingTime}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>
                    {columns.storeStatus}
                    {HEADER_DIVIDER}
                  </th>
                  <th className={HEADER_CLASSES}>{columns.delayTime}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td colSpan={10} className="bg-primary-50 py-6 text-center text-sm font-medium text-primary-700">
                    {emptyLabel}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4">
            <p className="text-sm text-zinc-500">
              0 {showingLabel} {ofLabel} 0 {entriesLabel}
            </p>
            <div className="flex items-center gap-1">
              <IconButton aria-label="First page" shape="square" className="h-8 w-8" disabled>
                <ChevronsLeft className="h-3.5 w-3.5" />
              </IconButton>
              <IconButton aria-label="Previous page" shape="square" className="h-8 w-8" disabled>
                <ChevronLeft className="h-3.5 w-3.5" />
              </IconButton>
              <IconButton aria-label="Next page" shape="square" className="h-8 w-8" disabled>
                <ChevronRight className="h-3.5 w-3.5" />
              </IconButton>
              <IconButton aria-label="Last page" shape="square" className="h-8 w-8" disabled>
                <ChevronsRight className="h-3.5 w-3.5" />
              </IconButton>
            </div>
          </div>
        </div>
      ) : (
        <p className="py-14 text-center text-sm text-zinc-400">{comingSoonLabel}</p>
      )}
    </Card>
  );
}
