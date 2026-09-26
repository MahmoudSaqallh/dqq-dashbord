import type { EditPurchaseOrderData, PurchaseOrderRow } from "./types";

const EDIT_PURCHASE_ORDER_OVERRIDES: Record<string, EditPurchaseOrderData> = {
  "5": {
    id: "5",
    supplierName: "test",
    warehouseName: "مستودع أحمد سلة",
    products: [
      {
        id: "5-1",
        name: "المنتج الأول",
        sku: "Z.392973.1692289038246086",
        stockQty: 0,
        orderQty: 54,
        unitPrice: 0,
        deliveryDateDisplay: "2026-05-24",
      },
      {
        id: "5-2",
        name: "تيست منتج",
        sku: "dsfsddfsdf",
        stockQty: 0,
        orderQty: 10,
        unitPrice: 0,
        deliveryDateDisplay: "2026-05-24",
      },
      {
        id: "5-3",
        name: "سنانذ متحرك 3",
        sku: "400500",
        stockQty: 2,
        orderQty: 10,
        unitPrice: 0,
        deliveryDateDisplay: "2026-05-24",
      },
    ],
    notes: "",
  },
};

export function getEditPurchaseOrderData(row: PurchaseOrderRow): EditPurchaseOrderData {
  const override = EDIT_PURCHASE_ORDER_OVERRIDES[row.id];
  if (override) return override;

  return {
    id: row.id,
    supplierName: row.supplierName,
    warehouseName: row.warehouseName,
    products: Array.from({ length: row.productsCount }, (_, index) => ({
      id: `${row.id}-${index + 1}`,
      name: `منتج ${index + 1}`,
      sku: `12345${row.rowNumber}${index}`,
      stockQty: 0,
      orderQty: 1,
      unitPrice: 0,
      deliveryDateDisplay: row.deliveryDateDisplay ?? "-",
    })),
    notes: "",
  };
}
