import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { CustomersToolbar } from "./CustomersToolbar";
import { CustomersTable } from "./CustomersTable";
import type { CustomerRow } from "@/lib/mock/types";

export function CustomersView({
  breadcrumbRoot,
  breadcrumbCurrent,
  searchPlaceholder,
  refreshLabel,
  columns,
  rows,
  total,
  verifiedLabel,
  activeLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  searchPlaceholder: string;
  refreshLabel: string;
  columns: {
    rowNumber: string;
    name: string;
    email: string;
    mobilePhone: string;
    verified: string;
    active: string;
  };
  rows: CustomerRow[];
  total: number;
  verifiedLabel: string;
  activeLabel: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/users/roles" className="hover:text-zinc-700">
          {breadcrumbRoot}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
      </nav>

      <Card>
        <CustomersToolbar searchPlaceholder={searchPlaceholder} refreshLabel={refreshLabel} />
        <CustomersTable
          columns={columns}
          rows={rows}
          total={total}
          verifiedLabel={verifiedLabel}
          activeLabel={activeLabel}
          showingLabel={showingLabel}
          ofLabel={ofLabel}
          entriesLabel={entriesLabel}
        />
      </Card>
    </div>
  );
}
