import type { OrderDetails } from "./types";

export const ORDER_DETAILS: OrderDetails = {
  id: "754602",
  orderNumber: "DQQ_178556903409401",
  storeName: "dqqapp",
  dateDisplay: "2026-08-01 10:31:09",
  orderStatus: "reversed",
  dqqStatus: "returned",
  paymentStatus: "unpaid",
  assignedEmployee: null,
  customer: {
    name: "abderhman abu daya",
    email: "aass999@gmail.com",
    phone: "+966540888224",
    country: "Saudi Arabia",
    city: "Riyadh",
  },
  shippingAddress: {
    name: "abderhman abu daya",
    addressLines: ["Saudi Arabia - Riyadh - سيتي", "23142343134", "Riyadh, Saudi Arabia"],
    shippingCompany: "DQQ",
    trackingNumber: "6A6DA0BC7ABA6",
    latitude: 24.7136,
    longitude: 46.6753,
  },
  products: [
    {
      id: "1",
      name: "كيوفي، كريم مرطب عميق للبشرة- 500 جم",
      sku: "A1B22",
      type: "Normal",
      price: 1,
      quantity: 1,
      total: 1,
    },
    {
      id: "2",
      name: "لوشن تخفيف خشونة البشرة من بيوسرين-500مل",
      sku: "072140024611",
      type: "Normal",
      price: 0,
      quantity: 1,
      total: 0,
    },
  ],
  bill: {
    subtotal: 1,
    deliveryCost: 0,
    coupon: 0,
    total: 1,
    currency: "USD",
  },
};
