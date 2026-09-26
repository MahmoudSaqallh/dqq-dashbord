import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { CreateOrderForm } from "@/components/orders/create/CreateOrderForm";
import { CREATE_ORDER_LOCATION, CREATE_ORDER_PRODUCT_ROWS } from "@/lib/mock/create-order";

export default async function CreateOrderPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  return (
    <CreateOrderForm
      breadcrumbRoot={t("ordersPage.title")}
      breadcrumbCurrent={t("createOrderPage.breadcrumbCurrent")}
      formTitle={t("createOrderPage.formTitle")}
      orderDetailsTitle={t("createOrderPage.orderDetailsTitle")}
      orderDetailsSubtitle={t("createOrderPage.orderDetailsSubtitle")}
      clientIntegrateLabel={t("createOrderPage.clientIntegrateLabel")}
      clientIntegrateOptions={[{ value: "dqqapp", label: "dqqapp" }]}
      warehouseLabel={t("createOrderPage.warehouseLabel")}
      warehouseOptions={[{ value: "warehouse-3", label: "مخزن دقق 3" }]}
      tagsLabel={t("createOrderPage.tagsLabel")}
      tagsPlaceholder={t("createOrderPage.tagsPlaceholder")}
      noteLabel={t("createOrderPage.noteLabel")}
      notePlaceholder={t("createOrderPage.notePlaceholder")}
      selectProductsTitle={t("createOrderPage.selectProductsTitle")}
      selectProductsSubtitle={t("createOrderPage.selectProductsSubtitle")}
      selectProductsButton={t("createOrderPage.selectProductsButton")}
      productColumns={{
        product: t("createOrderPage.columns.product"),
        availableStock: t("createOrderPage.columns.availableStock"),
        quantity: t("createOrderPage.columns.quantity"),
        unitPrice: t("createOrderPage.columns.unitPrice"),
        totalPrice: t("createOrderPage.columns.totalPrice"),
      }}
      productRows={CREATE_ORDER_PRODUCT_ROWS}
      customerDetailsTitle={t("createOrderPage.customerDetailsTitle")}
      customerDetailsSubtitle={t("createOrderPage.customerDetailsSubtitle")}
      selectCustomerLabel={t("createOrderPage.selectCustomerLabel")}
      customerOptions={[{ value: "ahmed-mousa", label: "احمد موسى" }]}
      addNewCustomerLabel={t("createOrderPage.addNewCustomer")}
      currencyLabel={t("createOrderPage.currencyLabel")}
      currencyPlaceholder={t("createOrderPage.currencyPlaceholder")}
      locationsLabel={t("createOrderPage.locationsLabel")}
      newLocationLabel={t("createOrderPage.newLocation")}
      location={CREATE_ORDER_LOCATION}
      deliveryCompanyTitle={t("createOrderPage.deliveryCompanyTitle")}
      deliveryCompanySubtitle={t("createOrderPage.deliveryCompanySubtitle")}
      deliveryCompanyLabel={t("createOrderPage.deliveryCompanyLabel")}
      deliveryCompanyPlaceholder={t("createOrderPage.deliveryCompanyPlaceholder")}
      paymentMethodLabel={t("createOrderPage.paymentMethodLabel")}
      paymentMethodPlaceholder={t("createOrderPage.paymentMethodPlaceholder")}
      cancelLabel={t("createOrderPage.cancel")}
      submitLabel={t("createOrderPage.submit")}
    />
  );
}
