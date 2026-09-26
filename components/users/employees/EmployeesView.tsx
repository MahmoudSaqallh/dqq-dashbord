import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { EmployeesToolbar } from "./EmployeesToolbar";
import { EmployeesTable } from "./EmployeesTable";
import type { EmployeeRow } from "@/lib/mock/types";

export function EmployeesView({
  breadcrumbRoot,
  breadcrumbCurrent,
  searchPlaceholder,
  refreshLabel,
  activeLabel,
  activeCount,
  deletedLabel,
  columns,
  rows,
  statusLabels,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  searchPlaceholder: string;
  refreshLabel: string;
  activeLabel: string;
  activeCount: number;
  deletedLabel: string;
  columns: {
    rowNumber: string;
    name: string;
    email: string;
    username: string;
    status: string;
    createdAt: string;
    updatedAt: string;
    action: string;
  };
  rows: EmployeeRow[];
  statusLabels: Record<EmployeeRow["status"], string>;
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
        <EmployeesToolbar
          searchPlaceholder={searchPlaceholder}
          refreshLabel={refreshLabel}
          activeLabel={activeLabel}
          activeCount={activeCount}
          deletedLabel={deletedLabel}
        />
        <EmployeesTable
          columns={columns}
          rows={rows}
          statusLabels={statusLabels}
          showingLabel={showingLabel}
          ofLabel={ofLabel}
          entriesLabel={entriesLabel}
        />
      </Card>
    </div>
  );
}
