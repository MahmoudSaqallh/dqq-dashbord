"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { ChevronDown } from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils/cn";

export interface FilterOption {
  label: string;
  options: string[];
}

// Plain label + caret, no chip/border framing — filters read as a bare list
// of dropdown labels, not buttons.
export const FILTER_TRIGGER_CLASSES =
  "inline-flex h-10 shrink-0 items-center gap-1.5 whitespace-nowrap text-sm font-medium";

// Bordered white pill — for filter rows that sit on a tinted background band
// and need their own contrasting chip, rather than reading as bare labels.
export const CHIP_TRIGGER_CLASSES =
  "inline-flex h-10 shrink-0 items-center justify-between gap-2 whitespace-nowrap rounded-xl border px-3 text-sm";

const VIEWPORT_MARGIN = 8;

// Shared behavior for every filter trigger button: computes the panel's
// viewport-fixed position from the trigger's own bounding box, so the panel
// always renders on top of the page and is never clipped by a scrollable
// ancestor (e.g. the scrollable main content area), regardless of where the
// trigger sits on the page or how far the page has been scrolled.
//
// The position is "smart": it clamps horizontally so the panel never runs
// past the left/right edge of the viewport, and it flips to open ABOVE the
// trigger (shrinking to whatever room is available) whenever there isn't
// enough space below — critical on short mobile viewports, where a trigger
// near the bottom of the screen would otherwise produce a panel that's
// mostly or entirely rendered outside the visible window.
//
// `isOpen`/`onOpenChange` are owned by the caller rather than local state, so
// a parent row can enforce that only one dropdown across a whole group can
// ever be open at a time — opening one deterministically closes whichever
// was open before, on the same render, regardless of focus/blur timing.
export function useFixedDropdown(
  panelWidth: number,
  isOpen: boolean,
  onOpenChange: (open: boolean) => void,
  externalRef?: RefObject<HTMLButtonElement | null>,
  // "triggerEnd" (default) anchors the panel's logical-end edge to the
  // trigger's logical-end edge, extending toward the start — right for the
  // trigger's own compact filter panels. "triggerStart" instead anchors the
  // panel's logical-start edge to the trigger's start edge, extending toward
  // the end — for panels much wider than their trigger (e.g. the date-range
  // calendar), so the panel reads as growing out of the button instead of
  // overshooting past its far side.
  align: "triggerStart" | "triggerEnd" = "triggerEnd"
) {
  const { dir } = useLanguage();
  const internalRef = useRef<HTMLButtonElement>(null);
  const triggerRef = externalRef ?? internalRef;
  const [position, setPosition] = useState<{
    left: number;
    maxHeight: number;
    top?: number;
    bottom?: number;
  } | null>(null);

  function updatePosition() {
    const button = triggerRef.current;
    if (!button) return;
    const rect = button.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    const anchorEnd = align === "triggerEnd";
    const anchorToRightEdge = dir === "rtl" ? !anchorEnd : anchorEnd;
    let left = anchorToRightEdge ? rect.right - panelWidth : rect.left;
    left = Math.max(VIEWPORT_MARGIN, Math.min(left, viewportWidth - panelWidth - VIEWPORT_MARGIN));

    const spaceBelow = viewportHeight - rect.bottom - VIEWPORT_MARGIN;
    const spaceAbove = rect.top - VIEWPORT_MARGIN;
    const openBelow = spaceBelow >= 160 || spaceBelow >= spaceAbove;

    if (openBelow) {
      setPosition({ left, top: rect.bottom + VIEWPORT_MARGIN, maxHeight: Math.max(120, spaceBelow) });
    } else {
      // Not enough room below (common on short mobile viewports) — anchor to
      // the trigger's top edge via `bottom` so the panel grows upward from
      // there, whatever its actual content height turns out to be.
      setPosition({
        left,
        bottom: viewportHeight - rect.top + VIEWPORT_MARGIN,
        maxHeight: Math.max(120, spaceAbove),
      });
    }
  }

  function toggle() {
    if (!isOpen) updatePosition();
    onOpenChange(!isOpen);
  }

  function close() {
    onOpenChange(false);
  }

  useEffect(() => {
    if (!isOpen) return;
    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);
    return () => {
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return { triggerRef, open: isOpen, position, toggle, close };
}

const FILTER_PANEL_WIDTH = 192; // matches w-48

export function FilterTriggerDropdown({
  filter,
  isOpen,
  onOpenChange,
  variant = "plain",
  fill = false,
}: {
  filter: FilterOption;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  variant?: "plain" | "chip";
  fill?: boolean;
}) {
  const { triggerRef, open, position, toggle, close } = useFixedDropdown(FILTER_PANEL_WIDTH, isOpen, onOpenChange);
  const [selected, setSelected] = useState<string | null>(null);

  function handleTriggerPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    toggle();
  }

  return (
    <div className={cn("relative", fill ? "min-w-0 flex-1" : "shrink-0")}>
      <button
        ref={triggerRef}
        type="button"
        onPointerDown={handleTriggerPointerDown}
        onBlur={() => setTimeout(close, 100)}
        className={cn(
          variant === "chip" ? CHIP_TRIGGER_CLASSES : FILTER_TRIGGER_CLASSES,
          fill && "w-full justify-between",
          variant === "chip"
            ? selected
              ? "border-primary-100 bg-primary-50 text-primary-700"
              : "border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50"
            : cn("transition-colors hover:text-zinc-900", selected ? "text-primary-700" : "text-zinc-700")
        )}
      >
        <span className="truncate">{selected ?? filter.label}</span>
        <ChevronDown className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
      </button>
      {open && position && (
        <div
          style={{
            top: position.top,
            bottom: position.bottom,
            left: position.left,
            width: FILTER_PANEL_WIDTH,
            maxHeight: position.maxHeight,
          }}
          className="animate-dropdown-in fixed z-50 overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-xl"
        >
          <p className="px-3 pt-1.5 pb-1.5 text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            {filter.label}
          </p>
          <div className="border-t border-zinc-100 pt-1">
            {filter.options.map((option) => (
              <button
                key={option}
                type="button"
                onMouseDown={() => {
                  setSelected((current) => (current === option ? null : option));
                  close();
                }}
                className={cn(
                  "flex w-full items-center px-3 py-2 text-start text-sm hover:bg-zinc-50",
                  selected === option ? "font-medium text-primary" : "text-zinc-600"
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
