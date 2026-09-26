import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { PrinterSettingsView } from "@/components/settings/printer/PrinterSettingsView";
import { PRINTER_ACCOUNT_INFO, PRINTER_DEVICE_ROWS } from "@/lib/mock/printer";

export default async function SettingsPrinterPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const rows = PRINTER_DEVICE_ROWS.map((row) => ({
    id: row.id,
    rowNumber: row.rowNumber,
    computerId: row.computerId,
    name: row.name,
    hostName: row.hostName,
    status: { label: t(`status.printerDevice.${row.status}`), code: row.status },
    version: row.version,
    printersLabel: `${row.printersCount} ${t("settingsPrinterPage.printersUnit")}`,
  }));

  return (
    <PrinterSettingsView
      breadcrumbRoot={t("nav.settings")}
      breadcrumbCurrent={t("settingsPrinterPage.breadcrumbCurrent")}
      accountTitle={t("settingsPrinterPage.accountTitle")}
      accountInfo={PRINTER_ACCOUNT_INFO}
      accountLabels={{
        accountId: t("settingsPrinterPage.accountId"),
        firstName: t("settingsPrinterPage.firstName"),
        lastName: t("settingsPrinterPage.lastName"),
        email: t("settingsPrinterPage.email"),
        createdDate: t("settingsPrinterPage.createdDate"),
      }}
      devicesTitle={t("settingsPrinterPage.devicesTitle")}
      searchPlaceholder={t("settingsPrinterPage.searchPlaceholder")}
      filtersLabel={t("settingsPrinterPage.filters")}
      statusFilterLabel={t("settingsPrinterPage.columns.status")}
      statusFilterOptions={[t("status.printerDevice.connected"), t("status.printerDevice.disconnected")]}
      syncLabel={t("settingsPrinterPage.sync")}
      columns={{
        rowNumber: t("settingsPrinterPage.columns.rowNumber"),
        computerId: t("settingsPrinterPage.columns.computerId"),
        name: t("settingsPrinterPage.columns.name"),
        hostName: t("settingsPrinterPage.columns.hostName"),
        status: t("settingsPrinterPage.columns.status"),
        version: t("settingsPrinterPage.columns.version"),
        printers: t("settingsPrinterPage.columns.printers"),
        action: t("settingsPrinterPage.columns.action"),
      }}
      rows={rows}
      showingLabel={t("settingsPrinterPage.showing")}
      ofLabel={t("settingsPrinterPage.of")}
      entriesLabel={t("settingsPrinterPage.entries")}
    />
  );
}
