"use client";

import { useLayoutEffect, useMemo, useRef, useState, type RefObject } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import {
  CHIP_TRIGGER_CLASSES,
  FilterTriggerDropdown,
  useFixedDropdown,
  type FilterOption,
} from "@/components/shared/FilterTriggerDropdown";

const GAP = 12; // matches gap-3
const WIDTH_SAFETY_MARGIN = 24; // buffer so the last inline filter never overlaps More
const LAPTOP_TIER_MAX_WIDTH = 1536; // below this: laptop tier
const LAPTOP_TIER_VISIBLE_COUNT = 4; // laptop tier shows 4 filters + More = 5 total
const MORE_ID = "__more__";

export type OrdersFilterOption = FilterOption;

const MORE_PANEL_WIDTH = 256; // matches w-64

function MoreOverflowDropdown({
  moreFilter,
  overflowFilters,
  triggerRef,
  isOpen,
  onOpenChange,
  fullWidth,
}: {
  moreFilter: OrdersFilterOption;
  overflowFilters: OrdersFilterOption[];
  triggerRef: RefObject<HTMLButtonElement | null>;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  fullWidth: boolean;
}) {
  const { open, position, toggle, close } = useFixedDropdown(MORE_PANEL_WIDTH, isOpen, onOpenChange, triggerRef);
  const [selected, setSelected] = useState<Record<string, string | null>>({});

  const groups = [moreFilter, ...overflowFilters];
  const activeCount = Object.values(selected).filter(Boolean).length;

  function selectOption(groupLabel: string, option: string) {
    setSelected((prev) => ({
      ...prev,
      [groupLabel]: prev[groupLabel] === option ? null : option,
    }));
  }

  function handleTriggerPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggle();
  }

  return (
    <div className={cn("relative min-w-0 flex-1", fullWidth && "w-full")}>
      <button
        ref={triggerRef}
        type="button"
        onPointerDown={handleTriggerPointerDown}
        onBlur={() => setTimeout(close, 100)}
        className={cn(
          CHIP_TRIGGER_CLASSES,
          "w-full justify-between",
          activeCount > 0
            ? "border-primary-100 bg-primary-50 text-primary-700"
            : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
        )}
      >
        <span className="flex min-w-0 items-center gap-1.5">
          <span className="truncate">{moreFilter.label}</span>
          {activeCount > 0 && (
            <span className="flex h-4 min-w-4 shrink-0 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-white">
              {activeCount}
            </span>
          )}
        </span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
      </button>

      {open && position && (
        <div
          style={{
            top: position.top,
            bottom: position.bottom,
            left: position.left,
            width: MORE_PANEL_WIDTH,
            maxHeight: position.maxHeight,
          }}
          className="animate-dropdown-in fixed z-50 overflow-y-auto rounded-xl border border-zinc-200 bg-white py-2 shadow-xl"
        >
          {groups.map((group, index) => (
            <div key={group.label} className={cn("px-3 py-2", index > 0 && "border-t border-zinc-100")}>
              <p className="mb-1.5 text-xs font-semibold tracking-wide text-zinc-400 uppercase">{group.label}</p>
              <select
                value={selected[group.label] ?? ""}
                onChange={(event) => selectOption(group.label, event.target.value)}
                className={cn(
                  "w-full rounded-lg border px-2 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-primary-100",
                  selected[group.label]
                    ? "border-primary-100 bg-primary-50 text-primary-700"
                    : "border-zinc-200 bg-white text-zinc-600"
                )}
              >
                <option value="">{group.label}</option>
                {group.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Renders every primary filter off-screen purely to measure each one's natural
// width. Kept outside the visible row so it never overlaps real click targets.
function MeasurementRow({
  primaryFilters,
  moreLabel,
  measureRefs,
  moreMeasureRef,
}: {
  primaryFilters: OrdersFilterOption[];
  moreLabel: string;
  measureRefs: RefObject<(HTMLButtonElement | null)[]>;
  moreMeasureRef: RefObject<HTMLButtonElement | null>;
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed top-0 -left-[10000px] flex gap-3 opacity-0"
    >
      {primaryFilters.map((filter, index) => (
        <button
          key={filter.label}
          ref={(el) => {
            measureRefs.current[index] = el;
          }}
          type="button"
          tabIndex={-1}
          className={cn(CHIP_TRIGGER_CLASSES, "pointer-events-none border-zinc-200 bg-white text-zinc-600")}
        >
          <span className="truncate">{filter.label}</span>
          <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
        </button>
      ))}
      <button
        ref={moreMeasureRef}
        type="button"
        tabIndex={-1}
        className={cn(CHIP_TRIGGER_CLASSES, "pointer-events-none border-zinc-200 bg-white text-zinc-600")}
      >
        <span className="truncate">{moreLabel}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
      </button>
    </div>
  );
}

export function OrdersFilterRow({ filters }: { filters: OrdersFilterOption[] }) {
  // Memoized: `.slice()` returns a new array every render, and this feeds a
  // useLayoutEffect dependency array below. Without memoizing, that effect
  // would think its dependency changed on every render (even when `filters`
  // itself hasn't), tearing down and rebuilding its ResizeObserver every
  // single time — and since ResizeObserver fires an initial callback as soon
  // as `.observe()` is (re-)called, that turns into a self-sustaining loop of
  // effect teardown/setup on every render.
  const primaryFilters = useMemo(() => filters.slice(0, -1), [filters]);
  const moreFilter = filters[filters.length - 1];

  const containerRef = useRef<HTMLDivElement>(null);
  const measureRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const moreMeasureRef = useRef<HTMLButtonElement>(null);
  const moreTriggerRef = useRef<HTMLButtonElement>(null);
  const [visibleCount, setVisibleCount] = useState(primaryFilters.length);

  // Which single dropdown (identified by filter label, or MORE_ID) is open.
  // Owned here rather than by each dropdown individually so opening one
  // always closes whichever other one was open.
  const [openId, setOpenId] = useState<string | null>(null);

  // useLayoutEffect (not useEffect): the initial render assumes every filter
  // fits (matching the server-rendered HTML), then this measures the real
  // available width and corrects visibleCount before the browser paints, so
  // there's never a visible flash of a button appearing then disappearing.
  //
  // Deliberately measures only the OUTER container (`containerRef`), never a
  // child whose own size depends on how many filters we just decided to
  // render into it. Observing a self-influenced element is a classic
  // ResizeObserver feedback-loop trap: render N filters -> child's measured
  // width shifts by a sub-pixel amount -> observer fires again -> recalc
  // picks a different N -> repeat. The container's width is fixed entirely
  // by its ancestors (page/sidebar), never by its own children, so it can't
  // feed back into itself — the last visible filter's width right before
  // "More" is what was actually flickering under the old approach.
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    function recalc(containerWidth: number) {
      const moreWidth = moreMeasureRef.current?.offsetWidth ?? 110;
      const availableWidth = Math.max(0, containerWidth - WIDTH_SAFETY_MARGIN - moreWidth - GAP);

      let total = 0;
      let count = 0;
      for (let i = 0; i < primaryFilters.length; i++) {
        const width = measureRefs.current[i]?.offsetWidth ?? 0;
        const next = total + (count > 0 ? GAP : 0) + width;
        if (next > availableWidth) break;
        total = next;
        count++;
      }

      // On laptop-sized screens, deliberately show fewer than what would
      // physically fit — keeps the row from feeling crowded on those
      // displays even though there'd be room for more. Screens wider than
      // the laptop tier show everything that fits, unrestricted.
      const isLaptopTier = window.innerWidth < LAPTOP_TIER_MAX_WIDTH;
      const cap = isLaptopTier ? LAPTOP_TIER_VISIBLE_COUNT : primaryFilters.length;
      setVisibleCount(Math.min(count, cap));
    }

    const observer = new ResizeObserver((entries) => {
      recalc(entries[0]?.contentRect.width ?? container.clientWidth);
    });
    observer.observe(container);
    recalc(container.clientWidth);

    // Belt-and-suspenders: the laptop-tier cap depends on window.innerWidth,
    // not just the container's own width, so also recompute on a plain
    // window resize in case the two ever fall out of sync.
    const handleWindowResize = () => {
      recalc(container.clientWidth);
    };
    window.addEventListener("resize", handleWindowResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [primaryFilters]);

  const visibleFilters = primaryFilters.slice(0, visibleCount);
  const overflowFilters = primaryFilters.slice(visibleCount);

  return (
    <>
      <MeasurementRow
        primaryFilters={primaryFilters}
        moreLabel={moreFilter?.label ?? ""}
        measureRefs={measureRefs}
        moreMeasureRef={moreMeasureRef}
      />
      <div
        ref={containerRef}
        className="mx-5 mb-4 flex flex-nowrap items-center gap-3 overflow-hidden rounded-xl bg-zinc-50 px-4 py-3"
      >
        {visibleFilters.map((filter) => (
          <FilterTriggerDropdown
            key={filter.label}
            filter={filter}
            isOpen={openId === filter.label}
            onOpenChange={(open) => setOpenId(open ? filter.label : null)}
            variant="chip"
            fill
          />
        ))}
        {moreFilter && (
          <MoreOverflowDropdown
            moreFilter={moreFilter}
            overflowFilters={overflowFilters}
            triggerRef={moreTriggerRef}
            isOpen={openId === MORE_ID}
            onOpenChange={(open) => setOpenId(open ? MORE_ID : null)}
            fullWidth={visibleFilters.length === 0}
          />
        )}
      </div>
    </>
  );
}
