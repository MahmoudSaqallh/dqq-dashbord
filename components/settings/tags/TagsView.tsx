import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { TagsToolbar } from "./TagsToolbar";
import { TagsTable, type ResolvedTagRow } from "./TagsTable";

export function TagsView({
  breadcrumbRoot,
  breadcrumbCurrent,
  searchPlaceholder,
  refreshLabel,
  addNewLabel,
  columns,
  rows,
  emptyTitle,
  emptySubtitle,
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
    nameEn: string;
    nameAr: string;
    color: string;
    status: string;
    action: string;
  };
  rows: ResolvedTagRow[];
  emptyTitle: string;
  emptySubtitle: string;
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
        <TagsToolbar searchPlaceholder={searchPlaceholder} refreshLabel={refreshLabel} addNewLabel={addNewLabel} />
        <TagsTable
          columns={columns}
          rows={rows}
          emptyTitle={emptyTitle}
          emptySubtitle={emptySubtitle}
          showingLabel={showingLabel}
          ofLabel={ofLabel}
          entriesLabel={entriesLabel}
        />
      </Card>
    </div>
  );
}
