import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { StockIncreaseRecordView } from "@/components/reports/stock-increase-record/StockIncreaseRecordView";

export default async function ReorderProductsPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <StockIncreaseRecordView
      breadcrumbRoot={t("reportsPage.title")}
      breadcrumbCurrent={t("stockIncreaseRecordPage.breadcrumbCurrent")}
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
      searchPlaceholder={t("stockIncreaseRecordPage.searchPlaceholder")}
      refreshLabel={t("stockIncreaseRecordPage.refresh")}
      clientPlaceholder={t("stockIncreaseRecordPage.clientPlaceholder")}
      exportImportLabel={t("stockIncreaseRecordPage.exportImport")}
      columns={{
        rowNumber: t("stockIncreaseRecordPage.columns.rowNumber"),
        image: t("stockIncreaseRecordPage.columns.image"),
        productName: t("stockIncreaseRecordPage.columns.productName"),
        sku: t("stockIncreaseRecordPage.columns.sku"),
        barcode: t("stockIncreaseRecordPage.columns.barcode"),
        clientName: t("stockIncreaseRecordPage.columns.clientName"),
        warehouseName: t("stockIncreaseRecordPage.columns.warehouseName"),
        quantity: t("stockIncreaseRecordPage.columns.quantity"),
        employeeName: t("stockIncreaseRecordPage.columns.employeeName"),
        createdAt: t("stockIncreaseRecordPage.columns.createdAt"),
      }}
      emptyLabel={t("stockIncreaseRecordPage.emptyData")}
      showingLabel={t("stockIncreaseRecordPage.showing")}
      ofLabel={t("stockIncreaseRecordPage.of")}
      entriesLabel={t("stockIncreaseRecordPage.entries")}
    />
  );
}
