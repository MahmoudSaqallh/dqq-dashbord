"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarRange, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useFixedDropdown } from "@/components/shared/FilterTriggerDropdown";
import { cn } from "@/lib/utils/cn";

export type DateRangePresetKey =
  | "allDays"
  | "today"
  | "yesterday"
  | "last7Days"
  | "thisWeek"
  | "thisMonth"
  | "last30Days"
  | "thisYear";

const PRESET_ORDER: DateRangePresetKey[] = [
  "allDays",
  "today",
  "yesterday",
  "last7Days",
  "thisWeek",
  "thisMonth",
  "last30Days",
  "thisYear",
];

// Fixed reference "today" so every preset lines up with the rest of this
// mock app's data, which is all dated around late July 2026 — matching the
// design reference's own start/end values for "This Year" (01/01/2026 —
// 29/07/2026) exactly.
const REFERENCE_TODAY = new Date(2026, 6, 29);

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAY_LABELS = ["Su", "M", "T", "W", "T", "F", "S"];

function startOfDay(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function addDays(date: Date, days: number) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}
function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function isBefore(a: Date, b: Date) {
  return startOfDay(a).getTime() < startOfDay(b).getTime();
}

function presetRange(preset: DateRangePresetKey): { start: Date; end: Date } {
  const today = startOfDay(REFERENCE_TODAY);
  switch (preset) {
    case "today":
      return { start: today, end: today };
    case "yesterday": {
      const y = addDays(today, -1);
      return { start: y, end: y };
    }
    case "last7Days":
      return { start: addDays(today, -6), end: today };
    case "thisWeek":
      return { start: addDays(today, -today.getDay()), end: today };
    case "thisMonth":
      return { start: new Date(today.getFullYear(), today.getMonth(), 1), end: today };
    case "last30Days":
      return { start: addDays(today, -29), end: today };
    case "thisYear":
      return { start: new Date(today.getFullYear(), 0, 1), end: today };
    case "allDays":
    default:
      return { start: new Date(2020, 0, 1), end: today };
  }
}

function formatSlash(date: Date) {
  const d = String(date.getDate()).padStart(2, "0");
  const m = String(date.getMonth() + 1).padStart(2, "0");
  return `${d}/${m}/${date.getFullYear()}`;
}

function formatShort(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function buildMonthGrid(year: number, month: number) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  const cells: { date: Date; inMonth: boolean }[] = [];
  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, daysInPrevMonth - i), inMonth: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), inMonth: true });
  }
  let trailing = 1;
  while (cells.length < 42) {
    cells.push({ date: new Date(year, month + 1, trailing), inMonth: false });
    trailing++;
  }
  return cells;
}

const PANEL_WIDTH = 336;

