import { TrendingUp, Warehouse, Route, Clock, Truck } from "lucide-react";
import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { ReportsView } from "@/components/reports/ReportsView";

export default async function ReportsPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <ReportsView
      title={t("reportsPage.title")}
      filtersLabel={t("reportsPage.filters")}
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
      systemReportsTitle={t("reportsPage.systemReportsTitle")}
      systemReports={[
        {
          id: "stock-increase-record",
          icon: TrendingUp,
          title: t("reportsPage.reports.stockIncreaseRecord.title"),
          subtitle: t("reportsPage.reports.stockIncreaseRecord.subtitle"),
          href: "/reorder-products",
        },
        {
          id: "stock-report",
          icon: Warehouse,
          title: t("reportsPage.reports.stockReport.title"),
          subtitle: t("reportsPage.reports.stockReport.subtitle"),
        },
        {
          id: "return-tracing-reports",
          icon: Route,
          title: t("reportsPage.reports.returnTracingReports.title"),
          subtitle: t("reportsPage.reports.returnTracingReports.subtitle"),
        },
        {
          id: "warehouse-performance-report",
          icon: Clock,
          title: t("reportsPage.reports.warehousePerformanceReport.title"),
          subtitle: t("reportsPage.reports.warehousePerformanceReport.subtitle"),
          href: "/warehouse-performance-report",
        },
        {
          id: "shipping-summary-report",
          icon: Truck,
          title: t("reportsPage.reports.shippingSummaryReport.title"),
          subtitle: t("reportsPage.reports.shippingSummaryReport.subtitle"),
        },
      ]}
    />
  );
}
