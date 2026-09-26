import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { PurchaseOrdersView } from "@/components/inventory-management/purchase-orders/PurchaseOrdersView";
import { PURCHASE_ORDER_ROWS, PURCHASE_ORDER_STATS } from "@/lib/mock/purchase-orders";

export default async function PurchaseOrdersPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <PurchaseOrdersView
      breadcrumbRoot={t("warehousesPage.breadcrumbRoot")}
      breadcrumbCurrent={t("nav.inventoryManagementChildren.purchaseOrders")}
      totalLabel={t("purchaseOrdersPage.totalLabel")}
      refreshLabel={t("purchaseOrdersPage.refresh")}
      addNewLabel={t("purchaseOrdersPage.addNew")}
      stats={PURCHASE_ORDER_STATS}
      statsLabels={{
        suggested: t("purchaseOrdersPage.stats.suggested"),
        draft: t("purchaseOrdersPage.stats.draft"),
        submitted: t("purchaseOrdersPage.stats.submitted"),
        approved: t("purchaseOrdersPage.stats.approved"),
        ordered: t("purchaseOrdersPage.stats.ordered"),
        partiallyReceived: t("purchaseOrdersPage.stats.partiallyReceived"),
        received: t("purchaseOrdersPage.stats.received"),
        closed: t("purchaseOrdersPage.stats.closed"),
        cancelled: t("purchaseOrdersPage.stats.cancelled"),
      }}
      allOrdersLabel={t("purchaseOrdersPage.allOrders")}
      aiSuggestedLabel={t("purchaseOrdersPage.aiSuggested")}
      searchPlaceholder={t("purchaseOrdersPage.searchPlaceholder")}
      dateRangePresetLabels={dict.common.dateRangePicker.presets}
      dateRangeCancelLabel={t("common.dateRangePicker.cancel")}
      dateRangeApplyLabel={t("common.dateRangePicker.apply")}
      filtersLabel={t("purchaseOrdersPage.filters")}
      exportLabel={t("purchaseOrdersPage.export")}
      columns={{
        rowNumber: t("purchaseOrdersPage.columns.rowNumber"),
        serialNumber: t("purchaseOrdersPage.columns.serialNumber"),
        supplier: t("purchaseOrdersPage.columns.supplier"),
        warehouse: t("purchaseOrdersPage.columns.warehouse"),
        products: t("purchaseOrdersPage.columns.products"),
        totalAmount: t("purchaseOrdersPage.columns.totalAmount"),
        deliveryDate: t("purchaseOrdersPage.columns.deliveryDate"),
        status: t("purchaseOrdersPage.columns.status"),
        approvedBy: t("purchaseOrdersPage.columns.approvedBy"),
        action: t("purchaseOrdersPage.columns.action"),
      }}
      rows={PURCHASE_ORDER_ROWS}
      statusLabels={{
        suggested: t("purchaseOrdersPage.stats.suggested"),
        draft: t("purchaseOrdersPage.stats.draft"),
        submitted: t("purchaseOrdersPage.stats.submitted"),
        approved: t("purchaseOrdersPage.stats.approved"),
        ordered: t("purchaseOrdersPage.stats.ordered"),
        partially_received: t("purchaseOrdersPage.stats.partiallyReceived"),
        received: t("purchaseOrdersPage.stats.received"),
        closed: t("purchaseOrdersPage.stats.closed"),
        cancelled: t("purchaseOrdersPage.stats.cancelled"),
      }}
      emptyValue={t("purchaseOrdersPage.emptyValue")}
      showingLabel={t("purchaseOrdersPage.showing")}
      ofLabel={t("purchaseOrdersPage.of")}
      entriesLabel={t("purchaseOrdersPage.entries")}
      drawerLabels={{
        title: t("purchaseOrdersPage.details.title"),
        orderInfo: t("purchaseOrdersPage.details.orderInfo"),
        export: t("purchaseOrdersPage.details.export"),
        log: t("purchaseOrdersPage.details.log"),
        orderId: t("purchaseOrdersPage.details.orderId"),
        expectedDeliveryDate: t("purchaseOrdersPage.details.expectedDeliveryDate"),
        supplier: t("purchaseOrdersPage.details.supplier"),
        warehouse: t("purchaseOrdersPage.details.warehouse"),
        totalQuantity: t("purchaseOrdersPage.details.totalQuantity"),
        assignedTo: t("purchaseOrdersPage.details.assignedTo"),
        numberOfProducts: t("purchaseOrdersPage.details.numberOfProducts"),
        totalAmount: t("purchaseOrdersPage.details.totalAmount"),
        status: t("purchaseOrdersPage.details.status"),
        notes: t("purchaseOrdersPage.details.notes"),
        receivingProducts: t("purchaseOrdersPage.details.receivingProducts"),
        orderProducts: t("purchaseOrdersPage.details.orderProducts"),
        searchPlaceholder: t("purchaseOrdersPage.details.searchPlaceholder"),
        orderedQty: t("purchaseOrdersPage.details.orderedQty"),
        receivedQty: t("purchaseOrdersPage.details.receivedQty"),
        actualDate: t("purchaseOrdersPage.details.actualDate"),
        receiveTo: t("purchaseOrdersPage.details.receiveTo"),
      }}
      changeStatusLabels={{
        title: t("purchaseOrdersPage.changeStatus.title"),
        statusLabel: t("purchaseOrdersPage.changeStatus.statusLabel"),
        product: t("purchaseOrdersPage.changeStatus.product"),
        stockQty: t("purchaseOrdersPage.changeStatus.stockQty"),
        ordered: t("purchaseOrdersPage.changeStatus.ordered"),
        location: t("purchaseOrdersPage.changeStatus.location"),
        totalReceived: t("purchaseOrdersPage.changeStatus.totalReceived"),
        noteLabel: t("purchaseOrdersPage.changeStatus.noteLabel"),
        notePlaceholder: t("purchaseOrdersPage.changeStatus.notePlaceholder"),
        cancel: t("purchaseOrdersPage.changeStatus.cancel"),
        save: t("purchaseOrdersPage.changeStatus.save"),
      }}
      editActionLabel={t("purchaseOrdersPage.editAction")}
      changeStatusActionLabel={t("purchaseOrdersPage.changeStatusAction")}
    />
  );
}
