import type { CreateOrderLocation, CreateOrderProductRow } from "./types";

export const CREATE_ORDER_PRODUCT_ROWS: CreateOrderProductRow[] = [
  {
    id: "1",
    name: "تست اختبار منتجات",
    sku: "Z..1756030296856642",
    availableStock: 2,
    quantity: 1,
    unitPrice: 0,
  },
];

export const CREATE_ORDER_LOCATION: CreateOrderLocation = {
  id: "1",
  city: "RIYADH",
  country: "SAUDI ARABIA",
  buildingLabel: "N/A -",
  hasShortAddress: false,
};
