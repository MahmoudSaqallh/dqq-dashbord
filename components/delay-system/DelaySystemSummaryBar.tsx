"use client";

import { useState } from "react";
import { TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SelectDropdown, type SelectDropdownOption } from "@/components/ui/SelectDropdown";
import { DateRangeDropdown, type DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { DelayStatCard } from "./DelayStatCard";
import type { DelaySystemStat } from "@/lib/mock/types";

export function DelaySystemSummaryBar({
  totalOrdersLabel,
  totalOrders,
  totalOrdersDeltaCount,
  totalOrdersDeltaPercent,
  ordersUnit,
  warehousePlaceholder,
  warehouseOptions,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  stats,
}: {
  totalOrdersLabel: string;
  totalOrders: number;
  totalOrdersDeltaCount: number;
  totalOrdersDeltaPercent: number;
  ordersUnit: string;
  warehousePlaceholder: string;
  warehouseOptions: SelectDropdownOption[];
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  stats: DelaySystemStat[];
}) {
  const [warehouse, setWarehouse] = useState("");

  return (
    <Card className="overflow-hidden p-0">
      <div className="flex flex-wrap items-center justify-between gap-3 bg-primary-50 px-5 py-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <p className="text-xl text-zinc-900">
            <span className="font-bold">{totalOrdersLabel} :</span> {totalOrders}
          </p>
          <span dir="ltr" className="inline-flex items-center gap-1 text-sm font-medium text-primary-500">
            <TrendingUp className="h-4 w-4 text-primary-500" />
            {totalOrdersDeltaCount} {ordersUnit} / {totalOrdersDeltaPercent}%
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="w-40">
            <SelectDropdown
              value={warehouse}
              onChange={setWarehouse}
              options={warehouseOptions}
              placeholder={warehousePlaceholder}
              triggerClassName="border-zinc-400 bg-white text-zinc-800"
            />
          </div>
          <DateRangeDropdown
            presetLabels={dateRangePresetLabels}
            cancelLabel={dateRangeCancelLabel}
            applyLabel={dateRangeApplyLabel}
            defaultPreset="last7Days"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 px-5 py-5 lg:grid-cols-3">
        {stats.map((stat) => (
          <DelayStatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </Card>
  );
}
