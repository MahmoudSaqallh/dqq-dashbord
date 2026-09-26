import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { DqqSettingsView } from "@/components/settings/dqq-settings/DqqSettingsView";
import { WAREHOUSE_PRIORITY_ROWS } from "@/lib/mock/warehouse-priority";

export default async function SettingsDqqSettingsPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <DqqSettingsView
      title={t("dqqSettingsPage.title")}
      tabs={[
        { id: "notification", label: t("dqqSettingsPage.tabs.notificationSetting") },
        { id: "orders", label: t("dqqSettingsPage.tabs.ordersSetting") },
        { id: "app", label: t("dqqSettingsPage.tabs.appSettings") },
        { id: "statusMapping", label: t("dqqSettingsPage.tabs.statusMapping") },
        { id: "warehousePriority", label: t("dqqSettingsPage.tabs.warehousePriority") },
      ]}
      labels={{
        newNotify: t("dqqSettingsPage.newNotify"),
        reparingNotify: t("dqqSettingsPage.reparingNotify"),
        readyNotify: t("dqqSettingsPage.readyNotify"),
        daysNotify: t("dqqSettingsPage.daysNotify"),
        submit: t("dqqSettingsPage.submit"),
        comingSoon: t("dqqSettingsPage.comingSoon"),
      }}
      ordersRows={[
        {
          id: "increaseInventory",
          title: t("dqqSettingsPage.ordersSettings.increaseInventory.title"),
          description: t("dqqSettingsPage.ordersSettings.increaseInventory.description"),
          defaultChecked: false,
        },
        {
          id: "syncInventoriesStore",
          title: t("dqqSettingsPage.ordersSettings.syncInventoriesStore.title"),
          description: t("dqqSettingsPage.ordersSettings.syncInventoriesStore.description"),
          defaultChecked: true,
        },
        {
          id: "autoHoldInvalidAddress",
          title: t("dqqSettingsPage.ordersSettings.autoHoldInvalidAddress.title"),
          description: t("dqqSettingsPage.ordersSettings.autoHoldInvalidAddress.description"),
          defaultChecked: false,
        },
        {
          id: "autoHoldUnsupportedCity",
          title: t("dqqSettingsPage.ordersSettings.autoHoldUnsupportedCity.title"),
          description: t("dqqSettingsPage.ordersSettings.autoHoldUnsupportedCity.description"),
          defaultChecked: false,
        },
        {
          id: "autoHoldOutOfStock",
          title: t("dqqSettingsPage.ordersSettings.autoHoldOutOfStock.title"),
          description: t("dqqSettingsPage.ordersSettings.autoHoldOutOfStock.description"),
          defaultChecked: false,
        },
        {
          id: "autoHoldMissingShortAddress",
          title: t("dqqSettingsPage.ordersSettings.autoHoldMissingShortAddress.title"),
          description: t("dqqSettingsPage.ordersSettings.autoHoldMissingShortAddress.description"),
          defaultChecked: false,
        },
      ]}
      ordersWorkflow={{
        title: t("dqqSettingsPage.ordersSettings.workflow.title"),
        description: t("dqqSettingsPage.ordersSettings.workflow.description"),
      }}
      appSettingsLabels={{
        sectionTitle: t("dqqSettingsPage.appSettings.sectionTitle"),
        sectionSubtitle: t("dqqSettingsPage.appSettings.sectionSubtitle"),
        storeStatus: {
          title: t("dqqSettingsPage.appSettings.storeStatus.title"),
          description: t("dqqSettingsPage.appSettings.storeStatus.description"),
          options: [
            { value: "new", label: t("dqqSettingsPage.appSettings.storeStatus.options.new") },
            { value: "ready", label: t("dqqSettingsPage.appSettings.storeStatus.options.ready") },
            { value: "preparing", label: t("dqqSettingsPage.appSettings.storeStatus.options.preparing") },
          ],
        },
        employeeAssignment: {
          title: t("dqqSettingsPage.appSettings.employeeAssignment.title"),
          description: t("dqqSettingsPage.appSettings.employeeAssignment.description"),
        },
        checkProduct: {
          title: t("dqqSettingsPage.appSettings.checkProduct.title"),
          description: t("dqqSettingsPage.appSettings.checkProduct.description"),
          options: [
            { value: "sku", label: t("dqqSettingsPage.appSettings.checkProduct.options.sku") },
            { value: "barcode", label: t("dqqSettingsPage.appSettings.checkProduct.options.barcode") },
            { value: "both", label: t("dqqSettingsPage.appSettings.checkProduct.options.both") },
          ],
        },
        deliveryOfRepresentatives: {
          title: t("dqqSettingsPage.appSettings.deliveryOfRepresentatives.title"),
          description: t("dqqSettingsPage.appSettings.deliveryOfRepresentatives.description"),
        },
      }}
      statusMappingLabels={{
        title: t("dqqSettingsPage.statusMapping.title"),
        subtitle: t("dqqSettingsPage.statusMapping.subtitle"),
        defaultButton: t("dqqSettingsPage.statusMapping.defaultButton"),
        syncStatusButton: t("dqqSettingsPage.statusMapping.syncStatusButton"),
        columns: {
          zidStatus: t("dqqSettingsPage.statusMapping.columns.zidStatus"),
          storeStatus: t("dqqSettingsPage.statusMapping.columns.storeStatus"),
          status: t("dqqSettingsPage.statusMapping.columns.status"),
        },
        empty: t("dqqSettingsPage.statusMapping.empty"),
        save: t("dqqSettingsPage.statusMapping.save"),
      }}
      storeNameEn="dqqapp"
      storeNameAr="متجر تجريبي"
      warehousePriorityLabels={{
        title: t("dqqSettingsPage.warehousePriority.title"),
        subtitle: t("dqqSettingsPage.warehousePriority.subtitle"),
        columns: {
          priority: t("dqqSettingsPage.warehousePriority.columns.priority"),
          warehouse: t("dqqSettingsPage.warehousePriority.columns.warehouse"),
          active: t("dqqSettingsPage.warehousePriority.columns.active"),
        },
        layerUnit: t("dqqSettingsPage.warehousePriority.layerUnit"),
      }}
      warehousePriorityRows={WAREHOUSE_PRIORITY_ROWS}
    />
  );
}
