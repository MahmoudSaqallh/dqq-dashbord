import { getServerLocale } from "@/lib/i18n/getServerLocale";
import { getDictionary } from "@/lib/i18n/dictionaries";
import { translate } from "@/lib/i18n/translate";
import { OrderDetailsView } from "@/components/orders/details/OrderDetailsView";
import { ORDER_DETAILS } from "@/lib/mock/order-details";
import { DQQ_STATUS_TONE, PAYMENT_STATUS_TONE, STORE_STATUS_TONE } from "@/lib/utils/status-colors";

export default async function OrderDetailsPage() {
  const locale = await getServerLocale();
  const dict = getDictionary(locale);
  const t = (key: string) => translate(dict, key);

  const order = ORDER_DETAILS;

  return (
    <OrderDetailsView
      breadcrumbRoot={t("ordersPage.title")}
      breadcrumbSuffix={t("orderDetailsPage.breadcrumbSuffix")}
      refreshLabel={t("orderDetailsPage.refresh")}
      actionsLabel={t("orderDetailsPage.actions")}
      order={order}
      orderStatus={{ label: t(`status.store.${order.orderStatus}`), tone: STORE_STATUS_TONE[order.orderStatus] }}
      dqqStatus={{ label: t(`status.dqq.${order.dqqStatus}`), tone: DQQ_STATUS_TONE[order.dqqStatus] }}
      paymentStatus={{
        label: t(`ordersPage.payment.${order.paymentStatus}`),
        tone: PAYMENT_STATUS_TONE[order.paymentStatus],
      }}
      labels={{
        orderDetailsTitle: t("orderDetailsPage.orderDetailsTitle"),
        orderNumber: t("orderDetailsPage.orderNumber"),
        storeName: t("orderDetailsPage.storeName"),
        date: t("orderDetailsPage.date"),
        orderStatus: t("orderDetailsPage.orderStatus"),
        dqqStatus: t("orderDetailsPage.dqqStatus"),
        paymentStatus: t("orderDetailsPage.paymentStatus"),
        productsTitle: t("orderDetailsPage.productsTitle"),
        columns: {
          products: t("orderDetailsPage.columns.products"),
          type: t("orderDetailsPage.columns.type"),
          price: t("orderDetailsPage.columns.price"),
          quantity: t("orderDetailsPage.columns.quantity"),
          total: t("orderDetailsPage.columns.total"),
        },
        billTitle: t("orderDetailsPage.billTitle"),
        subtotal: t("orderDetailsPage.subtotal"),
        deliveryCost: t("orderDetailsPage.deliveryCost"),
        coupon: t("orderDetailsPage.coupon"),
        total: t("orderDetailsPage.total"),
        assignedEmployeeTitle: t("orderDetailsPage.assignedEmployeeTitle"),
        unassigned: t("orderDetailsPage.unassigned"),
        customerTitle: t("orderDetailsPage.customerTitle"),
        mobileNumber: t("orderDetailsPage.mobileNumber"),
        country: t("orderDetailsPage.country"),
        city: t("orderDetailsPage.city"),
        shippingAddressTitle: t("orderDetailsPage.shippingAddressTitle"),
        shippingCompany: t("orderDetailsPage.shippingCompany"),
        tracking: t("orderDetailsPage.tracking"),
      }}
    />
  );
}
