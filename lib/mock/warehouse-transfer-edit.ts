import type { EditWarehouseTransferData, WarehouseTransferRow } from "./types";

const EDIT_TRANSFER_OVERRIDES: Record<string, EditWarehouseTransferData> = {
  "4": {
    id: "4",
    warehouseFrom: "الفرع الرئيسي -1",
    warehouseTo: "متجر أحمد سلة",
    priority: "low",
    products: [
      {
        id: "4-1",
        name: "سلة تخزين",
        sku: "SKU-000456",
        stockQty: 600,
        transferQty: 100,
      },
    ],
  },
};

export function getEditWarehouseTransferData(row: WarehouseTransferRow): EditWarehouseTransferData {
  const override = EDIT_TRANSFER_OVERRIDES[row.id];
  if (override) return override;

  return {
    id: row.id,
    warehouseFrom: row.fromWarehouse,
    warehouseTo: row.toWarehouse,
    priority: row.priority,
    products: [
      {
        id: `${row.id}-1`,
        name: `منتج ${row.rowNumber}`,
        sku: `SKU-${row.rowNumber}00`,
        stockQty: 100,
        transferQty: row.quantity,
      },
    ],
  };
}
