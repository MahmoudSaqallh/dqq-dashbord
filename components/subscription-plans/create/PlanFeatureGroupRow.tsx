"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { PlanFeatureGroup } from "@/lib/mock/plan-feature-groups";
import { PlanFeatureRow } from "./PlanFeatureRow";

export function PlanFeatureGroupRow({
  group,
  selected,
  onToggleFeature,
  onToggleGroup,
  quantities,
  onQuantityChange,
  enforcements,
  onEnforcementChange,
  visibility,
  onVisibleToggle,
  defaultExpanded = false,
}: {
  group: PlanFeatureGroup;
  selected: Record<string, boolean>;
  onToggleFeature: (featureId: string, checked: boolean) => void;
  onToggleGroup: (groupId: string, checked: boolean) => void;
  quantities: Record<string, string>;
  onQuantityChange: (featureId: string, value: string) => void;
  enforcements: Record<string, string>;
  onEnforcementChange: (featureId: string, value: string) => void;
  visibility: Record<string, boolean>;
  onVisibleToggle: (featureId: string, checked: boolean) => void;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const enabledCount = group.features.filter((feature) => selected[feature.id]).length;
  const total = group.features.length;
  const anyEnabled = enabledCount > 0;

  return (
    <div className="border-b border-zinc-100 py-4 last:border-0">
      <div className="flex w-full items-center gap-3">
        <input
          type="checkbox"
          checked={anyEnabled}
          onChange={(event) => onToggleGroup(group.id, event.target.checked)}
          className="h-4 w-4 shrink-0 rounded border-zinc-300 accent-primary"
        />
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", group.iconBg, group.iconColor)}>
          <group.icon className="h-4 w-4" />
        </span>
        <button
          type="button"
          onClick={() => setExpanded((value) => !value)}
          className="flex flex-1 items-center gap-3 text-start"
        >
          <span className="flex-1">
            <span className={cn("block text-sm font-semibold", anyEnabled ? "text-primary-700" : "text-zinc-800")}>
              {group.name}
            </span>
            <span className="block text-xs text-zinc-400">{group.description}</span>
          </span>
          <span
            className={cn(
              "shrink-0 rounded-pill px-3 py-1 text-xs font-semibold whitespace-nowrap",
              anyEnabled ? "bg-primary text-white" : "bg-zinc-100 text-zinc-500"
            )}
          >
            {enabledCount}/{total} Enabled
          </span>
          {expanded ? (
            <ChevronUp className="h-4 w-4 shrink-0 text-zinc-400" />
          ) : (
            <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400" />
          )}
        </button>
      </div>

      {expanded && (
        <div className="mt-3 ms-12 space-y-2">
          {group.features.map((feature) => (
            <PlanFeatureRow
              key={feature.id}
              feature={feature}
              checked={!!selected[feature.id]}
              onToggle={(checked) => onToggleFeature(feature.id, checked)}
              quantity={quantities[feature.id] ?? ""}
              onQuantityChange={(value) => onQuantityChange(feature.id, value)}
              enforcement={enforcements[feature.id] ?? ""}
              onEnforcementChange={(value) => onEnforcementChange(feature.id, value)}
              visibleToCustomers={visibility[feature.id] ?? true}
              onVisibleToggle={(checked) => onVisibleToggle(feature.id, checked)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
