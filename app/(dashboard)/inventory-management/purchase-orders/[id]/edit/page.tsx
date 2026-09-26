import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { EditPurchaseOrderForm } from "@/components/inventory-management/purchase-orders/edit/EditPurchaseOrderForm";
import { PURCHASE_ORDER_ROWS } from "@/lib/mock/purchase-orders";
import { getEditPurchaseOrderData } from "@/lib/mock/purchase-order-edit";

export default async function EditPurchaseOrderPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const row = PURCHASE_ORDER_ROWS.find((item) => item.id === "5") ?? PURCHASE_ORDER_ROWS[0];
  const data = getEditPurchaseOrderData(row);

  return (
    <EditPurchaseOrderForm
      breadcrumbRoot={t("nav.inventoryManagementChildren.purchaseOrders")}
      breadcrumbCurrent={t("editPurchaseOrderPage.breadcrumbCurrent")}
      formTitle={t("editPurchaseOrderPage.formTitle")}
      warehouseSectionTitle={t("addPurchaseOrderPage.warehouseSectionTitle")}
      warehouseSectionSubtitle={t("addPurchaseOrderPage.warehouseSectionSubtitle")}
      supplierLabel={t("addPurchaseOrderPage.supplierLabel")}
      addSupplierLabel={t("addPurchaseOrderPage.addSupplierLabel")}
      warehouseLabel={t("addPurchaseOrderPage.warehouseLabel")}
      deliveryDateLabel={t("addPurchaseOrderPage.deliveryDateLabel")}
      deliveryDatePlaceholder={t("addPurchaseOrderPage.deliveryDatePlaceholder")}
      receiverLabel={t("addPurchaseOrderPage.receiverLabel")}
      receiverPlaceholder={t("editPurchaseOrderPage.receiverPlaceholder")}
      emailToggleTitle={t("addPurchaseOrderPage.emailToggleTitle")}
      emailToggleDescription={t("addPurchaseOrderPage.emailToggleDescription")}
      selectProductsTitle={t("addPurchaseOrderPage.selectProductsTitle")}
      selectProductsSubtitle={t("addPurchaseOrderPage.selectProductsSubtitle")}
      selectProductsButton={t("addPurchaseOrderPage.selectProductsButton")}
      productColumns={{
        product: t("editPurchaseOrderPage.columns.product"),
        stockQty: t("editPurchaseOrderPage.columns.stockQty"),
        orderQty: t("editPurchaseOrderPage.columns.orderQty"),
        unitPrice: t("editPurchaseOrderPage.columns.unitPrice"),
        deliveryDate: t("editPurchaseOrderPage.columns.deliveryDate"),
        totalPrice: t("editPurchaseOrderPage.columns.totalPrice"),
      }}
      notesTitle={t("addPurchaseOrderPage.notesTitle")}
      notesSubtitle={t("addPurchaseOrderPage.notesSubtitle")}
      notesLabel={t("addPurchaseOrderPage.notesLabel")}
      notesPlaceholder={t("editPurchaseOrderPage.notesPlaceholder")}
      cancelLabel={t("addPurchaseOrderPage.cancel")}
      submitLabel={t("editPurchaseOrderPage.submit")}
      data={data}
    />
  );
}
