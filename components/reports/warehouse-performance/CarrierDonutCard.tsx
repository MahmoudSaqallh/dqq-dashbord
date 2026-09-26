import { Truck } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function CarrierDonutCard({
  title,
  subtitle,
  value,
  valueLabel,
}: {
  title: string;
  subtitle: string;
  value: number;
  valueLabel: string;
}) {
  const size = 160;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">{title}</p>
          <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
        </div>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary-600">
          <Truck className="h-4 w-4" />
        </span>
      </div>

      <div className="mt-4 flex justify-center">
        <div className="relative" style={{ width: size, height: size }}>
          <svg width={size} height={size} className="-rotate-90">
            <circle
              cx={size / 2}
              cy={size / 2}
              r={radius}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={0}
              className="fill-none stroke-zinc-100"
            />
          </svg>
          <span className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-zinc-900">{value}</span>
            <span className="text-xs text-zinc-400">{valueLabel}</span>
          </span>
        </div>
      </div>
    </Card>
  );
}
