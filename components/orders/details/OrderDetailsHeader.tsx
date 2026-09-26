import Link from "next/link";
import { ChevronRight, Copy, MoreVertical } from "lucide-react";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import { IconButton } from "@/components/ui/IconButton";

export function OrderDetailsHeader({
  breadcrumbRoot,
  breadcrumbSuffix,
  orderNumber,
  refreshLabel,
  actionsLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbSuffix: string;
  orderNumber: string;
  refreshLabel: string;
  actionsLabel: string;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/orders" className="hover:text-zinc-700">
          {breadcrumbRoot}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        <span dir="ltr" className="inline-flex items-center gap-1.5 font-semibold text-zinc-900">
          {breadcrumbSuffix.split("{order}")[0]}
          {orderNumber}
          {breadcrumbSuffix.split("{order}")[1]}
        </span>
        <Copy className="h-3.5 w-3.5 shrink-0 text-zinc-300" />
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <RefreshButton label={refreshLabel} />
        <IconButton aria-label={actionsLabel}>
          <MoreVertical className="h-4 w-4" />
        </IconButton>
      </div>
    </div>
  );
}
