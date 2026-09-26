"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { DateRangeDropdown, type DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils/cn";

export interface ReportsQuickPreset {
  id: string;
  label: string;
}

const SCROLL_AMOUNT = 200;

export function ReportsFiltersBar({
  filtersLabel,
  headerAction,
  quickPresets,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  extraFilters,
}: {
  filtersLabel: string;
  headerAction?: ReactNode;
  quickPresets: ReportsQuickPreset[];
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  extraFilters?: ReactNode;
}) {
  const { dir } = useLanguage();
  const [activePreset, setActivePreset] = useState(quickPresets[0]?.id);
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
  }, [quickPresets]);

  function scrollByDirection(directionSign: 1 | -1) {
    const container = scrollRef.current;
    if (!container) return;
    const effectiveSign = dir === "rtl" ? -directionSign : directionSign;
    container.scrollBy({ left: effectiveSign * SCROLL_AMOUNT, behavior: "smooth" });
  }

  return (
    <Card className="p-5">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-zinc-700">{filtersLabel}</p>
        {headerAction}
      </div>

      <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="flex min-w-0 items-center gap-1">
          {canScroll && (
            <button
              type="button"
              onClick={() => scrollByDirection(-1)}
              aria-label="Scroll filters backward"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
            >
              <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
            </button>
          )}

          <div
            ref={scrollRef}
            className="scrollbar-none flex flex-nowrap items-center gap-2.5 overflow-x-auto scroll-smooth"
          >
            {quickPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={(event) => {
                  setActivePreset(preset.id);
                  event.currentTarget.scrollIntoView({
                    behavior: "smooth",
                    inline: "center",
                    block: "nearest",
                  });
                }}
                className={cn(
                  "shrink-0 rounded-[10%] px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors",
                  activePreset === preset.id ? "bg-primary text-white" : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
                )}
              >
                {preset.label}
              </button>
            ))}
          </div>

          {canScroll && (
            <button
              type="button"
              onClick={() => scrollByDirection(1)}
              aria-label="Scroll filters forward"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600"
            >
              <ChevronRight className="h-4 w-4 rtl:rotate-180" />
            </button>
          )}
        </div>

        <div className="shrink-0">
          <DateRangeDropdown
            presetLabels={dateRangePresetLabels}
            cancelLabel={dateRangeCancelLabel}
            applyLabel={dateRangeApplyLabel}
            defaultPreset="today"
          />
        </div>
      </div>

      {extraFilters && <div className="mt-4 border-t border-zinc-100 pt-4">{extraFilters}</div>}
    </Card>
  );
}
