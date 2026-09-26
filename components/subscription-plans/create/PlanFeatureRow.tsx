"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";
import { SelectDropdown } from "@/components/ui/SelectDropdown";
import type { PlanFeatureOption } from "@/lib/mock/plan-feature-groups";

const ENFORCEMENT_OPTIONS = [
  { value: "hard_limit", label: "Hard limit" },
  { value: "soft_limit", label: "Soft limit" },
];

const TAG_TONE_CLASSES: Record<string, string> = {
  metered: "bg-info-bg text-info",
  addon: "bg-violet-50 text-violet-600",
  neutral: "bg-zinc-100 text-zinc-500",
  warning: "bg-danger-bg text-danger",
};

const FIELD_INPUT_CLASSES =
  "h-9 w-full rounded-lg border border-zinc-200 px-3 text-sm text-zinc-700 placeholder:text-zinc-400 focus:ring-2 focus:ring-primary-100 focus:outline-none";

export function PlanFeatureRow({
  feature,
  checked,
  onToggle,
  quantity,
  onQuantityChange,
  enforcement,
  onEnforcementChange,
  visibleToCustomers,
  onVisibleToggle,
}: {
  feature: PlanFeatureOption;
  checked: boolean;
  onToggle: (checked: boolean) => void;
  quantity: string;
  onQuantityChange: (value: string) => void;
  enforcement: string;
  onEnforcementChange: (value: string) => void;
  visibleToCustomers: boolean;
  onVisibleToggle: (checked: boolean) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3",
        checked ? "border-primary-100 bg-primary-50/40" : "border-zinc-100"
      )}
    >
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={checked}
          onChange={(event) => onToggle(event.target.checked)}
          className="h-4 w-4 shrink-0 rounded border-zinc-300 accent-primary"
        />
        <div className="flex flex-1 flex-wrap items-center gap-2">
          <span className={cn("text-sm font-medium", checked ? "text-primary-700" : "text-zinc-800")}>
            {feature.name}
          </span>
          {feature.tags?.map((tag) => (
            <span
              key={tag.label}
              className={cn(
                "rounded-md px-1.5 py-0.5 text-[10px] font-semibold whitespace-nowrap",
                TAG_TONE_CLASSES[tag.tone]
              )}
            >
              {tag.label}
            </span>
          ))}
        </div>
        {feature.metered && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-label="Toggle configuration"
            className="shrink-0 text-zinc-400 hover:text-zinc-600"
          >
            {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </button>
        )}
      </div>

      {feature.description && <p className="mt-1 ps-7 text-xs text-zinc-400">{feature.description}</p>}

      {feature.metered && expanded && (
        <div className="mt-3 ms-7 rounded-xl border border-zinc-100 bg-white p-3">
          <label className="text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Included Quantity ({feature.tags?.find((tag) => tag.tone === "neutral")?.label ?? "unit"})
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(event) => onQuantityChange(event.target.value)}
            className={cn(FIELD_INPUT_CLASSES, "mt-1")}
          />

          <label className="mt-3 block text-xs font-semibold tracking-wide text-zinc-400 uppercase">
            Enforcement
          </label>
          <div className="mt-1">
            <SelectDropdown
              value={enforcement}
              onChange={onEnforcementChange}
              options={ENFORCEMENT_OPTIONS}
              placeholder="Select enforcement"
            />
          </div>

          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-zinc-600">Visible to customers</span>
            <ToggleSwitch checked={visibleToCustomers} onChange={onVisibleToggle} />
          </div>
        </div>
      )}
    </div>
  );
}
