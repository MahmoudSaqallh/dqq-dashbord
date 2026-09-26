import { OrderDetailsHeader } from "./OrderDetailsHeader";
import { OrderInfoCard } from "./OrderInfoCard";
import { OrderProductsCard } from "./OrderProductsCard";
import { OrderBillCard } from "./OrderBillCard";
import { AssignedEmployeeCard } from "./AssignedEmployeeCard";
import { OrderCustomerCard } from "./OrderCustomerCard";
import { OrderShippingAddressCard } from "./OrderShippingAddressCard";
import type { OrderDetails } from "@/lib/mock/types";
import type { StatusTone } from "@/lib/utils/status-colors";

export function OrderDetailsView({
  breadcrumbRoot,
  breadcrumbSuffix,
  refreshLabel,
  actionsLabel,
  order,
  orderStatus,
  dqqStatus,
  paymentStatus,
  labels,
}: {
  breadcrumbRoot: string;
  breadcrumbSuffix: string;
  refreshLabel: string;
  actionsLabel: string;
  order: OrderDetails;
  orderStatus: { label: string; tone: StatusTone };
  dqqStatus: { label: string; tone: StatusTone };
  paymentStatus: { label: string; tone: StatusTone };
  labels: {
    orderDetailsTitle: string;
    orderNumber: string;
    storeName: string;
    date: string;
    orderStatus: string;
    dqqStatus: string;
    paymentStatus: string;
    productsTitle: string;
    columns: { products: string; type: string; price: string; quantity: string; total: string };
    billTitle: string;
    subtotal: string;
    deliveryCost: string;
    coupon: string;
    total: string;
    assignedEmployeeTitle: string;
    unassigned: string;
    customerTitle: string;
    mobileNumber: string;
    country: string;
    city: string;
    shippingAddressTitle: string;
    shippingCompany: string;
    tracking: string;
  };
}) {
  return (
    <div className="flex flex-col gap-6">
      <OrderDetailsHeader
        breadcrumbRoot={breadcrumbRoot}
        breadcrumbSuffix={breadcrumbSuffix}
        orderNumber={order.orderNumber}
        refreshLabel={refreshLabel}
        actionsLabel={actionsLabel}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
        <div className="flex flex-col gap-6">
          <OrderInfoCard
            title={labels.orderDetailsTitle}
            orderNumberLabel={labels.orderNumber}
            orderNumber={order.orderNumber}
            storeNameLabel={labels.storeName}
            storeName={order.storeName}
            dateLabel={labels.date}
            dateDisplay={order.dateDisplay}
            orderStatusLabel={labels.orderStatus}
            orderStatus={orderStatus}
            dqqStatusLabel={labels.dqqStatus}
            dqqStatus={dqqStatus}
            paymentStatusLabel={labels.paymentStatus}
            paymentStatus={paymentStatus}
          />

          <OrderProductsCard title={labels.productsTitle} columns={labels.columns} products={order.products} />

          <OrderBillCard
            title={labels.billTitle}
            subtotalLabel={labels.subtotal}
            deliveryCostLabel={labels.deliveryCost}
            couponLabel={labels.coupon}
            totalLabel={labels.total}
            bill={order.bill}
          />
        </div>

        <div className="flex flex-col gap-6">
          <AssignedEmployeeCard
            title={labels.assignedEmployeeTitle}
            assignedEmployee={order.assignedEmployee}
            unassignedLabel={labels.unassigned}
          />

          <OrderCustomerCard
            title={labels.customerTitle}
            customer={order.customer}
            mobileNumberLabel={labels.mobileNumber}
            countryLabel={labels.country}
            cityLabel={labels.city}
          />

          <OrderShippingAddressCard
            title={labels.shippingAddressTitle}
            address={order.shippingAddress}
            shippingCompanyLabel={labels.shippingCompany}
            trackingLabel={labels.tracking}
          />
        </div>
      </div>
    </div>
  );
}
