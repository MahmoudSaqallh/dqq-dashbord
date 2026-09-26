import type { PurchaseOrderDetails, PurchaseOrderRow } from "./types";

const PURCHASE_ORDER_DETAILS_OVERRIDES: Record<string, PurchaseOrderDetails> = {
  "1": {
    id: "1",
    orderId: "PO-1781436109626",
    expectedDeliveryDateDisplay: "2026-06-22",
    supplierName: "test",
    warehouseName: "مخزن دقق",
    totalQuantity: 2,
    assignedTo: "ali1",
    productsCount: 2,
    totalAmountDisplay: "0",
    status: "received",
    notes: "-",
    receivingProductsCount: 1,
    products: [
      {
        id: "1-1",
        name: "منتج 4",
        sku: "123456788",
        amountDisplay: "0",
        received: true,
        orderedQty: 1,
        receivedQty: 1,
        expectedDeliveryDateDisplay: "2026-06-14",
        actualDateDisplay: "2026-06-14 14:22:30",
        receiveToCount: 1,
      },
      {
        id: "1-2",
        name: "منتج 3",
        sku: "123456789",
        amountDisplay: "0",
        received: true,
        orderedQty: 1,
        receivedQty: 1,
        expectedDeliveryDateDisplay: "2026-06-14",
        actualDateDisplay: "2026-06-14 14:22:30",
        receiveToCount: 1,
      },
    ],
  },
};

export function getPurchaseOrderDetails(row: PurchaseOrderRow): PurchaseOrderDetails {
  const override = PURCHASE_ORDER_DETAILS_OVERRIDES[row.id];
  if (override) return override;

  return {
    id: row.id,
    orderId: row.serialNumber,
    expectedDeliveryDateDisplay: row.deliveryDateDisplay ?? "-",
    supplierName: row.supplierName,
    warehouseName: row.warehouseName,
    totalQuantity: row.productsCount,
    assignedTo: row.approvedBy ?? "-",
    productsCount: row.productsCount,
    totalAmountDisplay: row.totalAmountDisplay ?? "0",
    status: row.status,
    notes: "-",
    receivingProductsCount: 0,
    products: Array.from({ length: row.productsCount }, (_, index) => ({
      id: `${row.id}-${index + 1}`,
      name: `منتج ${index + 1}`,
      sku: `12345${row.rowNumber}${index}`,
      amountDisplay: "0",
      received: row.status === "received" || row.status === "closed",
      orderedQty: 1,
      receivedQty: row.status === "received" || row.status === "closed" ? 1 : 0,
      expectedDeliveryDateDisplay: row.deliveryDateDisplay ?? "-",
      actualDateDisplay: null,
      receiveToCount: 0,
    })),
  };
}
