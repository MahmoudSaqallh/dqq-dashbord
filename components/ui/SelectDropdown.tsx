"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export interface SelectDropdownOption {
  value: string;
  label: string;
}

export function SelectDropdown({
  value,
  onChange,
  options,
  placeholder,
  triggerClassName,
}: {
  value: string;
  onChange: (value: string) => void;
  options: SelectDropdownOption[];
  placeholder?: string;
  triggerClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  const selectedOption = options.find((option) => option.value === value);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-10 w-full items-center justify-between gap-2 rounded-xl border ps-3 pe-3 text-sm focus:ring-2 focus:ring-primary-100 focus:outline-none",
          triggerClassName ?? "border-zinc-200 text-zinc-700"
        )}
      >
        <span className={cn("truncate", !selectedOption && "text-zinc-400")}>{selectedOption?.label ?? placeholder}</span>
        <ChevronDown className={cn("h-4 w-4 shrink-0 text-zinc-400 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="animate-dropdown-in absolute inset-s-0 top-full z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center px-3 py-2 text-start text-sm hover:bg-zinc-50",
                option.value === value ? "font-medium text-primary" : "text-zinc-600"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
