import { FolderOpen, Clock, PackageCheck } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CountBadge } from "./CountBadge";
import { EmptyStatePanel } from "./EmptyStatePanel";

export function ShippingCompaniesPanel({
  title,
  companiesCount,
  shippedOrdersLabel,
  shippedOrdersCount,
  noDataLabel,
}: {
  title: string;
  companiesCount: number;
  shippedOrdersLabel: string;
  shippedOrdersCount: number;
  noDataLabel: string;
}) {
  return (
    <Card className="px-5 py-5">
      <div className="flex items-center">
        <div className="flex items-center gap-2 ps-1 xl:w-4/5 xl:shrink-0">
          <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
          <CountBadge count={companiesCount} variant="chip" />
        </div>

        <div className="flex items-center gap-1 rounded-lg bg-zinc-50 px-3 py-1.5 xl:ps-5">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary-50 text-primary">
            <PackageCheck className="h-3 w-3" />
          </span>
          <span className="text-[10px] font-semibold tracking-wide text-zinc-700 uppercase">{shippedOrdersLabel}</span>
          <CountBadge count={shippedOrdersCount} />
        </div>
      </div>

      <div className=" flex flex-col xl:flex-row">
        <EmptyStatePanel
          icon={FolderOpen}
          message={noDataLabel}
          grow={false}
          className="border-b border-zinc-100 xl:w-[85%] xl:shrink-0 xl:border-b-0"
        />

        <div className="hidden self-center xl:block xl:h-35 xl:w-px xl:bg-zinc-300" />

        <EmptyStatePanel icon={Clock} message={noDataLabel} />
      </div>
    </Card>
  );
}
