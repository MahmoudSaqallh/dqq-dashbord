import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { WarehousesView } from "@/components/warehouses/WarehousesView";
import { WAREHOUSE_ROWS } from "@/lib/mock/warehouses";
import { MERGED_WAREHOUSE_GROUPS } from "@/lib/mock/merged-warehouses";

export default async function WarehousesPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <WarehousesView
      breadcrumbRoot={t("warehousesPage.breadcrumbRoot")}
      breadcrumbCurrent={t("nav.warehouses")}
      warehousesLabel={t("warehousesPage.warehousesTab")}
      mergedLabel={t("warehousesPage.mergedTab")}
      searchPlaceholder={t("warehousesPage.searchPlaceholder")}
      refreshLabel={t("warehousesPage.refresh")}
      mergeLabel={t("warehousesPage.merge")}
      addNewLabel={t("warehousesPage.addNew")}
      columns={{
        rowNumber: t("warehousesPage.columns.rowNumber"),
        name: t("warehousesPage.columns.name"),
        countryCity: t("warehousesPage.columns.countryCity"),
        address1: t("warehousesPage.columns.address1"),
        shortAddress: t("warehousesPage.columns.shortAddress"),
        createdAt: t("warehousesPage.columns.createdAt"),
        store: t("warehousesPage.columns.store"),
        channel: t("warehousesPage.columns.channel"),
        enableInventoryLocation: t("warehousesPage.columns.enableInventoryLocation"),
        action: t("warehousesPage.columns.action"),
      }}
      rows={WAREHOUSE_ROWS}
      mergedColumns={{
        rowNumber: t("warehousesPage.columns.rowNumber"),
        warehouse: t("warehousesPage.mergedColumns.warehouse"),
        store: t("warehousesPage.columns.store"),
        countryCity: t("warehousesPage.columns.countryCity"),
        address1: t("warehousesPage.columns.address1"),
        createdAt: t("warehousesPage.columns.createdAt"),
        channel: t("warehousesPage.columns.channel"),
      }}
      mergedGroupColumns={{
        action: t("warehousesPage.columns.action"),
        toggle: t("warehousesPage.mergedColumns.toggle"),
      }}
      mergedGroups={MERGED_WAREHOUSE_GROUPS}
      showingLabel={t("warehousesPage.showing")}
      ofLabel={t("warehousesPage.of")}
      entriesLabel={t("warehousesPage.entries")}
      mergeModalLabels={{
        title: t("warehousesPage.mergeModal.title"),
        cityLabel: t("warehousesPage.mergeModal.cityLabel"),
        cityPlaceholder: t("warehousesPage.mergeModal.cityPlaceholder"),
        showOrderLabel: t("warehousesPage.mergeModal.showOrderLabel"),
        cancel: t("warehousesPage.mergeModal.cancel"),
        submit: t("warehousesPage.mergeModal.submit"),
      }}
      addWarehouseLabels={{
        title: t("warehousesPage.addModal.title"),
        informationsSection: t("warehousesPage.addModal.informationsSection"),
        clientIntegrate: t("warehousesPage.addModal.clientIntegrate"),
        selectPlaceholder: t("warehousesPage.addModal.selectPlaceholder"),
        required: t("warehousesPage.addModal.required"),
        warehouseName: t("warehousesPage.addModal.warehouseName"),
        warehouseNamePlaceholder: t("warehousesPage.addModal.warehouseNamePlaceholder"),
        referenceId: t("warehousesPage.addModal.referenceId"),
        referenceIdPlaceholder: t("warehousesPage.addModal.referenceIdPlaceholder"),
        mobileNumber: t("warehousesPage.addModal.mobileNumber"),
        mobileNumberPlaceholder: t("warehousesPage.addModal.mobileNumberPlaceholder"),
        addressSection: t("warehousesPage.addModal.addressSection"),
        country: t("warehousesPage.addModal.country"),
        city: t("warehousesPage.addModal.city"),
        cityPlaceholder: t("warehousesPage.addModal.cityPlaceholder"),
        address1: t("warehousesPage.addModal.address1"),
        address1Placeholder: t("warehousesPage.addModal.address1Placeholder"),
        address2: t("warehousesPage.addModal.address2"),
        address2Optional: t("warehousesPage.addModal.address2Optional"),
        address2Placeholder: t("warehousesPage.addModal.address2Placeholder"),
        shortAddress: t("warehousesPage.addModal.shortAddress"),
        shortAddressPlaceholder: t("warehousesPage.addModal.shortAddressPlaceholder"),
        cancel: t("warehousesPage.addModal.cancel"),
        submit: t("warehousesPage.addModal.submit"),
      }}
    />
  );
}
