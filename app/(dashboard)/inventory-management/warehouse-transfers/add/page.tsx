import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { AddWarehouseTransferForm } from "@/components/inventory-management/warehouse-transfers/create/AddWarehouseTransferForm";
import { WAREHOUSE_ROWS } from "@/lib/mock/warehouses";
import { EMPLOYEE_ROWS } from "@/lib/mock/employees";

export default async function AddWarehouseTransferPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <AddWarehouseTransferForm
      breadcrumbRoot={t("nav.inventoryManagementChildren.warehouseTransfers")}
      breadcrumbCurrent={t("addWarehouseTransferPage.breadcrumbCurrent")}
      formTitle={t("addWarehouseTransferPage.formTitle")}
      warehouseSectionTitle={t("addWarehouseTransferPage.warehouseSectionTitle")}
      warehouseSectionSubtitle={t("addWarehouseTransferPage.warehouseSectionSubtitle")}
      warehouseFromLabel={t("addWarehouseTransferPage.warehouseFromLabel")}
      warehouseFromPlaceholder={t("addWarehouseTransferPage.warehousePlaceholder")}
      warehouseOptions={WAREHOUSE_ROWS.map((row) => ({ value: row.id, label: row.name }))}
      warehouseToLabel={t("addWarehouseTransferPage.warehouseToLabel")}
      shippingCompanyLabel={t("addWarehouseTransferPage.shippingCompanyLabel")}
      shippingCompanyPlaceholder={t("addWarehouseTransferPage.shippingCompanyPlaceholder")}
      optionsSectionTitle={t("addWarehouseTransferPage.optionsSectionTitle")}
      optionsSectionSubtitle={t("addWarehouseTransferPage.optionsSectionSubtitle")}
      priorityLabel={t("addWarehouseTransferPage.priorityLabel")}
      priorityPlaceholder={t("addWarehouseTransferPage.priorityPlaceholder")}
      priorityOptions={[
        { value: "low", label: t("warehouseTransfersPage.priority.low") },
        { value: "medium", label: t("warehouseTransfersPage.priority.medium") },
        { value: "high", label: t("warehouseTransfersPage.priority.high") },
      ]}
      senderEmployeeLabel={t("addWarehouseTransferPage.senderEmployeeLabel")}
      receiverEmployeeLabel={t("addWarehouseTransferPage.receiverEmployeeLabel")}
      employeeOptions={EMPLOYEE_ROWS.map((row) => ({ value: row.id, label: row.name }))}
      employeePlaceholder={t("addWarehouseTransferPage.employeePlaceholder")}
      notesLabel={t("addWarehouseTransferPage.notesLabel")}
      notesPlaceholder={t("addWarehouseTransferPage.notesPlaceholder")}
      selectProductsTitle={t("addWarehouseTransferPage.selectProductsTitle")}
      selectProductsSubtitle={t("addWarehouseTransferPage.selectProductsSubtitle")}
      selectProductsButton={t("addWarehouseTransferPage.selectProductsButton")}
      warehouseFromLockLabel={t("addWarehouseTransferPage.warehouseFromLabel")}
      noProductsSelectedTitle={t("addWarehouseTransferPage.noProductsSelectedTitle")}
      noProductsSelectedSubtitle={t("addWarehouseTransferPage.noProductsSelectedSubtitle")}
      cancelLabel={t("addWarehouseTransferPage.cancel")}
      submitLabel={t("addWarehouseTransferPage.submit")}
    />
  );
}
