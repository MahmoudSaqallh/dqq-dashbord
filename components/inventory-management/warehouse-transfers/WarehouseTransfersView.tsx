"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import type { DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { WarehouseTransfersToolbar } from "./WarehouseTransfersToolbar";
import { WarehouseTransfersTable } from "./WarehouseTransfersTable";
import { TransferDetailsDrawer } from "./TransferDetailsDrawer";
import { getTransferDetails } from "@/lib/mock/warehouse-transfer-details";
import type {
  TransferPriority,
  TransferReceiverStatus,
  TransferSenderStatus,
  WarehouseTransferRow,
} from "@/lib/mock/types";

export function WarehouseTransfersView({
  breadcrumbRoot,
  breadcrumbCurrent,
  refreshLabel,
  addNewLabel,
  tableTitle,
  searchPlaceholder,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  filtersLabel,
  exportLabel,
  columns,
  rows,
  fromLabel,
  toLabel,
  senderStatusLabels,
  receiverStatusLabels,
  priorityLabels,
  emptyValue,
  showingLabel,
  ofLabel,
  entriesLabel,
  total,
  drawerLabels,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  refreshLabel: string;
  addNewLabel: string;
  tableTitle: string;
  searchPlaceholder: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  filtersLabel: string;
  exportLabel: string;
  columns: {
    rowNumber: string;
    number: string;
    fromToWarehouse: string;
    shippingCompany: string;
    quantity: string;
    priority: string;
    senderStatus: string;
    receiverStatus: string;
    action: string;
  };
  rows: WarehouseTransferRow[];
  fromLabel: string;
  toLabel: string;
  senderStatusLabels: Record<WarehouseTransferRow["senderStatus"], string>;
  receiverStatusLabels: Record<WarehouseTransferRow["receiverStatus"], string>;
  priorityLabels: Record<WarehouseTransferRow["priority"], string>;
  emptyValue: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
  total: number;
  drawerLabels: {
    title: string;
    transferInfo: string;
    export: string;
    log: string;
    transferId: string;
    date: string;
    warehouseFrom: string;
    warehouseTo: string;
    city: string;
    shippingCompany: string;
    priority: string;
    client: string;
    senderEmployee: string;
    receiverEmployee: string;
    totalQuantity: string;
    numberOfProducts: string;
    senderStatus: string;
    receiverStatus: string;
    note: string;
    sendingProducts: string;
    receivingProducts: string;
    transferProducts: string;
    searchPlaceholder: string;
    transferQty: string;
    sendQty: string;
    receivedQty: string;
    priorityLabels: Record<TransferPriority, string>;
    senderStatusLabels: Record<TransferSenderStatus, string>;
    receiverStatusLabels: Record<TransferReceiverStatus, string>;
  };
}) {
  const [selectedTransferId, setSelectedTransferId] = useState<string | null>(null);
  const selectedRow = rows.find((row) => row.id === selectedTransferId) ?? null;
  const selectedDetails = selectedRow ? getTransferDetails(selectedRow) : null;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
          <span>{breadcrumbRoot}</span>
          <span className="text-zinc-300">›</span>
          <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <RefreshButton label={refreshLabel} />
          <Link
            href="/inventory-management/warehouse-transfers/add"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
          >
            <Plus className="h-4 w-4" />
            {addNewLabel}
          </Link>
        </div>
      </div>

      <Card>
        <WarehouseTransfersToolbar
          tableTitle={tableTitle}
          searchPlaceholder={searchPlaceholder}
          dateRangePresetLabels={dateRangePresetLabels}
          dateRangeCancelLabel={dateRangeCancelLabel}
          dateRangeApplyLabel={dateRangeApplyLabel}
          filtersLabel={filtersLabel}
          exportLabel={exportLabel}
        />
        <WarehouseTransfersTable
          columns={columns}
          rows={rows}
          fromLabel={fromLabel}
          toLabel={toLabel}
          senderStatusLabels={senderStatusLabels}
          receiverStatusLabels={receiverStatusLabels}
          priorityLabels={priorityLabels}
          emptyValue={emptyValue}
          showingLabel={showingLabel}
          ofLabel={ofLabel}
          entriesLabel={entriesLabel}
          total={total}
          onRowClick={setSelectedTransferId}
        />
      </Card>

      <TransferDetailsDrawer
        open={selectedDetails !== null}
        onClose={() => setSelectedTransferId(null)}
        details={selectedDetails}
        labels={drawerLabels}
      />
    </div>
  );
}
