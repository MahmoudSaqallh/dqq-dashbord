import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { EditWarehouseTransferForm } from "@/components/inventory-management/warehouse-transfers/edit/EditWarehouseTransferForm";
import { WAREHOUSE_TRANSFER_ROWS } from "@/lib/mock/warehouse-transfers";
import { getEditWarehouseTransferData } from "@/lib/mock/warehouse-transfer-edit";

export default async function EditWarehouseTransferPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const row = WAREHOUSE_TRANSFER_ROWS.find((item) => item.id === "4") ?? WAREHOUSE_TRANSFER_ROWS[0];
  const data = getEditWarehouseTransferData(row);

  return (
    <EditWarehouseTransferForm
      breadcrumbRoot={t("nav.inventoryManagementChildren.warehouseTransfers")}
      breadcrumbCurrent={t("editWarehouseTransferPage.breadcrumbCurrent")}
      formTitle={t("addWarehouseTransferPage.formTitle")}
      warehouseSectionTitle={t("addWarehouseTransferPage.warehouseSectionTitle")}
      warehouseSectionSubtitle={t("addWarehouseTransferPage.warehouseSectionSubtitle")}
      warehouseFromLabel={t("addWarehouseTransferPage.warehouseFromLabel")}
      warehouseToLabel={t("addWarehouseTransferPage.warehouseToLabel")}
      shippingCompanyLabel={t("addWarehouseTransferPage.shippingCompanyLabel")}
      shippingCompanyPlaceholder={t("addWarehouseTransferPage.shippingCompanyPlaceholder")}
      optionsSectionTitle={t("addWarehouseTransferPage.optionsSectionTitle")}
      optionsSectionSubtitle={t("addWarehouseTransferPage.optionsSectionSubtitle")}
      priorityLabel={t("addWarehouseTransferPage.priorityLabel")}
      priorityOptions={[
        { value: "low", label: t("warehouseTransfersPage.priority.low") },
        { value: "medium", label: t("warehouseTransfersPage.priority.medium") },
        { value: "high", label: t("warehouseTransfersPage.priority.high") },
      ]}
      senderEmployeeLabel={t("addWarehouseTransferPage.senderEmployeeLabel")}
      receiverEmployeeLabel={t("addWarehouseTransferPage.receiverEmployeeLabel")}
      employeePlaceholder={t("addWarehouseTransferPage.employeePlaceholder")}
      notesLabel={t("addWarehouseTransferPage.notesLabel")}
      notesPlaceholder={t("addWarehouseTransferPage.notesPlaceholder")}
      selectProductsTitle={t("addWarehouseTransferPage.selectProductsTitle")}
      selectProductsSubtitle={t("addWarehouseTransferPage.selectProductsSubtitle")}
      selectProductsButton={t("addWarehouseTransferPage.selectProductsButton")}
      productColumns={{
        product: t("editWarehouseTransferPage.columns.product"),
        stockQty: t("editWarehouseTransferPage.columns.stockQty"),
        transferQty: t("editWarehouseTransferPage.columns.transferQty"),
      }}
      cancelLabel={t("addWarehouseTransferPage.cancel")}
      submitLabel={t("editWarehouseTransferPage.submit")}
      data={data}
    />
  );
}
