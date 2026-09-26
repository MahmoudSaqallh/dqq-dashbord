import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { WarehouseTransfersView } from "@/components/inventory-management/warehouse-transfers/WarehouseTransfersView";
import { WAREHOUSE_TRANSFER_ROWS, WAREHOUSE_TRANSFERS_TOTAL } from "@/lib/mock/warehouse-transfers";

export default async function WarehouseTransfersPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <WarehouseTransfersView
      breadcrumbRoot={t("warehousesPage.breadcrumbRoot")}
      breadcrumbCurrent={t("nav.inventoryManagementChildren.warehouseTransfers")}
      refreshLabel={t("warehouseTransfersPage.refresh")}
      addNewLabel={t("warehouseTransfersPage.addNew")}
      tableTitle={t("warehouseTransfersPage.tableTitle")}
      searchPlaceholder={t("warehouseTransfersPage.searchPlaceholder")}
      dateRangePresetLabels={dict.common.dateRangePicker.presets}
      dateRangeCancelLabel={t("common.dateRangePicker.cancel")}
      dateRangeApplyLabel={t("common.dateRangePicker.apply")}
      filtersLabel={t("warehouseTransfersPage.filters")}
      exportLabel={t("warehouseTransfersPage.export")}
      columns={{
        rowNumber: t("warehouseTransfersPage.columns.rowNumber"),
        number: t("warehouseTransfersPage.columns.number"),
        fromToWarehouse: t("warehouseTransfersPage.columns.fromToWarehouse"),
        shippingCompany: t("warehouseTransfersPage.columns.shippingCompany"),
        quantity: t("warehouseTransfersPage.columns.quantity"),
        priority: t("warehouseTransfersPage.columns.priority"),
        senderStatus: t("warehouseTransfersPage.columns.senderStatus"),
        receiverStatus: t("warehouseTransfersPage.columns.receiverStatus"),
        action: t("warehouseTransfersPage.columns.action"),
      }}
      rows={WAREHOUSE_TRANSFER_ROWS}
      fromLabel={t("warehouseTransfersPage.from")}
      toLabel={t("warehouseTransfersPage.to")}
      senderStatusLabels={{
        new: t("warehouseTransfersPage.senderStatus.new"),
        packed: t("warehouseTransfersPage.senderStatus.packed"),
      }}
      receiverStatusLabels={{
        pending: t("warehouseTransfersPage.receiverStatus.pending"),
        waiting_receive: t("warehouseTransfersPage.receiverStatus.waitingReceive"),
        received: t("warehouseTransfersPage.receiverStatus.received"),
      }}
      priorityLabels={{
        low: t("warehouseTransfersPage.priority.low"),
        medium: t("warehouseTransfersPage.priority.medium"),
        high: t("warehouseTransfersPage.priority.high"),
      }}
      emptyValue={t("warehouseTransfersPage.emptyValue")}
      showingLabel={t("warehouseTransfersPage.showing")}
      ofLabel={t("warehouseTransfersPage.of")}
      entriesLabel={t("warehouseTransfersPage.entries")}
      total={WAREHOUSE_TRANSFERS_TOTAL}
      drawerLabels={{
        title: t("warehouseTransfersPage.details.title"),
        transferInfo: t("warehouseTransfersPage.details.transferInfo"),
        export: t("purchaseOrdersPage.details.export"),
        log: t("purchaseOrdersPage.details.log"),
        transferId: t("warehouseTransfersPage.details.transferId"),
        date: t("warehouseTransfersPage.details.date"),
        warehouseFrom: t("addWarehouseTransferPage.warehouseFromLabel"),
        warehouseTo: t("addWarehouseTransferPage.warehouseToLabel"),
        city: t("warehouseTransfersPage.details.city"),
        shippingCompany: t("warehouseTransfersPage.columns.shippingCompany"),
        priority: t("warehouseTransfersPage.columns.priority"),
        client: t("warehouseTransfersPage.details.client"),
        senderEmployee: t("addWarehouseTransferPage.senderEmployeeLabel"),
        receiverEmployee: t("addWarehouseTransferPage.receiverEmployeeLabel"),
        totalQuantity: t("warehouseTransfersPage.details.totalQuantity"),
        numberOfProducts: t("purchaseOrdersPage.details.numberOfProducts"),
        senderStatus: t("warehouseTransfersPage.columns.senderStatus"),
        receiverStatus: t("warehouseTransfersPage.columns.receiverStatus"),
        note: t("purchaseOrdersPage.details.notes"),
        sendingProducts: t("warehouseTransfersPage.details.sendingProducts"),
        receivingProducts: t("purchaseOrdersPage.details.receivingProducts"),
        transferProducts: t("warehouseTransfersPage.details.transferProducts"),
        searchPlaceholder: t("purchaseOrdersPage.details.searchPlaceholder"),
        transferQty: t("warehouseTransfersPage.details.transferQty"),
        sendQty: t("warehouseTransfersPage.details.sendQty"),
        receivedQty: t("purchaseOrdersPage.details.receivedQty"),
        priorityLabels: {
          low: t("warehouseTransfersPage.priority.low"),
          medium: t("warehouseTransfersPage.priority.medium"),
          high: t("warehouseTransfersPage.priority.high"),
        },
        senderStatusLabels: {
          new: t("warehouseTransfersPage.senderStatus.new"),
          packed: t("warehouseTransfersPage.senderStatus.packed"),
        },
        receiverStatusLabels: {
          pending: t("warehouseTransfersPage.receiverStatus.pending"),
          waiting_receive: t("warehouseTransfersPage.receiverStatus.waitingReceive"),
          received: t("warehouseTransfersPage.receiverStatus.received"),
        },
      }}
    />
  );
}
