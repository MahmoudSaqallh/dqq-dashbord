import { Clock, Package, PackageCheck, TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import { CircularGauge } from "./CircularGauge";
import type { DelaySystemStat, DelaySystemStatIcon } from "@/lib/mock/types";

const ICONS: Record<DelaySystemStatIcon, typeof Clock> = {
  clock: Clock,
  package: Package,
  packageCheck: PackageCheck,
};

export function DelayStatCard({ stat }: { stat: DelaySystemStat }) {
  const Icon = ICONS[stat.icon];
  const gaugeSize = 60;

  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-zinc-300 px-3 py-3">
      <div className="flex  gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 relative top-2.5 ">
          <Icon className="h-4 w-4" />
        </span>
        <div>
          <p dir="ltr" className="flex flex-wrap items-baseline gap-1.5">
            <span className="text-2xl font-bold text-zinc-900">{stat.value}</span>
            <span className="text-sm text-zinc-500">{stat.unit}</span>
            <span
              className={cn(
                "inline-flex items-center gap-0.5 text-xs font-medium",
                stat.deltaUp ? "text-primary-600" : "text-danger"
              )}
            >
              {stat.deltaUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {stat.deltaValue} {stat.unit}
            </span>
          </p>
          <p className="mt-3.5 text-xs text-black">{stat.label}</p>
        </div>
      </div>

      <CircularGauge percent={stat.percent} size={gaugeSize} />
    </div>
  );
}
