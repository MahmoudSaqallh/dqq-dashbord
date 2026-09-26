import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { WhatsappConnectionCard } from "./WhatsappConnectionCard";
import { WhatsappTemplatesCard, type ResolvedWhatsappTemplateRow } from "./WhatsappTemplatesCard";
import type { WhatsAppConnectionInfo } from "@/lib/mock/types";

export function WhatsappConfigurationView({
  breadcrumbRoot,
  breadcrumbCurrent,
  connectionInfo,
  connectionStatusLabel,
  connectionLabels,
  tabs,
  searchPlaceholder,
  filtersLabel,
  statusFilterLabel,
  statusFilterOptions,
  syncLabel,
  createNewLabel,
  columns,
  rows,
  emptyLabel,
  showingLabel,
  ofLabel,
  entriesLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  connectionInfo: WhatsAppConnectionInfo;
  connectionStatusLabel: string;
  connectionLabels: {
    title: string;
    testApi: string;
    paymentMethod: string;
    view: string;
    edit: string;
    sendMessage: string;
    phoneNumberId: string;
    displayPhoneNumber: string;
    businessAccountId: string;
    createdDate: string;
  };
  tabs: { id: "templates" | "messagesLog" | "analytics"; label: string; count?: number }[];
  searchPlaceholder: string;
  filtersLabel: string;
  statusFilterLabel: string;
  statusFilterOptions: string[];
  syncLabel: string;
  createNewLabel: string;
  columns: {
    rowNumber: string;
    name: string;
    category: string;
    language: string;
    createdAt: string;
    status: string;
    action: string;
  };
  rows: ResolvedWhatsappTemplateRow[];
  emptyLabel: string;
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

      <WhatsappConnectionCard info={connectionInfo} statusLabel={connectionStatusLabel} labels={connectionLabels} />

      <WhatsappTemplatesCard
        tabs={tabs}
        searchPlaceholder={searchPlaceholder}
        filtersLabel={filtersLabel}
        statusFilterLabel={statusFilterLabel}
        statusFilterOptions={statusFilterOptions}
        syncLabel={syncLabel}
        createNewLabel={createNewLabel}
        columns={columns}
        rows={rows}
        emptyLabel={emptyLabel}
        showingLabel={showingLabel}
        ofLabel={ofLabel}
        entriesLabel={entriesLabel}
      />
    </div>
  );
}
