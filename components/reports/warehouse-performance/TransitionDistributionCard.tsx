import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils/cn";

export interface TransitionDistributionItem {
  id: string;
  label: string;
  dotClassName: string;
  count: number;
}

export function TransitionDistributionCard({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle: string;
  items: TransitionDistributionItem[];
}) {
  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-zinc-900">{title}</p>
          <p className="mt-1 text-xs text-zinc-400">{subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {items.map((item) => (
            <span key={item.id} className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", item.dotClassName)} />
              {item.label}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="rounded-xl border border-zinc-100 bg-zinc-50 px-4 py-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500">
              <span className={cn("h-2 w-2 shrink-0 rounded-full", item.dotClassName)} />
              {item.label}
            </span>
            <p className="mt-1.5 text-xl font-bold text-zinc-900">{item.count}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
