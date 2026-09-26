import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PrinterAccountCard } from "./PrinterAccountCard";
import { PrinterDevicesCard, type ResolvedPrinterDeviceRow } from "./PrinterDevicesCard";
import type { PrinterAccountInfo } from "@/lib/mock/types";

export function PrinterSettingsView({
  breadcrumbRoot,
  breadcrumbCurrent,
  accountTitle,
  accountInfo,
  accountLabels,
  devicesTitle,
  searchPlaceholder,
  filtersLabel,
  statusFilterLabel,
  statusFilterOptions,
  syncLabel,
  columns,
  rows,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  accountTitle: string;
  accountInfo: PrinterAccountInfo;
  accountLabels: {
    accountId: string;
    firstName: string;
    lastName: string;
    email: string;
    createdDate: string;
  };
  devicesTitle: string;
  searchPlaceholder: string;
  filtersLabel: string;
  statusFilterLabel: string;
  statusFilterOptions: string[];
  syncLabel: string;
  columns: {
    rowNumber: string;
    computerId: string;
    name: string;
    hostName: string;
    status: string;
    version: string;
    printers: string;
    action: string;
  };
  rows: ResolvedPrinterDeviceRow[];
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

      <PrinterAccountCard title={accountTitle} info={accountInfo} labels={accountLabels} />

      <PrinterDevicesCard
        title={devicesTitle}
        searchPlaceholder={searchPlaceholder}
        filtersLabel={filtersLabel}
        statusFilterLabel={statusFilterLabel}
        statusFilterOptions={statusFilterOptions}
        syncLabel={syncLabel}
        columns={columns}
        rows={rows}
        showingLabel={showingLabel}
        ofLabel={ofLabel}
        entriesLabel={entriesLabel}
      />
    </div>
  );
}
