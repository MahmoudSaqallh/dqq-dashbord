import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";
import type { StatusTone } from "@/lib/utils/status-colors";

const DOT_COLOR: Record<StatusTone, string> = {
  info: "bg-info",
  success: "bg-primary",
  warning: "bg-warning",
  danger: "bg-danger",
  maroon: "bg-maroon",
  neutral: "bg-neutral",
};

export interface RepairSummaryItem {
  id: string;
  label: string;
  count: number;
  tone: StatusTone;
}

function SummaryItem({ item, withDivider }: { item: RepairSummaryItem; withDivider: boolean }) {
  return (
    <div dir="ltr" className="relative min-w-0">
      <p className="text-2xl font-bold text-zinc-900">{item.count}</p>
      <p className="mt-1 flex items-center gap-1.5 text-xs whitespace-nowrap text-zinc-500">
        <span className={cn("h-2 w-2 shrink-0 rounded-[30%]", DOT_COLOR[item.tone])} />
        {item.label}
      </p>
      {withDivider && (
        <span className="absolute inset-e-3 top-1/2 hidden h-10 w-px -translate-y-1/2 bg-zinc-300 sm:block" />
      )}
    </div>
  );
}

export function RepairSummaryBar({
  allTicketsLabel,
  total,
  items,
}: {
  allTicketsLabel: string;
  total: number;
  items: RepairSummaryItem[];
}) {
  return (
    <Card className="overflow-hidden p-0">
      <div className="flex items-center gap-2.5 bg-primary-50 px-5 py-3">
        <p className="text-[15px] text-zinc-600">
          {allTicketsLabel} : <span className="font-bold text-zinc-900">{total}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-5 px-5 py-4 sm:grid-cols-4">
        {items.map((item, index) => (
          <SummaryItem key={item.id} item={item} withDivider={index < items.length - 1} />
        ))}
      </div>
    </Card>
  );
}
