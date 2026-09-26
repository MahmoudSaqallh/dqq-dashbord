import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { PageHeader } from "@/components/dashboard/PageHeader";
import { StatCardsRow } from "@/components/dashboard/StatCardsRow";
import { ShippingCompaniesPanel } from "@/components/dashboard/ShippingCompaniesPanel";
import { NewOrdersTable } from "@/components/dashboard/NewOrdersTable";
import { STAT_CARDS } from "@/lib/mock/stats";
import { NEW_ORDERS } from "@/lib/mock/orders";
import { SHIPPING_COMPANIES_SUMMARY } from "@/lib/mock/shipping-companies";
import { DQQ_STATUS_TONE, STORE_STATUS_TONE } from "@/lib/utils/status-colors";

export default async function DashboardPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const statItems = STAT_CARDS.map((stat) => ({
    id: stat.id,
    icon: stat.icon,
    label: t(stat.labelKey),
    value: stat.value,
    tone: stat.tone,
  }));

  const orders = NEW_ORDERS.map((order) => ({
    id: order.id,
    orderNumber: order.orderNumber,
    clientName: order.clientName,
    shippingCompany: order.shippingCompany,
    dateOrderDisplay: order.dateOrderDisplay,
    totalDisplay: `${order.total.amount.toFixed(2)} ${order.total.currency}`,
    dqqStatus: {
      label: t(`status.dqq.${order.dqqStatus}`),
      tone: DQQ_STATUS_TONE[order.dqqStatus],
    },
    storeStatus: {
      label: t(`status.store.${order.storeStatus}`),
      tone: STORE_STATUS_TONE[order.storeStatus],
    },
  }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={t("dashboard.title")}
        dateRangePresetLabels={dict.common.dateRangePicker.presets}
        dateRangeCancelLabel={t("common.dateRangePicker.cancel")}
        dateRangeApplyLabel={t("common.dateRangePicker.apply")}
        refreshLabel={t("dashboard.refresh")}
      />

      <StatCardsRow items={statItems} />

      <ShippingCompaniesPanel
        title={t("shippingCompanies.title")}
        companiesCount={SHIPPING_COMPANIES_SUMMARY.companiesCount}
        shippedOrdersLabel={t("shippingCompanies.shippedOrders")}
        shippedOrdersCount={SHIPPING_COMPANIES_SUMMARY.shippedOrdersCount}
        noDataLabel={t("shippingCompanies.noData")}
      />

      <NewOrdersTable
        title={t("newOrders.title")}
        viewAllLabel={t("newOrders.viewAll")}
        viewAllHref="/orders"
        actionLabel={t("common.view")}
        columns={{
          orderNumber: t("newOrders.columns.orderNumber"),
          clients: t("newOrders.columns.clients"),
          shippingCompany: t("newOrders.columns.shippingCompany"),
          dateOrder: t("newOrders.columns.dateOrder"),
          total: t("newOrders.columns.total"),
          dqqStatus: t("newOrders.columns.dqqStatus"),
          storeStatus: t("newOrders.columns.storeStatus"),
          action: t("newOrders.columns.action"),
        }}
        orders={orders}
      />
    </div>
  );
}
