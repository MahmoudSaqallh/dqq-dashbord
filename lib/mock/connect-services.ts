import type { ConnectServiceItem } from "./types";

export const STORE_SERVICES: ConnectServiceItem[] = [
  {
    id: "zid",
    name: "Zid",
    logo: { kind: "wordmark", colorClass: "text-violet-600" },
  },
  {
    id: "salla",
    name: "Salla",
    logo: { kind: "wordmark", colorClass: "text-teal-500" },
    badge: "NEW",
  },
];

export const REPRESENTATIVE_SERVICES: ConnectServiceItem[] = [
  {
    id: "smsa",
    name: "Smsa",
    logo: { kind: "wordmark", colorClass: "text-violet-800" },
    hasInfo: true,
  },
  {
    id: "aramex",
    name: "Aramex",
    logo: { kind: "wordmark", colorClass: "text-red-600" },
  },
  {
    id: "labaih",
    name: "Labaih",
    logo: { kind: "wordmark", colorClass: "text-zinc-800" },
  },
  {
    id: "shipping-no-api",
    name: "شركة شحن بدون api",
    logo: { kind: "image" },
    badge: "api",
    isCustom: true,
  },
  {
    id: "test",
    name: "test",
    logo: { kind: "image" },
    badge: "test",
    isCustom: true,
  },
  {
    id: "gold-package",
    name: "Gold Package",
    logo: { kind: "image" },
    badge: "Gold Package",
    isCustom: true,
  },
  {
    id: "manthoob-pay",
    name: "منتوب دفع",
    logo: { kind: "image" },
    isCustom: true,
  },
  {
    id: "subscribe-delivery-en",
    name: "subscribe delevery company en",
    logo: { kind: "social", colorClass: "bg-primary" },
    isCustom: true,
  },
];
