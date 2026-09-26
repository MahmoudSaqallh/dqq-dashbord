import type { TransferDetails, WarehouseTransferRow } from "./types";

const TRANSFER_DETAILS_OVERRIDES: Record<string, TransferDetails> = {
  "1": {
    id: "1",
    transferId: "ST-000153",
    dateDisplay: "June 22, 2026",
    fromWarehouse: "مخزن دقق",
    toWarehouse: "مخزن دقق -2",
    city: "Riyadh",
    shippingCompany: "-",
    priority: "low",
    client: "dqqapp",
    senderEmployee: "-",
    receiverEmployee: "-",
    totalQuantity: 100,
    productsCount: 1,
    senderStatus: "packed",
    receiverStatus: "received",
    note: "-",
    sendingProductsCount: 1,
    receivingProductsCount: 1,
    products: [
      {
        id: "1-1",
        name: "سلاند كامرا",
        sku: "45236215",
        transferQty: 100,
        sendQty: 100,
        receivedQty: 100,
      },
    ],
  },
};

export function getTransferDetails(row: WarehouseTransferRow): TransferDetails {
  const override = TRANSFER_DETAILS_OVERRIDES[row.id];
  if (override) return override;

  return {
    id: row.id,
    transferId: row.number,
    dateDisplay: "-",
    fromWarehouse: row.fromWarehouse,
    toWarehouse: row.toWarehouse,
    city: "Riyadh",
    shippingCompany: row.shippingCompany ?? "-",
    priority: row.priority,
    client: "dqqapp",
    senderEmployee: "-",
    receiverEmployee: "-",
    totalQuantity: row.quantity,
    productsCount: 1,
    senderStatus: row.senderStatus,
    receiverStatus: row.receiverStatus,
    note: "-",
    sendingProductsCount: 1,
    receivingProductsCount: row.receiverStatus === "received" ? 1 : 0,
    products: [
      {
        id: `${row.id}-1`,
        name: `منتج ${row.rowNumber}`,
        sku: `4523${row.rowNumber}000`,
        transferQty: row.quantity,
        sendQty: row.quantity,
        receivedQty: row.receiverStatus === "received" ? row.quantity : 0,
      },
    ],
  };
}
