import type { PurchaseOrderChangeStatus, PurchaseOrderRow } from "./types";

const CHANGE_STATUS_OVERRIDES: Record<string, PurchaseOrderChangeStatus> = {
  "7": {
    id: "7",
    status: "partially_received",
    products: [
      {
        id: "7-1",
        name: "منتج 4",
        sku: "123456788",
        stockQty: 0,
        orderedQty: 4,
        totalReceived: 4,
        locationAssigned: true,
      },
      {
        id: "7-2",
        name: "منتج 3",
        sku: "123456789",
        stockQty: 0,
        orderedQty: 4,
        totalReceived: 4,
        locationAssigned: true,
      },
      {
        id: "7-3",
        name: "المنتج الثاني",
        sku: "Z.392973.1695480601437518",
        stockQty: 0,
        orderedQty: 3,
        totalReceived: 2,
        locationAssigned: false,
      },
      {
        id: "7-4",
        name: "كريم جونسون مرطب- 100 مل",
        sku: "82C51",
        stockQty: 0,
        orderedQty: 3,
        totalReceived: 3,
        locationAssigned: true,
      },
    ],
  },
};

export function getPurchaseOrderChangeStatus(row: PurchaseOrderRow): PurchaseOrderChangeStatus {
  const override = CHANGE_STATUS_OVERRIDES[row.id];
  if (override) return override;

  const isReceived = row.status === "received" || row.status === "closed";

  return {
    id: row.id,
    status: row.status,
    products: Array.from({ length: row.productsCount }, (_, index) => ({
      id: `${row.id}-${index + 1}`,
      name: `منتج ${index + 1}`,
      sku: `12345${row.rowNumber}${index}`,
      stockQty: 0,
      orderedQty: 1,
      totalReceived: isReceived ? 1 : 0,
      locationAssigned: isReceived,
    })),
  };
}
