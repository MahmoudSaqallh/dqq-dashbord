import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { Card } from "@/components/ui/Card";
import { PickingListFiltersSection } from "@/components/picking-list/PickingListFiltersSection";
import { PickingListTable } from "@/components/picking-list/PickingListTable";
import { PICKING_LIST } from "@/lib/mock/picking-list";
import { PICKING_STATUS_TONE } from "@/lib/utils/status-colors";

export default async function PickingListPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const filterOptions = dict.pickingListPage.filterOptions;
  const filters = [
    { label: t("pickingListPage.filterStatus"), options: filterOptions.status },
    { label: t("pickingListPage.filterEmployee"), options: filterOptions.employee },
    { label: t("pickingListPage.filterWarehouse"), options: filterOptions.warehouse },
  ];

  const dateRangePresetLabels = dict.common.dateRangePicker.presets;

  const rows = PICKING_LIST.map((row) => ({
    id: row.id,
    rowNumber: row.rowNumber,
    pickedId: row.pickedId,
    employee: row.employee ?? "-",
    createDateDisplay: row.createDateDisplay,
    pickedDateDisplay: row.pickedDateDisplay ?? "-",
    warehouse: row.warehouse,
    ordersCount: row.ordersCount,
    productsCount: row.productsCount,
    qtyOfProducts: row.qtyOfProducts,
    status: { label: t(`status.picking.${row.status}`), tone: PICKING_STATUS_TONE[row.status] },
  }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-center text-2xl font-bold text-zinc-900">{t("pickingListPage.title")}</h1>

      <Card>
        <PickingListFiltersSection
          searchPlaceholder={t("pickingListPage.searchPlaceholder")}
          dateRangePresetLabels={dateRangePresetLabels}
          dateRangeCancelLabel={t("common.dateRangePicker.cancel")}
          dateRangeApplyLabel={t("common.dateRangePicker.apply")}
          filtersLabel={t("pickingListPage.filters")}
          refreshLabel={t("pickingListPage.refresh")}
          exportLabel={t("pickingListPage.export")}
          filters={filters}
        />
        <PickingListTable
          columns={{
            rowNumber: t("pickingListPage.columns.rowNumber"),
            pickedId: t("pickingListPage.columns.pickedId"),
            employee: t("pickingListPage.columns.employee"),
            createDate: t("pickingListPage.columns.createDate"),
            pickedDate: t("pickingListPage.columns.pickedDate"),
            warehouse: t("pickingListPage.columns.warehouse"),
            orders: t("pickingListPage.columns.orders"),
            products: t("pickingListPage.columns.products"),
            qtyOfProducts: t("pickingListPage.columns.qtyOfProducts"),
            status: t("pickingListPage.columns.status"),
            action: t("pickingListPage.columns.action"),
          }}
          rows={rows}
        />
      </Card>
    </div>
  );
}
