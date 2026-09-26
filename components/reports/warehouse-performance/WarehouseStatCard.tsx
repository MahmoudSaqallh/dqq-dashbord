import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";

export function WarehouseStatCard({
  icon: Icon,
  title,
  value,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle?: string;
}) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold text-zinc-700">{title}</p>
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-400">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <p className="mt-2 text-2xl font-bold text-zinc-900">{value}</p>
      {subtitle && <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>}
    </Card>
  );
}
