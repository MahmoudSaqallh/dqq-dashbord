import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RolesToolbar } from "./RolesToolbar";
import { RolesTable } from "./RolesTable";
import type { RoleRow } from "@/lib/mock/types";

export function RolesView({
  breadcrumbRoot,
  breadcrumbCurrent,
  searchPlaceholder,
  refreshLabel,
  addNewLabel,
  columns,
  rows,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  searchPlaceholder: string;
  refreshLabel: string;
  addNewLabel: string;
  columns: {
    rowNumber: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    action: string;
  };
  rows: RoleRow[];
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href="/settings" className="text-info hover:text-info/80">
          {breadcrumbRoot}
        </Link>
        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
      </nav>

      <Card>
        <RolesToolbar searchPlaceholder={searchPlaceholder} refreshLabel={refreshLabel} addNewLabel={addNewLabel} />
        <RolesTable
          columns={columns}
          rows={rows}
          showingLabel={showingLabel}
          ofLabel={ofLabel}
          entriesLabel={entriesLabel}
        />
      </Card>
    </div>
  );
}
