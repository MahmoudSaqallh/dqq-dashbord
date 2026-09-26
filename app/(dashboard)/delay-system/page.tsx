import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { DelaySystemView } from "@/components/delay-system/DelaySystemView";
import { DELAY_SYSTEM_SUMMARY } from "@/lib/mock/delay-system";

export default async function DelaySystemPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const stats = DELAY_SYSTEM_SUMMARY.stats.map((stat) => ({
    ...stat,
    unit: stat.unit === "Min" ? t("delaySystemPage.minutesUnit") : t("delaySystemPage.ordersUnit"),
    label: t(`delaySystemPage.stats.${stat.id}`),
  }));

  return (
    <DelaySystemView
      breadcrumbRoot={t("reportsPage.title")}
      breadcrumbCurrent={t("delaySystemPage.breadcrumbCurrent")}
      refreshLabel={t("delaySystemPage.refresh")}
      totalOrdersLabel={t("delaySystemPage.totalOrders")}
      totalOrders={DELAY_SYSTEM_SUMMARY.totalOrders}
      totalOrdersDeltaCount={DELAY_SYSTEM_SUMMARY.totalOrdersDeltaCount}
      totalOrdersDeltaPercent={DELAY_SYSTEM_SUMMARY.totalOrdersDeltaPercent}
      ordersUnit={t("delaySystemPage.ordersUnit")}
      warehousePlaceholder={t("delaySystemPage.warehousePlaceholder")}
      warehouseOptions={[{ value: "main", label: t("delaySystemPage.warehouseOptions.main") }]}
      dateRangePresetLabels={dict.common.dateRangePicker.presets}
      dateRangeCancelLabel={t("common.dateRangePicker.cancel")}
      dateRangeApplyLabel={t("common.dateRangePicker.apply")}
      stats={stats}
      tabs={[
        { id: "delayedOrders", label: t("delaySystemPage.tabs.delayedOrders") },
        { id: "vacations", label: t("delaySystemPage.tabs.vacations") },
        { id: "delayRules", label: t("delaySystemPage.tabs.delayRules") },
        { id: "analysis", label: t("delaySystemPage.tabs.analysis") },
      ]}
      exportLabel={t("delaySystemPage.export")}
      searchPlaceholder={t("delaySystemPage.searchPlaceholder")}
      columns={{
        rowNumber: t("delaySystemPage.columns.rowNumber"),
        orderNumber: t("delaySystemPage.columns.orderNumber"),
        clients: t("delaySystemPage.columns.clients"),
        customerName: t("delaySystemPage.columns.customerName"),
        city: t("delaySystemPage.columns.city"),
        warehouse: t("delaySystemPage.columns.warehouse"),
        orderDate: t("delaySystemPage.columns.orderDate"),
        processingTime: t("delaySystemPage.columns.processingTime"),
        storeStatus: t("delaySystemPage.columns.storeStatus"),
        delayTime: t("delaySystemPage.columns.delayTime"),
      }}
      emptyLabel={t("delaySystemPage.emptyData")}
      comingSoonLabel={t("delaySystemPage.comingSoon")}
      showingLabel={t("delaySystemPage.showing")}
      ofLabel={t("delaySystemPage.of")}
      entriesLabel={t("delaySystemPage.entries")}
    />
  );
}