export function DateRangeDropdown({
  presetLabels,
  cancelLabel,
  applyLabel,
  defaultPreset = "thisYear",
}: {
  presetLabels: Record<DateRangePresetKey, string>;
  cancelLabel: string;
  applyLabel: string;
  defaultPreset?: DateRangePresetKey;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { triggerRef, open, position, toggle, close } = useFixedDropdown(
    PANEL_WIDTH,
    isOpen,
    setIsOpen,
    undefined,
    "triggerStart"
  );
  const panelRef = useRef<HTMLDivElement>(null);

  const [appliedPreset, setAppliedPreset] = useState<DateRangePresetKey>(defaultPreset);
  const [appliedRange, setAppliedRange] = useState(() => presetRange(defaultPreset));

  const [draftPreset, setDraftPreset] = useState<DateRangePresetKey | null>(appliedPreset);
  const [draftRange, setDraftRange] = useState(appliedRange);
  const [selecting, setSelecting] = useState(false);
  const [viewYear, setViewYear] = useState(appliedRange.start.getFullYear());
  const [viewMonth, setViewMonth] = useState(appliedRange.start.getMonth());

  // Clicking anywhere outside the trigger/panel behaves like Cancel: revert
  // the draft and close, rather than silently keeping an unapplied edit.
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (panelRef.current?.contains(target) || triggerRef.current?.contains(target)) return;
      handleCancel();
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function handleTriggerPointerDown(event: React.PointerEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (open) {
      handleCancel();
    } else {
      toggle();
    }
  }

  function selectPreset(preset: DateRangePresetKey) {
    const range = presetRange(preset);
    setDraftPreset(preset);
    setDraftRange(range);
    setSelecting(false);
    setViewYear(range.start.getFullYear());
    setViewMonth(range.start.getMonth());
  }

  function selectDay(date: Date) {
    setDraftPreset(null);
    if (!selecting) {
      setDraftRange({ start: date, end: date });
      setSelecting(true);
    } else {
      setDraftRange((current) =>
        isBefore(date, current.start) ? { start: date, end: current.start } : { start: current.start, end: date }
      );
      setSelecting(false);
    }
  }

  function goPrevMonth() {
    setViewMonth((month) => {
      if (month === 0) {
        setViewYear((year) => year - 1);
        return 11;
      }
      return month - 1;
    });
  }

  function goNextMonth() {
    setViewMonth((month) => {
      if (month === 11) {
        setViewYear((year) => year + 1);
        return 0;
      }
      return month + 1;
    });
  }

  function handleCancel() {
    setDraftPreset(appliedPreset);
    setDraftRange(appliedRange);
    setSelecting(false);
    setViewYear(appliedRange.start.getFullYear());
    setViewMonth(appliedRange.start.getMonth());
    close();
  }

  function handleApply() {
    setAppliedPreset(draftPreset ?? "thisYear");
    setAppliedRange(draftRange);
    setSelecting(false);
    close();
  }

  const grid = buildMonthGrid(viewYear, viewMonth);

  return (
    <div className="relative min-w-0">
      <button
        ref={triggerRef}
        type="button"
        onPointerDown={handleTriggerPointerDown}
        className="inline-flex h-10 min-w-0 items-center gap-2 rounded-[10px] border border-zinc-200 bg-white px-3 text-sm text-zinc-600"
      >
        <CalendarRange className="h-4 w-4 shrink-0 text-primary" />
        <span className="shrink-0 font-medium text-zinc-700">{presetLabels[appliedPreset]}</span>
        <span className="shrink-0 text-zinc-300">|</span>
        <span dir="ltr" className="min-w-0 truncate text-zinc-500">
          {formatShort(appliedRange.start)} — {formatShort(appliedRange.end)}
        </span>
        <ChevronDown className={cn("h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && position && (
        <div
          ref={panelRef}
          style={{
            top: position.top,
            bottom: position.bottom,
            left: position.left,
            width: PANEL_WIDTH,
            maxHeight: position.maxHeight,
          }}
          className="animate-dropdown-in fixed z-50 flex flex-col overflow-auto rounded-xl border border-zinc-200 bg-white shadow-xl"
        >
          <div className="flex">
          <div className="w-28 shrink-0 space-y-0.5 border-e border-zinc-100 p-3 ">
            {PRESET_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => selectPreset(key)}
                className={cn(
                  "block w-full rounded-md px-2 py-1.5 text-start text-xs whitespace-nowrap",
                  draftPreset === key ? "bg-primary-50 font-medium text-primary-700" : "text-zinc-600 hover:bg-zinc-50"
                )}
              >
                {presetLabels[key]}
              </button>
            ))}
          </div>

          <div className="flex min-w-0 flex-1 flex-col p-3">
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrevMonth}
                aria-label="Previous month"
                className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
              >
                <ChevronLeft className="h-3.5 w-3.5" />
              </button>
              <span className="text-xs font-semibold text-zinc-800">
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button
                type="button"
                onClick={goNextMonth}
                aria-label="Next month"
                className="rounded-full p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
              >
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-7 text-center text-[10px] text-zinc-400">
              {WEEKDAY_LABELS.map((label, index) => (
                <span key={index} className="py-0.5">
                  {label}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7">
              {grid.map(({ date, inMonth }) => {
                const inRange = date >= draftRange.start && date <= draftRange.end;
                const isStart = isSameDay(date, draftRange.start);
                const isEnd = isSameDay(date, draftRange.end);
                return (
                  <div
                    key={date.toISOString()}
                    className={cn(
                      "flex items-center justify-center py-px",
                      inRange && "bg-primary-50",
                      inRange && isStart && "rounded-s-full",
                      inRange && isEnd && "rounded-e-full"
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => selectDay(date)}
                      className={cn(
                        "flex h-6 w-6 items-center justify-center rounded-[5px] text-[11px] transition-colors",
                        !inMonth && !inRange && "text-zinc-300",
                        !inMonth && inRange && "text-zinc-400",
                        inMonth && !inRange && "text-zinc-700 hover:bg-zinc-100",
                        inMonth && inRange && !isStart && !isEnd && "text-zinc-700",
                        (isStart || isEnd) && "bg-primary font-semibold text-white"
                      )}
                    >
                      {date.getDate()}
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="mt-2 flex items-center gap-1.5 pt-5">
              <input
                dir="ltr"
                readOnly
                value={formatSlash(draftRange.start)}
                className="h-7 min-w-0 flex-1 rounded-md border border-zinc-200 px-2 text-[11px] text-zinc-600"
              />
             
              <input
                dir="ltr"
                readOnly
                value={formatSlash(draftRange.end)}
                className="h-7 min-w-0 flex-1 rounded-md border border-zinc-200 px-2 text-[11px] text-zinc-600"
              />
            </div>
          </div>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 border-t border-zinc-100 px-3 pt-3 pb-3">
            <button
              type="button"
              onClick={handleCancel}
              className="rounded-md border border-zinc-200 bg-zinc-200 px-3 py-1.5 text-xs text-black hover:bg-zinc-200"
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={handleApply}
              className="rounded-md bg-primary px-5 py-2 text-xs font-medium text-white hover:bg-primary-600"
            >
              {applyLabel}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
