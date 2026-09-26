import type { PurchaseOrderStatsSummary } from "@/lib/mock/types";

function StatCell({ value, label, isLast }: { value: number; label: string; isLast?: boolean }) {
  return (
    <div className="relative flex flex-1 flex-col gap-1 px-4 py-4">
      <p className="text-lg font-semibold text-zinc-900">{value}</p>
      <p className="whitespace-nowrap text-xs text-zinc-400">{label}</p>
      {!isLast && <span className="absolute inset-e-0 top-1/2 h-6 w-px -translate-y-1/2 bg-zinc-200" />}
    </div>
  );
}

export function PurchaseOrdersStatsBar({
  stats,
  labels,
}: {
  stats: PurchaseOrderStatsSummary;
  labels: {
    suggested: string;
    draft: string;
    submitted: string;
    approved: string;
    ordered: string;
    partiallyReceived: string;
    received: string;
    closed: string;
    cancelled: string;
  };
}) {
  return (
    <div className="scrollbar-none flex flex-nowrap items-stretch overflow-x-auto border-t border-zinc-200 px-1">
      <StatCell value={stats.suggested} label={labels.suggested} />
      <StatCell value={stats.draft} label={labels.draft} />
      <StatCell value={stats.submitted} label={labels.submitted} />
      <StatCell value={stats.approved} label={labels.approved} />
      <StatCell value={stats.ordered} label={labels.ordered} />
      <StatCell value={stats.partiallyReceived} label={labels.partiallyReceived} />
      <StatCell value={stats.received} label={labels.received} />
      <StatCell value={stats.closed} label={labels.closed} />
      <StatCell value={stats.cancelled} label={labels.cancelled} isLast />
    </div>
  );
}
