import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { AddPurchaseOrderForm } from "@/components/inventory-management/purchase-orders/create/AddPurchaseOrderForm";
import { WAREHOUSE_ROWS } from "@/lib/mock/warehouses";
import { EMPLOYEE_ROWS } from "@/lib/mock/employees";

export default async function AddPurchaseOrderPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <AddPurchaseOrderForm
      breadcrumbRoot={t("nav.inventoryManagementChildren.purchaseOrders")}
      breadcrumbCurrent={t("addPurchaseOrderPage.breadcrumbCurrent")}
      formTitle={t("addPurchaseOrderPage.formTitle")}
      warehouseSectionTitle={t("addPurchaseOrderPage.warehouseSectionTitle")}
      warehouseSectionSubtitle={t("addPurchaseOrderPage.warehouseSectionSubtitle")}
      supplierLabel={t("addPurchaseOrderPage.supplierLabel")}
      supplierOptions={[{ value: "test", label: "test" }]}
      addSupplierLabel={t("addPurchaseOrderPage.addSupplierLabel")}
      warehouseLabel={t("addPurchaseOrderPage.warehouseLabel")}
      warehouseOptions={WAREHOUSE_ROWS.map((row) => ({ value: row.id, label: row.name }))}
      deliveryDateLabel={t("addPurchaseOrderPage.deliveryDateLabel")}
      deliveryDatePlaceholder={t("addPurchaseOrderPage.deliveryDatePlaceholder")}
      receiverLabel={t("addPurchaseOrderPage.receiverLabel")}
      receiverOptions={EMPLOYEE_ROWS.map((row) => ({ value: row.id, label: row.name }))}
      emailToggleTitle={t("addPurchaseOrderPage.emailToggleTitle")}
      emailToggleDescription={t("addPurchaseOrderPage.emailToggleDescription")}
      selectProductsTitle={t("addPurchaseOrderPage.selectProductsTitle")}
      selectProductsSubtitle={t("addPurchaseOrderPage.selectProductsSubtitle")}
      selectProductsButton={t("addPurchaseOrderPage.selectProductsButton")}
      warehouseLockLabel={t("addPurchaseOrderPage.warehouseLockLabel")}
      noProductsSelectedTitle={t("addPurchaseOrderPage.noProductsSelectedTitle")}
      noProductsSelectedSubtitle={t("addPurchaseOrderPage.noProductsSelectedSubtitle")}
      notesTitle={t("addPurchaseOrderPage.notesTitle")}
      notesSubtitle={t("addPurchaseOrderPage.notesSubtitle")}
      notesLabel={t("addPurchaseOrderPage.notesLabel")}
      selectProductsLockLabel={t("addPurchaseOrderPage.selectProductsLockLabel")}
      cancelLabel={t("addPurchaseOrderPage.cancel")}
      submitLabel={t("addPurchaseOrderPage.submit")}
    />
  );
}
