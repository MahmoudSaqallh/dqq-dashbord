import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { WarehousePerformanceView } from "@/components/reports/warehouse-performance/WarehousePerformanceView";

export default async function WarehousePerformanceReportPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <WarehousePerformanceView
      breadcrumbRoot={t("reportsPage.title")}
      breadcrumbCurrent={t("warehousePerformanceReportPage.breadcrumbCurrent")}
      filtersLabel={t("reportsPage.filters")}
      downloadPdfLabel={t("warehousePerformanceReportPage.downloadPdf")}
      quickPresets={[
        { id: "today", label: t("reportsPage.quickPresets.today") },
        { id: "yesterday", label: t("reportsPage.quickPresets.yesterday") },
        { id: "thisWeek", label: t("reportsPage.quickPresets.thisWeek") },
        { id: "thisMonth", label: t("reportsPage.quickPresets.thisMonth") },
        { id: "thisYear", label: t("reportsPage.quickPresets.thisYear") },
        { id: "thisHalfYear", label: t("reportsPage.quickPresets.thisHalfYear") },
      ]}
      dateRangePresetLabels={dict.common.dateRangePicker.presets}
      dateRangeCancelLabel={t("common.dateRangePicker.cancel")}
      dateRangeApplyLabel={t("common.dateRangePicker.apply")}
      fromStatusLabel={t("warehousePerformanceReportPage.fromStatusLabel")}
      fromStatusValue={t("warehousePerformanceReportPage.fromStatusValue")}
      toStatusLabel={t("warehousePerformanceReportPage.toStatusLabel")}
      toStatusValue={t("warehousePerformanceReportPage.toStatusValue")}
      warehousePlaceholder={t("warehousePerformanceReportPage.warehousePlaceholder")}
      deliveryCompaniesPlaceholder={t("warehousePerformanceReportPage.deliveryCompaniesPlaceholder")}
      paymentStatusPlaceholder={t("warehousePerformanceReportPage.paymentStatusPlaceholder")}
      paymentMethodsPlaceholder={t("warehousePerformanceReportPage.paymentMethodsPlaceholder")}
      countriesPlaceholder={t("warehousePerformanceReportPage.countriesPlaceholder")}
      citiesPlaceholder={t("warehousePerformanceReportPage.citiesPlaceholder")}
      applyFiltersLabel={t("warehousePerformanceReportPage.applyFilters")}
      ordersInRangeTitle={t("warehousePerformanceReportPage.ordersInRangeTitle")}
      ordersInRangeValue={t("warehousePerformanceReportPage.ordersInRangeValue")}
      ordersInRangeSubtitle={t("warehousePerformanceReportPage.ordersInRangeSubtitle")}
      avgTransitionTimeTitle={t("warehousePerformanceReportPage.avgTransitionTimeTitle")}
      fastestOrderTitle={t("warehousePerformanceReportPage.fastestOrderTitle")}
      slowestOrderTitle={t("warehousePerformanceReportPage.slowestOrderTitle")}
      distributionTitle={t("warehousePerformanceReportPage.distributionTitle")}
      distributionSubtitle={t("warehousePerformanceReportPage.distributionSubtitle")}
      distributionItems={[
        { id: "fast", label: t("warehousePerformanceReportPage.fast"), dotClassName: "bg-primary", count: 0 },
        { id: "moderate", label: t("warehousePerformanceReportPage.moderate"), dotClassName: "bg-warning", count: 0 },
        { id: "delayed", label: t("warehousePerformanceReportPage.delayed"), dotClassName: "bg-danger", count: 0 },
      ]}
      trendTitle={t("warehousePerformanceReportPage.trendTitle")}
      trendDataPointsLabel={t("warehousePerformanceReportPage.trendDataPoints")}
      carrierTitle={t("warehousePerformanceReportPage.carrierTitle")}
      carrierSubtitle={t("warehousePerformanceReportPage.carrierSubtitle")}
      carrierValueLabel={t("warehousePerformanceReportPage.carrierValueLabel")}
    />
  );
}
