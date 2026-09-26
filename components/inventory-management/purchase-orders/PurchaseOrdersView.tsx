"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { RefreshButton } from "@/components/dashboard/RefreshButton";
import type { DateRangePresetKey } from "@/components/shared/DateRangeDropdown";
import { PurchaseOrdersHeader } from "./PurchaseOrdersHeader";
import { PurchaseOrdersStatsBar } from "./PurchaseOrdersStatsBar";
import { PurchaseOrdersToolbar } from "./PurchaseOrdersToolbar";
import { PurchaseOrdersTable } from "./PurchaseOrdersTable";
import { PurchaseOrderDetailsDrawer } from "./PurchaseOrderDetailsDrawer";
import { ChangeStatusModal } from "./ChangeStatusModal";
import { getPurchaseOrderDetails } from "@/lib/mock/purchase-order-details";
import { getPurchaseOrderChangeStatus } from "@/lib/mock/purchase-order-change-status";
import type { PurchaseOrderRow, PurchaseOrderStatsSummary } from "@/lib/mock/types";

export function PurchaseOrdersView({
  breadcrumbRoot,
  breadcrumbCurrent,
  totalLabel,
  refreshLabel,
  addNewLabel,
  stats,
  statsLabels,
  allOrdersLabel,
  aiSuggestedLabel,
  searchPlaceholder,
  dateRangePresetLabels,
  dateRangeCancelLabel,
  dateRangeApplyLabel,
  filtersLabel,
  exportLabel,
  columns,
  rows,
  statusLabels,
  emptyValue,
  showingLabel,
  ofLabel,
  entriesLabel,
  drawerLabels,
  changeStatusLabels,
  editActionLabel,
  changeStatusActionLabel,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  totalLabel: string;
  refreshLabel: string;
  addNewLabel: string;
  stats: PurchaseOrderStatsSummary;
  statsLabels: {
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
  allOrdersLabel: string;
  aiSuggestedLabel: string;
  searchPlaceholder: string;
  dateRangePresetLabels: Record<DateRangePresetKey, string>;
  dateRangeCancelLabel: string;
  dateRangeApplyLabel: string;
  filtersLabel: string;
  exportLabel: string;
  columns: {
    rowNumber: string;
    serialNumber: string;
    supplier: string;
    warehouse: string;
    products: string;
    totalAmount: string;
    deliveryDate: string;
    status: string;
    approvedBy: string;
    action: string;
  };
  rows: PurchaseOrderRow[];
  statusLabels: Record<PurchaseOrderRow["status"], string>;
  emptyValue: string;
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
  drawerLabels: {
    title: string;
    orderInfo: string;
    export: string;
    log: string;
    orderId: string;
    expectedDeliveryDate: string;
    supplier: string;
    warehouse: string;
    totalQuantity: string;
    assignedTo: string;
    numberOfProducts: string;
    totalAmount: string;
    status: string;
    notes: string;
    receivingProducts: string;
    orderProducts: string;
    searchPlaceholder: string;
    orderedQty: string;
    receivedQty: string;
    actualDate: string;
    receiveTo: string;
  };
  changeStatusLabels: {
    title: string;
    statusLabel: string;
    product: string;
    stockQty: string;
    ordered: string;
    location: string;
    totalReceived: string;
    noteLabel: string;
    notePlaceholder: string;
    cancel: string;
    save: string;
  };
  editActionLabel: string;
  changeStatusActionLabel: string;
}) {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedRow = rows.find((row) => row.id === selectedOrderId) ?? null;
  const selectedDetails = selectedRow ? getPurchaseOrderDetails(selectedRow) : null;

  const [changeStatusOrderId, setChangeStatusOrderId] = useState<string | null>(null);
  const changeStatusRow = rows.find((row) => row.id === changeStatusOrderId) ?? null;
  const changeStatusData = changeStatusRow ? getPurchaseOrderChangeStatus(changeStatusRow) : null;

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
            href="/inventory-management/purchase-orders/add"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
          >
            <Plus className="h-4 w-4" />
            {addNewLabel}
          </Link>
        </div>
      </div>

      <Card className="overflow-hidden">
        <PurchaseOrdersHeader totalLabel={totalLabel} total={stats.total} />
        <PurchaseOrdersStatsBar stats={stats} labels={statsLabels} />
      </Card>

      <Card>
        <PurchaseOrdersToolbar
          allOrdersLabel={allOrdersLabel}
          totalOrders={stats.total}
          aiSuggestedLabel={aiSuggestedLabel}
          searchPlaceholder={searchPlaceholder}
          dateRangePresetLabels={dateRangePresetLabels}
          dateRangeCancelLabel={dateRangeCancelLabel}
          dateRangeApplyLabel={dateRangeApplyLabel}
          filtersLabel={filtersLabel}
          exportLabel={exportLabel}
        />
        <PurchaseOrdersTable
          columns={columns}
          rows={rows}
          statusLabels={statusLabels}
          emptyValue={emptyValue}
          showingLabel={showingLabel}
          ofLabel={ofLabel}
          entriesLabel={entriesLabel}
          total={stats.total}
          editLabel={editActionLabel}
          changeStatusLabel={changeStatusActionLabel}
          onRowClick={setSelectedOrderId}
          onChangeStatusClick={setChangeStatusOrderId}
        />
      </Card>

      <PurchaseOrderDetailsDrawer
        open={selectedDetails !== null}
        onClose={() => setSelectedOrderId(null)}
        details={selectedDetails}
        labels={{ ...drawerLabels, statusLabels }}
      />

      <ChangeStatusModal
        open={changeStatusData !== null}
        onClose={() => setChangeStatusOrderId(null)}
        data={changeStatusData}
        statusLabels={statusLabels}
        labels={changeStatusLabels}
      />
    </div>
  );
}
