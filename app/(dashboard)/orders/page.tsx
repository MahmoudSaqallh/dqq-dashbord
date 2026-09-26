import Link from "next/link";
import { Package, Plus } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { Card } from "@/components/ui/Card";
import { OrderStatusTabs } from "@/components/orders/OrderStatusTabs";
import { OrdersFiltersSection } from "@/components/orders/OrdersFiltersSection";
import { OrdersResultBar } from "@/components/orders/OrdersResultBar";
import { OrdersTable } from "@/components/orders/OrdersTable";
import { ORDER_STATUS_TABS } from "@/lib/mock/order-status-tabs";
import { ORDERS_LIST } from "@/lib/mock/orders-list";
import {
  DQQ_STATUS_TONE,
  PAYMENT_STATUS_TONE,
  STORE_STATUS_TONE,
} from "@/lib/utils/status-colors";

export default async function OrdersPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const tabs = ORDER_STATUS_TABS.map((tab) => ({
    id: tab.id,
    label: t(tab.labelKey),
    count: tab.count,
  }));

  const filterOptions = dict.ordersPage.filterOptions;
  const filters = [
    { label: t("ordersPage.filterStoreStatus"), options: filterOptions.storeStatus },
    { label: t("ordersPage.filterAllProducts"), options: filterOptions.allProducts },
    { label: t("ordersPage.filterWarehouse"), options: filterOptions.warehouse },
    { label: t("ordersPage.filterQuantityProducts"), options: filterOptions.quantityProducts },
    { label: t("ordersPage.filterNumberOfProducts"), options: filterOptions.numberOfProducts },
    { label: t("ordersPage.filterPaymentStatus"), options: filterOptions.paymentStatus },
    { label: t("ordersPage.filterPrintWaybills"), options: filterOptions.printWaybills },
    { label: t("ordersPage.filterMore"), options: filterOptions.more },
  ];

  const rows = ORDERS_LIST.map((order) => ({
    id: order.id,
    rowNumber: order.rowNumber,
    orderNumber: order.orderNumber,
    clientName: order.clientName,
    shippingCompany: order.shippingCompany,
    dqqStatus: { label: t(`status.dqq.${order.dqqStatus}`), tone: DQQ_STATUS_TONE[order.dqqStatus] },
    storeStatus: { label: t(`status.store.${order.storeStatus}`), tone: STORE_STATUS_TONE[order.storeStatus] },
    payment: {
      label: t(`ordersPage.payment.${order.paymentStatus}`),
      tone: PAYMENT_STATUS_TONE[order.paymentStatus],
    },
    hasIntegrationBadge: order.hasIntegrationBadge,
    totalDisplay: `${order.total.amount.toFixed(2)} ${order.total.currency}`,
  }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900">{t("ordersPage.title")}</h1>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            <Package className="h-5 w-5 text-zinc-500" />
            <h2 className="text-base font-semibold text-black">{t("ordersPage.listTitle")}</h2>
          </div>

          <Link
            href="/orders/add"
            className="inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-xl bg-primary px-4 text-sm font-medium text-white hover:bg-primary-600"
          >
            <Plus className="h-4 w-4" />
            {t("createOrderPage.createOrder")}
          </Link>
        </div>

        <OrderStatusTabs tabs={tabs} />

        <OrdersFiltersSection
          searchPlaceholder={t("ordersPage.searchPlaceholder")}
          dateRangePresetLabels={dict.common.dateRangePicker.presets}
          dateRangeCancelLabel={t("common.dateRangePicker.cancel")}
          dateRangeApplyLabel={t("common.dateRangePicker.apply")}
          filtersLabel={t("ordersPage.filters")}
          filters={filters}
        />
      </Card>

      <Card>
        <OrdersResultBar resultCount={ORDER_STATUS_TABS[0].count} />

        <OrdersTable
          columns={{
            rowNumber: t("ordersPage.columns.rowNumber"),
            orderNumber: t("newOrders.columns.orderNumber"),
            clients: t("newOrders.columns.clients"),
            shippingCompany: t("newOrders.columns.shippingCompany"),
            dqqStatus: t("newOrders.columns.dqqStatus"),
            storeStatus: t("newOrders.columns.storeStatus"),
            tags: t("ordersPage.columns.tags"),
            payment: t("ordersPage.columns.payment"),
            total: t("newOrders.columns.total"),
            action: t("newOrders.columns.action"),
          }}
          addTagLabel={t("ordersPage.addTag")}
          rows={rows}
        />
      </Card>
    </div>
  );
}
