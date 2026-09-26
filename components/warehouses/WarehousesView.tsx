"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { WarehousesToolbar, type WarehousesTab } from "./WarehousesToolbar";
import { WarehousesTable } from "./WarehousesTable";
import { MergedWarehousesTable } from "./MergedWarehousesTable";
import { AddWarehouseModal } from "./AddWarehouseModal";
import { MergeWarehousesModal } from "./MergeWarehousesModal";
import type { MergedWarehouseGroup, WarehouseRow } from "@/lib/mock/types";

export function WarehousesView({
  breadcrumbRoot,
  breadcrumbCurrent,
  warehousesLabel,
  mergedLabel,
  searchPlaceholder,
  refreshLabel,
  mergeLabel,
  addNewLabel,
  columns,
  rows,
  mergedColumns,
  mergedGroupColumns,
  mergedGroups,
  showingLabel,
  ofLabel,
  entriesLabel,
  mergeModalLabels,
  addWarehouseLabels,
}: {
  breadcrumbRoot: string;
  breadcrumbCurrent: string;
  warehousesLabel: string;
  mergedLabel: string;
  searchPlaceholder: string;
  refreshLabel: string;
  mergeLabel: string;
  addNewLabel: string;
  columns: {
    rowNumber: string;
    name: string;
    countryCity: string;
    address1: string;
    shortAddress: string;
    createdAt: string;
    store: string;
    channel: string;
    enableInventoryLocation: string;
    action: string;
  };
  rows: WarehouseRow[];
  mergedColumns: {
    rowNumber: string;
    warehouse: string;
    store: string;
    countryCity: string;
    address1: string;
    createdAt: string;
    channel: string;
  };
  mergedGroupColumns: {
    action: string;
    toggle: string;
  };
  mergedGroups: MergedWarehouseGroup[];
  showingLabel: string;
  ofLabel: string;
  entriesLabel: string;
  mergeModalLabels: {
    title: string;
    cityLabel: string;
    cityPlaceholder: string;
    showOrderLabel: string;
    cancel: string;
    submit: string;
  };
  addWarehouseLabels: {
    title: string;
    informationsSection: string;
    clientIntegrate: string;
    selectPlaceholder: string;
    required: string;
    warehouseName: string;
    warehouseNamePlaceholder: string;
    referenceId: string;
    referenceIdPlaceholder: string;
    mobileNumber: string;
    mobileNumberPlaceholder: string;
    addressSection: string;
    country: string;
    city: string;
    cityPlaceholder: string;
    address1: string;
    address1Placeholder: string;
    address2: string;
    address2Optional: string;
    address2Placeholder: string;
    shortAddress: string;
    shortAddressPlaceholder: string;
    cancel: string;
    submit: string;
  };
}) {
  const [tab, setTab] = useState<WarehousesTab>("warehouses");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMergeModalOpen, setIsMergeModalOpen] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const allSelected = rows.length > 0 && selected.size === rows.length;

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(rows.map((row) => row.id)));
  }

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <nav className="flex items-center gap-1.5 text-sm text-zinc-500">
        <span>{breadcrumbRoot}</span>
        <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
        <span className="font-semibold text-zinc-900">{breadcrumbCurrent}</span>
      </nav>

      <Card>
        <WarehousesToolbar
          warehousesLabel={warehousesLabel}
          mergedLabel={mergedLabel}
          tab={tab}
          onTabChange={setTab}
          searchPlaceholder={searchPlaceholder}
          refreshLabel={refreshLabel}
          mergeLabel={mergeLabel}
          onMergeClick={() => setIsMergeModalOpen(true)}
          addNewLabel={addNewLabel}
          onAddNewClick={() => setIsAddModalOpen(true)}
        />
        {tab === "warehouses" ? (
          <WarehousesTable
            columns={columns}
            rows={rows}
            selected={selected}
            onToggleAll={toggleAll}
            onToggleOne={toggleOne}
            showingLabel={showingLabel}
            ofLabel={ofLabel}
            entriesLabel={entriesLabel}
          />
        ) : (
          <MergedWarehousesTable
            columns={mergedColumns}
            groupColumns={mergedGroupColumns}
            groups={mergedGroups}
            showingLabel={showingLabel}
            ofLabel={ofLabel}
            entriesLabel={entriesLabel}
          />
        )}
      </Card>

      <AddWarehouseModal open={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} labels={addWarehouseLabels} />
      <MergeWarehousesModal open={isMergeModalOpen} onClose={() => setIsMergeModalOpen(false)} labels={mergeModalLabels} />
    </div>
  );
}
