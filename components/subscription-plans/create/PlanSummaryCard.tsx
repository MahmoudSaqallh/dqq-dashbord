"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { ToggleSwitch } from "@/components/ui/ToggleSwitch";

function formatCurrency(amount: number) {
  return `${amount.toFixed(2)} SAR`;
}

export function PlanSummaryCard({
  billingCycleLabel,
  vatRatePercentLabel,
  vatEnabled,
  onVatToggle,
  subtotal,
  vatAmount,
  total,
}: {
  billingCycleLabel: string;
  vatRatePercentLabel: string;
  vatEnabled: boolean;
  onVatToggle: (checked: boolean) => void;
  subtotal: number;
  vatAmount: number;
  total: number;
}) {
  const [advancedOpen, setAdvancedOpen] = useState(false);

  return (
    <div className="flex h-fit flex-col gap-4 rounded-card border border-zinc-200 bg-white p-5 shadow-md">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-zinc-900">Plan Summary</h2>
        <span className="text-xs text-zinc-400">Updates instantly with any change</span>
      </div>
      <div className="border-t border-zinc-200" />

      <div className="flex items-center justify-between text-sm">
        <span className="text-zinc-500">Subtotal (excl. VAT)</span>
        <span dir="ltr" className="font-semibold text-zinc-900">
          {formatCurrency(subtotal)}
        </span>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-zinc-500">VAT ({vatRatePercentLabel})</span>
          <ToggleSwitch checked={vatEnabled} onChange={onVatToggle} size="sm" />
        </div>
        <span dir="ltr" className="font-semibold text-zinc-900">
          {formatCurrency(vatAmount)}
        </span>
      </div>
      <div className="border-t border-zinc-200" />

      <button
        type="button"
        onClick={() => setAdvancedOpen((value) => !value)}
        className="flex items-center justify-between rounded-lg border border-zinc-100 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50"
      >
        Advanced Pricing
        <ChevronDown className={cn("h-4 w-4 transition-transform", advancedOpen && "rotate-180")} />
      </button>
      {advancedOpen && (
        <div className="rounded-lg bg-zinc-50 p-3 text-xs text-zinc-500">
          Proration, trial periods and setup fees aren&apos;t configured yet.
        </div>
      )}

      <div className="rounded-xl bg-primary-50 p-4 text-center">
        <p className="text-xs text-zinc-500">Customer Total</p>
        <p dir="ltr" className="mt-1 text-3xl font-bold text-zinc-900">
          {formatCurrency(total)}
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          {billingCycleLabel} · excl. {vatRatePercentLabel} VAT
        </p>
      </div>
    </div>
  );
}
