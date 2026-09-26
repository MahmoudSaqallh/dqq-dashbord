"use client";

import { Check, Eye, Pencil, EyeOff, Trash2, MoreVertical, Users } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { PlanItem } from "@/lib/mock/types";

export function PlanCard({
  plan,
  publishedLabel,
  cycleLabel,
  subscribedLabel,
  moreLabel,
  viewLabel,
  editLabel,
  unpublishLabel,
  deleteLabel,
  isOpen,
  onOpenChange,
}: {
  plan: PlanItem;
  publishedLabel: string;
  cycleLabel: string;
  subscribedLabel: string;
  moreLabel: string;
  viewLabel: string;
  editLabel: string;
  unpublishLabel: string;
  deleteLabel: string;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-zinc-100 bg-white p-5 ">
      
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium text-primary-600">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          {publishedLabel}
        </span>
        <span className="rounded-md bg-info-bg px-4 py-2 text-[10px] font-semibold text-info">{cycleLabel}</span>
      </div>

      <h3 className="my-3 text-base font-semibold text-zinc-900">{plan.name}</h3>

      <div dir="ltr" className="flex items-baseline gap-1 py-2">
        <span className="text-5xl font-bold text-zinc-900">{plan.price.toFixed(2)}</span>
        <span className="text-xs text-zinc-400">SAR</span>
        <span className="text-xs text-zinc-400">{plan.durationLabel}</span>
      </div>

      {plan.originalPrice && plan.discountLabel && (
        <div dir="ltr" className="mt-1 flex items-center gap-2">
          <span className="text-sm text-zinc-400 line-through">{plan.originalPrice.toFixed(2)} SAR</span>
          <span className="rounded-md bg-primary-50 px-1.5 py-5 text-[10px] font-semibold text-primary-700">
            {plan.discountLabel}
          </span>
        </div>
      )}

      <div className="mt-3 flex-1 border-t border-zinc-100 pt-3">
        <ul className="space-y-4 pt-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-zinc-600">
              <Check className="h-4 w-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        {plan.moreCount && (
          <button type="button" className="mt-2 text-sm font-medium text-primary-600 hover:underline">
            +{plan.moreCount} {moreLabel}
          </button>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
        <span className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Users className="h-3.5 w-3.5" />
          {plan.subscribedCount} {subscribedLabel}
        </span>

        <div className="relative">
          <button
            type="button"
            onClick={() => onOpenChange(!isOpen)}
            onBlur={() => setTimeout(() => onOpenChange(false), 100)}
            aria-label={viewLabel}
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-[30%] border text-zinc-500 transition-colors hover:bg-zinc-50",
              isOpen ? "border-primary-200 bg-primary-50 text-primary-600" : "border-zinc-200 bg-white"
            )}
          >
            <MoreVertical className="h-4 w-4" />
          </button>

          {isOpen && (
            <div className="animate-dropdown-in absolute inset-e-0 bottom-full z-30 mb-2 w-40 overflow-hidden rounded-xl border border-zinc-200 bg-white py-1 shadow-lg">
              <button
                type="button"
                onMouseDown={() => onOpenChange(false)}
                className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
              >
                <Eye className="h-4 w-4" />
                {viewLabel}
              </button>
              <button
                type="button"
                onMouseDown={() => onOpenChange(false)}
                className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
              >
                <Pencil className="h-4 w-4" />
                {editLabel}
              </button>
              <button
                type="button"
                onMouseDown={() => onOpenChange(false)}
                className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm text-zinc-600 hover:bg-zinc-50"
              >
                <EyeOff className="h-4 w-4" />
                {unpublishLabel}
              </button>
              <button
                type="button"
                onMouseDown={() => onOpenChange(false)}
                className="flex w-full items-center gap-2 px-3 py-2 text-start text-sm text-danger hover:bg-danger-bg"
              >
                <Trash2 className="h-4 w-4" />
                {deleteLabel}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
