import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { Card } from "@/components/ui/Card";
import { WaybillsToolbar } from "@/components/waybills/WaybillsToolbar";
import { WaybillsTable } from "@/components/waybills/WaybillsTable";
import { WAYBILLS_LIST } from "@/lib/mock/waybills";
import { WAYBILL_TYPE_TONE } from "@/lib/utils/status-colors";

export default async function WaybillsShipmentsPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const rows = WAYBILLS_LIST.map((row) => ({
    id: row.id,
    rowNumber: row.rowNumber,
    trackingNumber: row.trackingNumber,
    clientName: row.clientName,
    connectService: row.connectService,
    orderNumber: row.orderNumber,
    createdBy: row.createdBy,
    type: { label: t(`status.waybill.${row.type}`), tone: WAYBILL_TYPE_TONE[row.type] },
    createdAtDisplay: row.createdAtDisplay,
  }));

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-zinc-900">{t("waybillsShipmentsPage.title")}</h1>

      <Card>
        <WaybillsToolbar
          searchPlaceholder={t("waybillsShipmentsPage.searchPlaceholder")}
          dateRangePresetLabels={dict.common.dateRangePicker.presets}
          dateRangeCancelLabel={t("common.dateRangePicker.cancel")}
          dateRangeApplyLabel={t("common.dateRangePicker.apply")}
          refreshLabel={t("waybillsShipmentsPage.refresh")}
          exportLabel={t("waybillsShipmentsPage.export")}
          addNewLabel={t("waybillsShipmentsPage.addNew")}
        />
        <WaybillsTable
          columns={{
            rowNumber: t("waybillsShipmentsPage.columns.rowNumber"),
            trackingNumber: t("waybillsShipmentsPage.columns.trackingNumber"),
            clientName: t("waybillsShipmentsPage.columns.clientName"),
            connectService: t("waybillsShipmentsPage.columns.connectService"),
            orderNumber: t("waybillsShipmentsPage.columns.orderNumber"),
            createdBy: t("waybillsShipmentsPage.columns.createdBy"),
            type: t("waybillsShipmentsPage.columns.type"),
            createdAt: t("waybillsShipmentsPage.columns.createdAt"),
            action: t("waybillsShipmentsPage.columns.action"),
          }}
          rows={rows}
        />
      </Card>
    </div>
  );
}
