"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface RestrictionGroup {
  id: string;
  label: string;
  options: { value: string; label: string }[];
}

export function RestrictionSelect({
  value,
  onChange,
  groups,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  groups: RestrictionGroup[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const [openGroupId, setOpenGroupId] = useState<string | null>(groups[0]?.id ?? null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const selectedLabel = groups.flatMap((group) => group.options).find((option) => option.value === value)?.label;

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white ps-3 pe-3 text-sm text-zinc-700 focus:ring-2 focus:ring-primary-100 focus:outline-none"
      >
        <span className={cn("truncate", !selectedLabel && "text-zinc-400")}>{selectedLabel ?? placeholder}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-zinc-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="animate-dropdown-in absolute inset-s-0 top-full z-20 mt-1.5 max-h-80 w-full min-w-[240px] overflow-y-auto rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
          {groups.map((group) => {
            const isGroupOpen = openGroupId === group.id;
            return (
              <div key={group.id} className="border-b border-zinc-100 last:border-b-0">
                <button
                  type="button"
                  onClick={() => setOpenGroupId(isGroupOpen ? null : group.id)}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-start text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
                >
                  {group.label}
                  {isGroupOpen ? (
                    <ChevronUp className="h-3.5 w-3.5 text-zinc-400" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
                  )}
                </button>

                {isGroupOpen && (
                  <div className="pb-2">
                    {group.options.map((option) => {
                      const isSelected = value === option.value;
                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => {
                            onChange(option.value);
                            setOpen(false);
                          }}
                          className="flex w-full items-center gap-2.5 px-5 py-2 text-start text-sm hover:bg-zinc-50"
                        >
                          <span
                            className={cn(
                              "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2",
                              isSelected ? "border-primary" : "border-zinc-300"
                            )}
                          >
                            {isSelected && <span className="h-2 w-2 rounded-full bg-primary" />}
                          </span>
                          <span className={cn(isSelected ? "font-medium text-zinc-900" : "text-zinc-600")}>{option.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
